// Gibt den angemeldeten Benutzer (oder null) an alle Seiten weiter.
export function load({ locals }) {
	return { user: locals.user };
}
