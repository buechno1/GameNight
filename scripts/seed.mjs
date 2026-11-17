// Befüllt die Datenbank mit Beispiel-Spielen und ein paar Beispiel-Runden.
// Ausführen im Projektordner:  node --env-file=.env scripts/seed.mjs
// Das Skript ist wiederholbar: bereits vorhandene Spiele (gleicher Titel) werden nicht doppelt angelegt.

import { MongoClient } from 'mongodb';

if (!process.env.DB_URI) {
	console.error('DB_URI fehlt. Starte das Skript mit: node --env-file=.env scripts/seed.mjs');
	process.exit(1);
}

const games = [
	{
		title: 'Catan',
		minPlayers: 3,
		maxPlayers: 4,
		duration: 90,
		genre: 'Strategie',
		description: 'Sammle Rohstoffe, baue Strassen und Siedlungen und handle geschickt mit den anderen.',
		rules: 'Vorbereitung:\n1. Das Spielfeld aus den Landschaftsplättchen zusammensetzen.\n2. Jede Person nimmt zwei Siedlungen und zwei Strassen in ihrer Farbe.\n\nAblauf:\n1. Wer dran ist, würfelt: Alle Felder mit dieser Zahl liefern Rohstoffe.\n2. Danach darf getauscht und gebaut werden.\n3. Wer zuerst 10 Siegpunkte hat, gewinnt.'
	},
	{
		title: 'Carcassonne',
		minPlayers: 2,
		maxPlayers: 5,
		duration: 45,
		genre: 'Legespiel',
		description: 'Lege Landschaftsplättchen an und setze deine Figuren auf Städte, Strassen und Wiesen.',
		rules: 'Vorbereitung:\n1. Das Startplättchen offen in die Mitte legen.\n2. Jede Person bekommt 7 Figuren in einer Farbe.\n\nAblauf:\n1. Ein Plättchen ziehen und passend anlegen.\n2. Optional eine Figur darauf setzen.\n3. Fertige Städte und Strassen bringen Punkte. Am Ende gewinnt, wer die meisten hat.'
	},
	{
		title: 'Dixit',
		minPlayers: 3,
		maxPlayers: 6,
		duration: 30,
		genre: 'Party',
		description: 'Beschreibe dein Bild so, dass einige – aber nicht alle – es erraten.',
		rules: 'Vorbereitung:\n1. Jede Person erhält 6 Bildkarten.\n\nAblauf:\n1. Die erzählende Person legt eine Karte verdeckt und nennt einen Hinweis.\n2. Alle anderen legen eine passende Karte dazu.\n3. Die Karten werden gemischt und aufgedeckt, alle raten die Originalkarte.\n4. Punkte gibt es, wenn nicht alle und nicht niemand richtig rät.'
	},
	{
		title: 'Uno',
		minPlayers: 2,
		maxPlayers: 10,
		duration: 20,
		genre: 'Karten',
		description: 'Werde alle deine Karten zuerst los und vergiss nicht, «Uno» zu rufen.',
		rules: 'Vorbereitung:\n1. Jede Person bekommt 7 Karten.\n\nAblauf:\n1. Eine Karte muss zur obersten Karte in Farbe oder Zahl passen.\n2. Wer nicht passen kann, zieht eine Karte.\n3. Bei der vorletzten Karte «Uno» rufen.\n4. Wer zuerst keine Karten mehr hat, gewinnt die Runde.'
	},
	{
		title: 'Codenames',
		minPlayers: 4,
		maxPlayers: 8,
		duration: 20,
		genre: 'Party',
		description: 'Zwei Teams, zwei Geheimdienstchefs und ein Wort als Hinweis für mehrere Karten.',
		rules: 'Vorbereitung:\n1. Zwei Teams bilden, jedes wählt eine Spielleitung.\n2. 25 Wortkarten in einem Raster auslegen.\n\nAblauf:\n1. Die Spielleitung nennt ein Wort und eine Zahl.\n2. Das Team tippt auf passende Karten.\n3. Wer alle eigenen Agenten zuerst findet, gewinnt. Der Attentäter bedeutet Niederlage.'
	},
	{
		title: 'Ticket to Ride',
		minPlayers: 2,
		maxPlayers: 5,
		duration: 60,
		genre: 'Familie',
		description: 'Verbinde Städte mit Zugstrecken und erfülle geheime Zielkarten.',
		rules: 'Vorbereitung:\n1. Jede Person erhält Wagen, Farbkarten und Zielkarten.\n\nAblauf:\n1. Pro Zug: Wagenkarten ziehen, eine Strecke besetzen oder neue Zielkarten ziehen.\n2. Strecken geben Punkte, erfüllte Ziele ebenfalls.\n3. Wenn jemand fast keine Wagen mehr hat, gibt es eine letzte Runde.'
	},
	{
		title: 'Azul',
		minPlayers: 2,
		maxPlayers: 4,
		duration: 40,
		genre: 'Legespiel',
		description: 'Sammle farbige Fliesen und gestalte eine Wand, ohne Minuspunkte zu kassieren.',
		rules: 'Vorbereitung:\n1. Die Fabriken mit je vier Fliesen füllen.\n\nAblauf:\n1. Alle Fliesen einer Farbe von einer Fabrik nehmen.\n2. Die Fliesen in eine Musterreihe legen.\n3. Volle Reihen wandern auf die Wand und geben Punkte.\n4. Überzählige Fliesen kosten Punkte.'
	},
	{
		title: 'Exploding Kittens',
		minPlayers: 2,
		maxPlayers: 5,
		duration: 15,
		genre: 'Karten',
		description: 'Ziehe Karten und überlebe – wer die explodierende Katze zieht, ist raus.',
		rules: 'Vorbereitung:\n1. Jede Person bekommt eine Entschärfen-Karte und 7 weitere Karten.\n\nAblauf:\n1. Wer dran ist, spielt beliebig viele Karten und zieht dann eine Karte.\n2. Wer eine explodierende Katze zieht, scheidet ohne Entschärfen-Karte aus.\n3. Die letzte Person im Spiel gewinnt.'
	},
	{
		title: 'Pandemic',
		minPlayers: 2,
		maxPlayers: 4,
		duration: 60,
		genre: 'Kooperativ',
		description: 'Gemeinsam gegen vier Seuchen: Heilmittel finden, bevor die Welt kippt.',
		rules: 'Vorbereitung:\n1. Jede Person wählt eine Rolle.\n2. Anfangsstädte werden infiziert.\n\nAblauf:\n1. Pro Zug vier Aktionen: bewegen, behandeln, Wissen teilen, Heilmittel entdecken.\n2. Danach Spielerkarten ziehen und Städte infizieren.\n3. Alle gewinnen, wenn vier Heilmittel gefunden sind.'
	},
	{
		title: 'Dobble',
		minPlayers: 2,
		maxPlayers: 8,
		duration: 10,
		genre: 'Party',
		description: 'Finde als Erste das gleiche Symbol auf zwei Karten – schnell und laut.',
		rules: 'Vorbereitung:\n1. Jede Person bekommt eine Karte verdeckt, der Stapel kommt in die Mitte.\n\nAblauf:\n1. Alle drehen gleichzeitig ihre Karte um.\n2. Wer zuerst das gemeinsame Symbol mit der Stapelkarte nennt, nimmt die Karte.\n3. Wer am Ende die meisten Karten hat, gewinnt.'
	},
	{
		title: 'Kniffel',
		minPlayers: 1,
		maxPlayers: 6,
		duration: 30,
		genre: 'Würfel',
		description: 'Würfle fünf Würfel bis zu dreimal und sammle Kombinationen auf dem Block.',
		rules: 'Vorbereitung:\n1. Jede Person erhält einen Block und einen Stift.\n\nAblauf:\n1. Bis zu dreimal würfeln, dabei beliebige Würfel liegen lassen.\n2. Das Ergebnis in ein Feld auf dem Block eintragen.\n3. Nach 13 Runden werden die Punkte addiert.'
	},
	{
		title: 'Mario Kart',
		minPlayers: 1,
		maxPlayers: 4,
		duration: 30,
		genre: 'Videospiel',
		description: 'Rennen mit Items und Abkürzungen – perfekt für einen schnellen Wettkampf am Bildschirm.',
		rules: 'Vorbereitung:\n1. Konsole starten und Controller verbinden.\n2. Cup und Spielmodus wählen.\n\nAblauf:\n1. Rennen fahren und Items einsetzen.\n2. Punkte nach Platzierung sammeln.\n3. Nach dem Cup gewinnt, wer die meisten Punkte hat.'
	}
];

// Beispiel-Runden: [Spieltitel, Gewinner, Bewertung, Notiz, vor wie vielen Tagen]
const rounds = [
	['Catan', 'Max', 'super', 'Lange, aber richtig spannend.', 21],
	['Dixit', 'Lena', 'super', 'Super mit der ganzen Gruppe.', 18],
	['Uno', 'Noah', 'gut', 'Schnell zum Aufwärmen.', 15],
	['Codenames', 'Sarah', 'super', 'Lustige Hinweise!', 12],
	['Azul', 'Max', 'gut', 'Schön und einfach erklärt.', 10],
	['Exploding Kittens', 'Lena', 'gut', '', 7],
	['Catan', 'Noah', 'super', 'Revanche war fällig.', 5],
	['Dobble', 'Sarah', 'schlecht', 'Zu hektisch für Helga.', 3],
	['Mario Kart', 'Max', 'super', 'Finale um Mitternacht.', 1]
];

const client = new MongoClient(process.env.DB_URI);

try {
	await client.connect();
	const db = client.db('GameNight');

	let added = 0;
	for (const game of games) {
		const res = await db
			.collection('games')
			.updateOne({ title: game.title }, { $setOnInsert: { ...game, createdAt: new Date() } }, { upsert: true });
		if (res.upsertedCount) added++;
	}
	console.log(`Spiele: ${added} neu angelegt, ${games.length - added} waren schon vorhanden.`);

	if ((await db.collection('rounds').countDocuments()) === 0) {
		const docs = [];
		for (const [title, winner, rating, note, daysAgo] of rounds) {
			const game = await db.collection('games').findOne({ title });
			if (!game) continue;
			docs.push({
				gameId: game._id,
				gameTitle: title,
				winner,
				rating,
				note,
				userId: 'seed',
				username: 'Demo',
				createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
			});
		}
		if (docs.length) await db.collection('rounds').insertMany(docs);
		console.log(`Runden: ${docs.length} Beispiel-Einträge angelegt.`);
	} else {
		console.log('Runden: es gibt schon Einträge, nichts hinzugefügt.');
	}
} finally {
	await client.close();
}
