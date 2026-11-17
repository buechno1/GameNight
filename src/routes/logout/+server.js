import { redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.js';

export async function POST({ cookies }) {
	const token = cookies.get('session');
	if (token) await db.collection('sessions').deleteOne({ token });
	cookies.delete('session', { path: '/' });
	redirect(303, '/');
}
