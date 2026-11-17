import { fail, redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.js';
import { hashPassword, createSession } from '#lib/server/auth.js';

export function load({ locals }) {
	if (locals.user) redirect(303, '/');
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = String(data.get('username') ?? '').trim();
		const password = String(data.get('password') ?? '');
		const confirm = String(data.get('confirm') ?? '');

		if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(username)) {
			return fail(400, {
				error: 'Der Benutzername braucht 3–20 Zeichen (Buchstaben, Zahlen, _ . -).',
				username
			});
		}
		if (password.length < 6) {
			return fail(400, { error: 'Das Passwort braucht mindestens 6 Zeichen.', username });
		}
		if (password !== confirm) {
			return fail(400, { error: 'Die Passwörter stimmen nicht überein.', username });
		}

		const users = db.collection('users');
		if (await users.findOne({ usernameLower: username.toLowerCase() })) {
			return fail(400, { error: 'Dieser Benutzername ist schon vergeben.', username });
		}

		// Neue Konten sind immer "member". Admin wird nur direkt in MongoDB vergeben.
		const result = await users.insertOne({
			username,
			usernameLower: username.toLowerCase(),
			passwordHash: await hashPassword(password),
			role: 'member',
			createdAt: new Date()
		});

		await createSession(cookies, result.insertedId);
		redirect(303, '/');
	}
};
