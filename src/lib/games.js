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
	['kinder', '🧸'],
	['lege', '🧱']
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

// Zuordnung Genre -> eigene Illustration in static/genres/
const ART = [
	['strateg', 'strategie'],
	['karte', 'karten'],
	['party', 'party'],
	['würfel', 'wuerfel'],
	['wuerfel', 'wuerfel'],
	['video', 'videospiel'],
	['familie', 'familie'],
	['koop', 'kooperativ'],
	['rätsel', 'raetsel'],
	['raetsel', 'raetsel'],
	['quiz', 'quiz'],
	['abenteuer', 'abenteuer'],
	['lege', 'legespiel']
];

/** Bild eines Spiels: eigenes Bild (image) oder die Genre-Illustration. */
export function imageFor(game) {
	if (game?.image) return game.image;
	const g = (game?.genre ?? '').toLowerCase();
	const slug = ART.find(([key]) => g.includes(key))?.[1] ?? 'standard';
	return `/genres/${slug}.svg`;
}

/** Anleitung (Text mit «Abschnitt:»-Zeilen und «1. …»-Schritten) in Abschnitte zerlegen. */
export function parseRules(text = '') {
	return text
		.trim()
		.split(/\n\s*\n/)
		.filter(Boolean)
		.map((block) => {
			const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
			const title = lines[0]?.endsWith(':') ? lines.shift().slice(0, -1) : '';
			const numbered = lines.length > 0 && lines.every((l) => /^\d+\.\s/.test(l));
			return {
				title,
				numbered,
				lines: numbered ? lines.map((l) => l.replace(/^\d+\.\s*/, '')) : lines
			};
		});
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
