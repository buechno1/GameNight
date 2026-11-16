import { db } from '#lib/server/db';

export async function load() {
  const games = await db.collection('games').find().toArray();
  return { games: games.map((g) => ({ ...g, _id: g._id.toString() })) };
}

export const actions = {
  add: async ({ request }) => {
    const data = await request.formData();
    await db.collection('games').insertOne({
      title: data.get('title'),
      minPlayers: Number(data.get('minPlayers')),
      maxPlayers: Number(data.get('maxPlayers')),
      duration: Number(data.get('duration')),
      genre: data.get('genre')
    });
  }
};