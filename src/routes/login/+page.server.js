import { fail, redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.js';
import { verifyPassword, createSession, safeNext } from '#lib/server/auth.js';

export function load({ locals, url }) {
	if (locals.user) redirect(303, '/');
	return { needLogin: url.searchParams.has('next') };
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const username = String(data.get('username') ?? '').trim();
		const password = String(data.get('password') ?? '');

		const user = await db.collection('users').findOne({ usernameLower: username.toLowerCase() });
		const ok = user && (await verifyPassword(password, user.passwordHash));

		if (!ok) {
			return fail(400, { error: 'Benutzername oder Passwort ist falsch.', username });
		}

		await createSession(cookies, user._id);
		redirect(303, safeNext(url.searchParams.get('next')));
	}
};
