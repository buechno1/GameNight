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
	['lege', '🧱'],
	['geschick', '🏗️'],
	['wort', '🔤']
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
	['lege', 'legespiel'],
	['geschick', 'geschicklichkeit'],
	['wort', 'wortspiel']
];

/** Genre-Illustration (Fallback, wenn kein eigenes Bild vorhanden ist). */
export function imageFor(game) {
	const g = (game?.genre ?? '').toLowerCase();
	const slug = ART.find(([key]) => g.includes(key))?.[1] ?? 'standard';
	return `/genres/${slug}.svg`;
}

/**
 * Alle möglichen Bild-Adressen eines Spiels, in der Reihenfolge, in der sie ausprobiert werden:
 * 1. das Feld «image» (falls in der Datenbank gesetzt)
 * 2. static/games/<spielname>.png oder .jpg (Kleinbuchstaben, Leerzeichen als _ oder -)
 * 3. die Genre-Illustration
 * Beispiel: «6 nimmt!» -> /games/6_nimmt.png oder /games/6-nimmt.png
 */
export function imageCandidates(game) {
	const list = [];
	if (game?.image) list.push(game.image);

	const title = (game?.title ?? '')
		.toLowerCase()
		.replace(/[!?.,:;'"()«»]/g, '')
		.trim()
		.replace(/\s+/g, ' ');

	if (title) {
		const translit = title
			.replace(/ä/g, 'ae')
			.replace(/ö/g, 'oe')
			.replace(/ü/g, 'ue')
			.replace(/ß/g, 'ss');
		const names = [...new Set([title, translit])];
		for (const ext of ['png', 'jpg']) {
			for (const sep of ['_', '-']) {
				for (const name of names) {
					list.push(`/games/${encodeURIComponent(name.replace(/ /g, sep))}.${ext}`);
				}
			}
		}
	}

	list.push(imageFor(game));
	return [...new Set(list)];
}

/** onerror-Handler für <img>: probiert die nächste Bild-Adresse aus der Liste. */
export function nextImage(event, game) {
	const img = event.currentTarget;
	const list = imageCandidates(game);
	const next = Number(img.dataset.i ?? 0) + 1;
	if (next < list.length) {
		img.dataset.i = String(next);
		img.src = list[next];
	} else {
		img.onerror = null;
	}
}

// Abschnitte, die als Fliesstext (ohne Nummern oder Punkte) angezeigt werden
const PLAIN = ['spielende', 'tipp', 'hinweis', 'ziel'];
// Abschnitte, die als Aufzählung mit Punkten angezeigt werden
const BULLETS = ['wertung'];

/**
 * Anleitung (Text mit «Abschnitt:»-Zeilen) in Abschnitte zerlegen.
 * kind: 'steps' = nummerierte Schritte, 'bullets' = Aufzählung, 'text' = Fliesstext
 */
export function parseRules(text = '') {
	return text
		.trim()
		.split(/\n\s*\n/)
		.filter(Boolean)
		.map((block) => {
			const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
			const title = lines[0]?.endsWith(':') ? lines.shift().slice(0, -1) : '';
			const key = title.toLowerCase();
			const allNumbered = lines.length > 0 && lines.every((l) => /^\d+\.\s/.test(l));
			const kind = BULLETS.includes(key)
				? 'bullets'
				: PLAIN.includes(key)
					? 'text'
					: allNumbered
						? 'steps'
						: 'text';
			return { title, kind, lines: lines.map((l) => l.replace(/^\d+\.\s*/, '')) };
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
