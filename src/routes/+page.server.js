import { fail } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { db } from '#lib/server/db.js';
import { RATINGS } from '#lib/games.js';

export async function load() {
	const games = await db.collection('games').find().sort({ title: 1 }).toArray();
	const rounds = await db
		.collection('rounds')
		.find({}, { projection: { gameId: 1, rating: 1 } })
		.toArray();

	// Pro Spiel: wie oft gespielt und durchschnittliche Bewertung
	const stats = {};
	for (const r of rounds) {
		const key = r.gameId?.toString();
		if (!key) continue;
		stats[key] ??= { played: 0, sum: 0, rated: 0 };
		stats[key].played++;
		const score = RATINGS[r.rating]?.score;
		if (score) {
			stats[key].sum += score;
			stats[key].rated++;
		}
	}

	return {
		games: games.map((g) => {
			const s = stats[g._id.toString()];
			return {
				id: g._id.toString(),
				title: g.title,
				minPlayers: g.minPlayers,
				maxPlayers: g.maxPlayers,
				duration: g.duration,
				genre: g.genre ?? '',
				image: g.image ?? '',
				description: g.description ?? '',
				rules: g.rules ?? '',
				played: s?.played ?? 0,
				avg: s?.rated ? s.sum / s.rated : null
			};
		})
	};
}

function isAdmin(locals) {
	return locals.user?.role === 'admin';
}

/** Formulardaten prüfen und in ein Spiel-Objekt umwandeln. */
function parseGame(data) {
	const title = String(data.get('title') ?? '').trim();
	const minPlayers = Number(data.get('minPlayers'));
	const maxPlayers = Number(data.get('maxPlayers'));
	const duration = Number(data.get('duration'));

	const image = String(data.get('image') ?? '').trim();

	if (!title) return { error: 'Bitte gib einen Titel ein.' };
	if (image && !/^(https:\/\/|\/)/.test(image)) {
		return { error: 'Die Bild-Adresse muss mit https:// oder / beginnen.' };
	}
	if (![minPlayers, maxPlayers, duration].every((n) => Number.isFinite(n) && n >= 1)) {
		return { error: 'Spieleranzahl und Dauer müssen Zahlen ab 1 sein.' };
	}
	if (minPlayers > maxPlayers) {
		return { error: 'Die minimale Spieleranzahl darf nicht grösser als die maximale sein.' };
	}

	return {
		game: {
			title,
			minPlayers,
			maxPlayers,
			duration,
			genre: String(data.get('genre') ?? '').trim(),
			image,
			description: String(data.get('description') ?? '').trim(),
			rules: String(data.get('rules') ?? '').trim()
		}
	};
}

function toObjectId(id) {
	try {
		return new ObjectId(String(id));
	} catch {
		return null;
	}
}

export const actions = {
	add: async ({ request, locals }) => {
		if (!isAdmin(locals)) return fail(403, { error: 'Nur Administratoren dürfen Spiele hinzufügen.' });

		const { game, error } = parseGame(await request.formData());
		if (error) return fail(400, { error });

		await db.collection('games').insertOne({ ...game, createdAt: new Date() });
		return { success: true };
	},

	update: async ({ request, locals }) => {
		if (!isAdmin(locals)) return fail(403, { error: 'Nur Administratoren dürfen Spiele ändern.' });

		const data = await request.formData();
		const _id = toObjectId(data.get('id'));
		if (!_id) return fail(400, { error: 'Ungültige Spiel-ID.' });

		const { game, error } = parseGame(data);
		if (error) return fail(400, { error });

		await db.collection('games').updateOne({ _id }, { $set: game });
		return { success: true };
	},

	delete: async ({ request, locals }) => {
		if (!isAdmin(locals)) return fail(403, { error: 'Nur Administratoren dürfen Spiele löschen.' });

		const _id = toObjectId((await request.formData()).get('id'));
		if (!_id) return fail(400, { error: 'Ungültige Spiel-ID.' });

		await db.collection('games').deleteOne({ _id });
		return { success: true };
	}
};
