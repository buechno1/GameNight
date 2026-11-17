// Kleine Hilfsfunktionen, die Client und Server gemeinsam nutzen.

const EMOJIS = [
	['strateg', '♟️'],
	['karte', '🃏'],
	['party', '🎉'],
	['würfel', '🎲'],
	['wuerfel', '🎲'],
	['video', '🎮'],
	['familie', '👨‍👩‍👧'],
	['koop', '🤝'],
	['rätsel', '🧩'],
	['raetsel', '🧩'],
	['quiz', '❓'],
	['abenteuer', '🗺️'],
	['kinder', '🧸']
];

/** Emoji passend zum Genre (Fallback: Würfel). */
export function emojiFor(genre = '') {
	const g = genre.toLowerCase();
	return EMOJIS.find(([key]) => g.includes(key))?.[1] ?? '🎲';
}

/** Stabile Farbe (Hue 0-360) aus einem Text, damit jedes Genre seine Farbe hat. */
export function hueFor(text = '') {
	let h = 0;
	for (const c of text) h = (h * 31 + c.charCodeAt(0)) % 360;
	return h;
}

export const RATINGS = {
	super: { score: 3, label: 'Super', emoji: '😍', cls: 'success' },
	gut: { score: 2, label: 'Gut', emoji: '🙂', cls: 'warning' },
	schlecht: { score: 1, label: 'Schlecht', emoji: '😕', cls: 'danger' }
};

/** Durchschnittliche Punktzahl (1-3) in eine Bewertung übersetzen. */
export function ratingFromAvg(avg) {
	if (avg == null) return null;
	return avg >= 2.5 ? RATINGS.super : avg >= 1.5 ? RATINGS.gut : RATINGS.schlecht;
}
