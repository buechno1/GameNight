import { error, fail } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { db } from '#lib/server/db.js';
import { RATINGS } from '#lib/games.js';

function toObjectId(id) {
	try {
		return new ObjectId(String(id));
	} catch {
		return null;
	}
}

export async function load({ params, locals }) {
	const _id = toObjectId(params.id);
	const game = _id && (await db.collection('games').findOne({ _id }));
	if (!game) error(404, 'Spiel nicht gefunden');

	// Notizen und Mitspieler-Namen sehen nur angemeldete Benutzer
	let rounds = [];
	let players = [];
	if (locals.user) {
		const docs = await db
			.collection('rounds')
			.find({ gameId: _id })
			.sort({ createdAt: -1 })
			.limit(5)
			.toArray();
		rounds = docs.map((r) => ({
			id: r._id.toString(),
			winner: r.winner,
			rating: r.rating,
			note: r.note ?? '',
			username: r.username,
			createdAt: r.createdAt.toISOString()
		}));
		const users = await db.collection('users').find({}, { projection: { username: 1 } }).toArray();
		players = users.map((u) => u.username);
	}

	return {
		game: {
			id: game._id.toString(),
			title: game.title,
			minPlayers: game.minPlayers,
			maxPlayers: game.maxPlayers,
			duration: game.duration,
			genre: game.genre ?? '',
			description: game.description ?? '',
			rules: game.rules ?? ''
		},
		rounds,
		players
	};
}

export const actions = {
	finish: async ({ request, params, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Bitte melde dich an, um Ergebnisse zu speichern.' });
		}

		const _id = toObjectId(params.id);
		const game = _id && (await db.collection('games').findOne({ _id }));
		if (!game) return fail(404, { error: 'Spiel nicht gefunden.' });

		const data = await request.formData();
		const winner = String(data.get('winner') ?? '').trim();
		const rating = String(data.get('rating') ?? '');
		const note = String(data.get('note') ?? '').trim().slice(0, 500);

		if (!winner) return fail(400, { error: 'Bitte trage den Gewinner ein.' });
		if (!RATINGS[rating]) return fail(400, { error: 'Bitte wähle eine Bewertung.' });

		await db.collection('rounds').insertOne({
			gameId: _id,
			gameTitle: game.title,
			winner,
			rating,
			note,
			userId: locals.user.id,
			username: locals.user.username,
			createdAt: new Date()
		});

		return { saved: true };
	}
};
