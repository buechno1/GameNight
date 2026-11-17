import { fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { db } from '#lib/server/db.js';

export async function load({ locals }) {
	// Nur für angemeldete Benutzer
	if (!locals.user) redirect(303, '/login?next=/historie');

	const docs = await db.collection('rounds').find().sort({ createdAt: -1 }).limit(200).toArray();

	const rounds = docs.map((r) => ({
		id: r._id.toString(),
		gameId: r.gameId?.toString() ?? '',
		gameTitle: r.gameTitle,
		winner: r.winner,
		rating: r.rating,
		note: r.note ?? '',
		username: r.username,
		createdAt: r.createdAt.toISOString()
	}));

	// Rangliste: Siege pro Person (Gross-/Kleinschreibung egal)
	const wins = new Map();
	for (const r of rounds) {
		const key = r.winner.trim().toLowerCase();
		const entry = wins.get(key) ?? { name: r.winner.trim(), wins: 0 };
		entry.wins++;
		wins.set(key, entry);
	}
	const leaderboard = [...wins.values()].sort((a, b) => b.wins - a.wins).slice(0, 10);

	// Meistgespielte Spiele
	const played = new Map();
	for (const r of rounds) {
		const entry = played.get(r.gameTitle) ?? { title: r.gameTitle, count: 0 };
		entry.count++;
		played.set(r.gameTitle, entry);
	}
	const topGames = [...played.values()].sort((a, b) => b.count - a.count).slice(0, 5);

	return { rounds, leaderboard, topGames };
}

export const actions = {
	deleteRound: async ({ request, locals }) => {
		if (locals.user?.role !== 'admin') {
			return fail(403, { error: 'Nur Administratoren dürfen Einträge löschen.' });
		}
		try {
			const id = new ObjectId(String((await request.formData()).get('id')));
			await db.collection('rounds').deleteOne({ _id: id });
		} catch {
			return fail(400, { error: 'Ungültige ID.' });
		}
		return { success: true };
	}
};
