import { db } from '#lib/server/db.js';

/**
 * Läuft bei jeder Anfrage: liest das Session-Cookie, sucht die Session in MongoDB
 * und legt den Benutzer (inkl. Rolle) in event.locals.user ab.
 * Die Rolle wird jedes Mal frisch aus der Datenbank gelesen, eine Änderung in
 * MongoDB (z. B. member -> admin) gilt deshalb sofort.
 */
export async function handle({ event, resolve }) {
	event.locals.user = null;

	const token = event.cookies.get('session');
	if (token) {
		const session = await db.collection('sessions').findOne({ token });

		if (session && session.expiresAt > new Date()) {
			const user = await db.collection('users').findOne({ _id: session.userId });
			if (user) {
				event.locals.user = {
					id: user._id.toString(),
					username: user.username,
					role: user.role
				};
			}
		} else if (session) {
			await db.collection('sessions').deleteOne({ token });
		}
	}

	return resolve(event);
}
