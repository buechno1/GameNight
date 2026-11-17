// Befüllt die Datenbank mit 12 Beispiel-Spielen (ausführliche Beschreibung und Anleitung) und Beispiel-Runden.
// Ausführen im Projektordner:  node --env-file=.env scripts/seed.mjs
// Wiederholbar: Texte bestehender Spiele (gleicher Titel) werden aktualisiert, ein eigenes Bild (Feld "image") bleibt erhalten.
// Die Anleitungen sind in eigenen Worten zusammengefasst und ersetzen keine Original-Spielregeln.

import { MongoClient } from 'mongodb';
import { extraGames } from './games-extra.mjs';

if (!process.env.DB_URI) {
	console.error('DB_URI fehlt. Starte das Skript mit: node --env-file=.env scripts/seed.mjs');
	process.exit(1);
}

// Titel einer früheren Skript-Version (erfundene Spiele), falls diese schon eingespielt wurde
const FICTIONAL_TITLES = [
	'Drachenjagd', 'Würfelwald', 'Sternenstaub', 'Kaffeeklatsch', 'Bergbahn-Rennen', 'Schattenbibliothek',
	'Funkenflug', 'Mondmarkt', 'Nebelinsel', 'Pixel-Pioniere', 'Rätselraben', 'Turbo-Tüftler'
];

const games = [
	{
		title: 'Catan',
		minPlayers: 3, maxPlayers: 4, duration: 90, genre: 'Strategie',
		description:
			'Ihr besiedelt gemeinsam eine Insel und konkurriert um Rohstoffe wie Holz, Lehm, Wolle, Getreide und Erz. Mit diesen Rohstoffen baut ihr Strassen, Siedlungen und Städte. Dabei wird viel gehandelt und verhandelt, und der Würfel sorgt dafür, dass jede Runde anders verläuft. Ideal für Gruppen, die gerne planen und miteinander feilschen.',
		rules:
			'Vorbereitung:\n1. Das Spielfeld aus den sechseckigen Landschaftsplättchen zusammensetzen und die Zahlenchips darauflegen.\n2. Alle wählen eine Farbe und stellen reihum zwei Siedlungen mit je einer Strasse auf.\n3. Für die zweite Siedlung erhält man Rohstoffe aus den angrenzenden Feldern.\n\nAblauf:\n1. Wer an der Reihe ist, würfelt mit zwei Würfeln. Alle mit einer Siedlung an einem Feld mit dieser Zahl erhalten den passenden Rohstoff (Stadt: doppelt).\n2. Bei einer 7 zieht der Räuber um und blockiert ein Feld. Wer mehr als 7 Karten hat, gibt die Hälfte ab.\n3. Danach darf man mit anderen tauschen und bauen: Strasse (Holz + Lehm), Siedlung (Holz, Lehm, Wolle, Getreide), Stadt (3 Erz + 2 Getreide) oder eine Entwicklungskarte kaufen.\n\nSpielende:\n1. Wer als Erste oder Erster 10 Siegpunkte hat, gewinnt sofort.\n2. Siedlung = 1 Punkt, Stadt = 2 Punkte, längste Handelsstrasse (mind. 5 Teile) = 2 Punkte, grösste Rittermacht (mind. 3 Ritter) = 2 Punkte.\n\nTipp:\nBaut früh an Feldern mit den Zahlen 6, 8, 5 und 9, die werden am häufigsten gewürfelt.'
	},
	{
		title: 'Carcassonne',
		minPlayers: 2, maxPlayers: 5, duration: 45, genre: 'Legespiel',
		description:
			'Reihum legt ihr Landschaftsplättchen an und baut so Schritt für Schritt eine mittelalterliche Landschaft mit Städten, Strassen, Klöstern und Wiesen. Mit euren Gefolgsleuten sichert ihr euch Punkte. Die Regeln sind schnell erklärt, aber die Entscheidungen, wohin man ein Plättchen legt, sind überraschend taktisch.',
		rules:
			'Vorbereitung:\n1. Das Startplättchen offen in die Tischmitte legen, die übrigen Plättchen als verdeckten Stapel bereitstellen.\n2. Alle erhalten 7 Gefolgsleute einer Farbe. Einer kommt auf die Punkteleiste.\n\nAblauf:\n1. Ein Plättchen ziehen und so anlegen, dass alle angrenzenden Kanten zusammenpassen (Stadt an Stadt, Strasse an Strasse, Wiese an Wiese).\n2. Optional einen Gefolgsmann auf das neue Plättchen setzen: als Ritter in eine Stadt, als Dieb auf eine Strasse, als Mönch in ein Kloster oder als Bauer auf eine Wiese.\n3. Wird eine Stadt oder Strasse fertig, gibt es Punkte, und der Gefolgsmann kommt zurück: Stadt = 2 Punkte pro Plättchen (plus 2 pro Wappen), Strasse = 1 Punkt pro Plättchen, Kloster = 9 Punkte, wenn es von 8 Plättchen umgeben ist.\n\nSpielende:\n1. Das Spiel endet, wenn das letzte Plättchen gelegt ist.\n2. Unfertige Bauwerke zählen nach Plättchen, Bauern erhalten Punkte für fertige Städte an ihrer Wiese. Wer die meisten Punkte hat, gewinnt.\n\nTipp:\nSetze Bauern erst spät ein, sie bleiben bis zum Spielende liegen und fehlen dir dann als Gefolgsleute.'
	},
	{
		title: 'Dixit',
		minPlayers: 3, maxPlayers: 6, duration: 30, genre: 'Party',
		description:
			'Ein Spiel für Fantasie und Menschenkenntnis: Eine Person beschreibt eine Bildkarte mit einem Wort, einem Satz oder einem Geräusch, und alle anderen suchen aus ihren Karten das passende Bild dazu. Die Kunst ist, den Hinweis weder zu einfach noch zu schwer zu machen. Perfekt für Runden mit viel Gesprächsstoff.',
		rules:
			'Vorbereitung:\n1. Alle erhalten 6 Bildkarten und eine Spielfigur, die auf die Punkteleiste kommt.\n2. Eine Person beginnt als Erzählerin oder Erzähler.\n\nAblauf:\n1. Die erzählende Person wählt eine ihrer Karten und sagt dazu einen Hinweis. Die Karte kommt verdeckt auf den Tisch.\n2. Alle anderen wählen aus ihrer Hand die Karte, die am besten zum Hinweis passt, und legen sie verdeckt dazu.\n3. Alle Karten werden gemischt und offen nummeriert ausgelegt.\n4. Alle ausser der erzählenden Person tippen geheim, welche Karte die Originalkarte ist.\n\nWertung:\n1. Haben alle oder niemand die Originalkarte gefunden, erhalten alle ausser der erzählenden Person 2 Punkte.\n2. Sonst erhalten die erzählende Person und alle, die richtig lagen, je 3 Punkte.\n3. Zusätzlich gibt es 1 Punkt für jede Stimme, die auf die eigene Karte fiel.\n\nSpielende:\n1. Es wird gespielt, bis jemand 30 Punkte erreicht oder der Kartenstapel leer ist.\n\nTipp:\nEin zu präziser Hinweis lässt alle richtig raten, ein zu abstrakter niemanden. Beides gibt der Erzählerin oder dem Erzähler keine Punkte.'
	},
	{
		title: 'Uno',
		minPlayers: 2, maxPlayers: 10, duration: 20, genre: 'Karten',
		description:
			'Der Kartenklassiker für zwischendurch: Wer zuerst alle Karten losgeworden ist, gewinnt die Runde. Mit Aktionskarten wie Aussetzen, Richtungswechsel oder Ziehen kann man den anderen das Leben schwer machen. Die Regeln sind in zwei Minuten erklärt, deshalb eignet sich das Spiel für Kinder, Grosseltern und alle dazwischen.',
		rules:
			'Vorbereitung:\n1. Alle erhalten 7 Karten. Der Rest bildet den Nachziehstapel, die oberste Karte wird als Ablagestapel aufgedeckt.\n\nAblauf:\n1. Wer an der Reihe ist, legt eine Karte, die in Farbe, Zahl oder Symbol zur obersten Karte passt.\n2. Wer nichts legen kann, zieht eine Karte und darf diese sofort ausspielen, wenn sie passt.\n3. Aktionskarten: «Aussetzen» (nächste Person überspringen), «Richtungswechsel», «Plus zwei» (nächste Person zieht zwei), «Joker» (Farbe wählen) und «Joker plus vier» (Farbe wählen, nächste Person zieht vier).\n4. Wer nur noch eine Karte hat, muss laut «Uno» rufen. Wird man dabei ertappt, muss man zwei Karten ziehen.\n\nSpielende:\n1. Die Runde endet, sobald jemand keine Karten mehr hat.\n2. Wer mehrere Runden spielen will, zählt die Punkte der Restkarten der anderen. Wer zuerst 500 Punkte erreicht, gewinnt.\n\nTipp:\nBehalte Joker möglichst bis zum Schluss, so kannst du am Ende noch eine Farbe retten.'
	},
	{
		title: 'Codenames',
		minPlayers: 4, maxPlayers: 8, duration: 20, genre: 'Party',
		description:
			'Zwei Teams treten gegeneinander an und versuchen, ihre geheimen Agenten auf dem Tisch zu finden. Nur die Geheimdienstchefs kennen die Lösung und dürfen ihrem Team genau ein Wort und eine Zahl als Hinweis geben. Das Spiel lebt von cleveren Assoziationen und von der Frage: «Was meint er oder sie bloss damit?»',
		rules:
			'Vorbereitung:\n1. Zwei Teams bilden (Rot und Blau), jedes wählt eine Geheimdienstchefin oder einen Geheimdienstchef.\n2. 25 Wortkarten werden in einem 5×5-Raster ausgelegt.\n3. Die Chefs sehen die Schlüsselkarte: Sie zeigt, welche Wörter zu Rot, Blau, neutral oder zum Attentäter gehören. Das Team, das beginnt, hat 9 Agenten, das andere 8.\n\nAblauf:\n1. Die Chefin oder der Chef des Teams am Zug nennt ein einzelnes Wort und eine Zahl (z. B. «Wasser, 3»). Die Zahl sagt, wie viele Wörter dazu passen.\n2. Das Team rät, indem es auf Wörter tippt. Gehört die Karte zum eigenen Team, darf es weiterraten, maximal Zahl plus eins.\n3. Eine neutrale Karte oder ein gegnerischer Agent beendet den Zug.\n4. Der Hinweis darf kein Wort sein, das auf dem Tisch liegt.\n\nSpielende:\n1. Wer zuerst alle eigenen Agenten gefunden hat, gewinnt.\n2. Tippt ein Team auf den Attentäter, hat es sofort verloren.\n\nTipp:\nBesser ein sicherer Hinweis mit zwei Wörtern als ein riskanter mit fünf.'
	},
	{
		title: 'Ticket to Ride',
		minPlayers: 2, maxPlayers: 5, duration: 60, genre: 'Familie',
		description:
			'Ihr baut Zugverbindungen zwischen Städten und erfüllt geheime Zielkarten. Das Spiel ist leicht zu lernen, bleibt aber bis zum Schluss spannend, weil sich die Spielenden gegenseitig wichtige Strecken wegschnappen können. Ein Klassiker für Familien und Einsteiger.',
		rules:
			'Vorbereitung:\n1. Das Spielbrett auflegen. Alle erhalten 45 Wagen einer Farbe, 4 Wagenkarten und 3 Zielkarten. Mindestens 2 Zielkarten müssen behalten werden.\n2. Fünf Wagenkarten werden offen neben das Brett gelegt.\n\nAblauf:\n1. Pro Zug macht man genau eine von drei Aktionen:\n2. Wagenkarten nehmen: zwei Karten ziehen, offen oder vom Stapel. Eine offene Lokomotive zählt wie zwei Karten.\n3. Eine Strecke bauen: so viele gleichfarbige Wagenkarten abgeben, wie die Strecke Felder hat, und die Wagen daraufsetzen. Das gibt sofort Punkte, längere Strecken mehr.\n4. Zielkarten ziehen: 3 Karten ziehen und mindestens 1 behalten.\n\nSpielende:\n1. Hat jemand nur noch 2 oder weniger Wagen, spielen alle noch eine letzte Runde.\n2. Erfüllte Zielkarten geben Punkte, nicht erfüllte Minuspunkte. Die längste zusammenhängende Strecke bringt 10 Bonuspunkte. Am meisten Punkte gewinnt.\n\nTipp:\nZiehe Zielkarten früh, denn Strecken, die du brauchst, kann dir sonst jemand wegnehmen.'
	},
	{
		title: 'Azul',
		minPlayers: 2, maxPlayers: 4, duration: 40, genre: 'Legespiel',
		description:
			'Ihr seid Fliesenleger und verziert eine Palastwand mit bunten Keramikfliesen. In jeder Runde wählt ihr Fliesen einer Farbe, legt sie in Musterreihen und hofft, dass ihr sie vollständig auf die Wand bringen könnt. Wer zu viele Fliesen nimmt, kassiert Minuspunkte. Optisch ein Hingucker und trotzdem schnell erklärt.',
		rules:
			'Vorbereitung:\n1. Je nach Spielerzahl Fabrikplättchen auslegen (2 Personen: 5, 3 Personen: 7, 4 Personen: 9) und jedes mit 4 zufälligen Fliesen aus dem Beutel füllen.\n2. Jede Person erhält ein Spielertableau mit Musterreihen links, einer Wand rechts und einer Bodenleiste unten.\n\nAblauf:\n1. Wähle eine Fabrik und nimm alle Fliesen einer Farbe. Die übrigen Fliesen der Fabrik kommen in die Tischmitte. Oder nimm alle einer Farbe aus der Tischmitte.\n2. Lege die Fliesen in eine Musterreihe, die noch keine andere Farbe enthält. Was nicht mehr hineinpasst, kommt auf die Bodenleiste und gibt Minuspunkte.\n3. Sind alle Fliesen genommen, endet die Runde. Jede volle Musterreihe schiebt eine Fliese auf die Wand und gibt Punkte für alle angrenzenden Fliesen.\n\nSpielende:\n1. Das Spiel endet nach der Runde, in der jemand eine waagrechte Reihe der Wand komplett gefüllt hat.\n2. Bonuspunkte: ganze Reihe +2, ganze Spalte +7, alle 5 Fliesen einer Farbe +10.\n\nTipp:\nWer die Wand eng zusammenhängend füllt, bekommt für jede neue Fliese mehr Punkte.'
	},
	{
		title: 'Exploding Kittens',
		minPlayers: 2, maxPlayers: 5, duration: 15, genre: 'Karten',
		description:
			'Ein schnelles, freches Kartenspiel nach dem Prinzip «Russisches Roulette mit Katzen»: Ihr zieht reihum Karten und hofft, kein explodierendes Kätzchen zu erwischen. Mit Aktionskarten könnt ihr Gefahren ausweichen oder andere in Schwierigkeiten bringen. Kurze Runden, viel Gelächter.',
		rules:
			'Vorbereitung:\n1. Alle Entschärfen-Karten und alle explodierenden Kätzchen aus dem Stapel nehmen.\n2. Alle erhalten 1 Entschärfen-Karte und 4 weitere Karten vom gemischten Stapel.\n3. In den Stapel kommen so viele explodierende Kätzchen, wie Personen mitspielen minus eins, dazu die übrigen Entschärfen-Karten. Dann gut mischen.\n\nAblauf:\n1. Wer dran ist, darf beliebig viele Karten ausspielen oder keine.\n2. Danach muss man vom Stapel eine Karte ziehen und der Zug endet.\n3. Zieht man ein explodierendes Kätzchen, scheidet man aus, es sei denn, man hat eine Entschärfen-Karte. Dann schiebt man das Kätzchen geheim an einer beliebigen Stelle in den Stapel zurück.\n4. Wichtige Aktionskarten: «Angriff» (nächste Person ist zweimal dran), «Aussetzen» (ohne Ziehen beenden), «Blick in die Zukunft» (die obersten 3 Karten anschauen), «Mischen», «Gefallen» und «Nö» (stoppt eine andere Aktion).\n\nSpielende:\n1. Die letzte Person, die noch im Spiel ist, gewinnt.\n\nTipp:\nMerke dir, wohin du ein Kätzchen zurückgeschoben hast, und nutze «Blick in die Zukunft» vor dem Ziehen.'
	},
	{
		title: 'Pandemic',
		minPlayers: 2, maxPlayers: 4, duration: 60, genre: 'Kooperativ',
		description:
			'Ihr spielt ein Team von Spezialisten, das die Welt vor vier gleichzeitig ausbrechenden Seuchen retten muss. Alle gewinnen oder verlieren gemeinsam. Mit vier Aktionen pro Runde müsst ihr Seuchenherde behandeln, Wissen austauschen und Heilmittel entdecken, bevor die Ausbrüche überhandnehmen. Spannend und stark vom Teamwork abhängig.',
		rules:
			'Vorbereitung:\n1. Jede Person zieht eine Rolle mit einer Spezialfähigkeit und stellt ihre Figur nach Atlanta, wo bereits eine Forschungsstation steht.\n2. Neun Städte werden zu Beginn infiziert, mit 3, 2 und 1 Seuchenwürfeln.\n3. Alle erhalten Spielerkarten (2 Personen: 4, 3 Personen: 3, 4 Personen: 2). Die Epidemie-Karten werden je nach Schwierigkeit in den Stapel eingemischt.\n\nAblauf:\n1. Du hast 4 Aktionen pro Zug: fahren oder fliegen, eine Seuche behandeln (Würfel entfernen), eine Forschungsstation bauen, Wissen teilen (Karten tauschen) oder ein Heilmittel entdecken (5 Karten einer Farbe an einer Station).\n2. Danach zieht man 2 Spielerkarten. Eine Epidemie verschärft die Lage: Eine neue Stadt wird schwer infiziert, die Infektionsrate steigt.\n3. Zum Schluss werden Infektionskarten gezogen und die Städte bekommen neue Seuchenwürfel. Hat eine Stadt bereits 3 Würfel, kommt es zu einem Ausbruch und die Nachbarstädte werden mitinfiziert.\n\nSpielende:\n1. Ihr gewinnt gemeinsam, sobald alle vier Heilmittel entdeckt sind.\n2. Ihr verliert, wenn es 8 Ausbrüche gibt, die Seuchenwürfel einer Farbe ausgehen oder der Spielerkartenstapel leer ist.\n\nTipp:\nBesprecht euch jede Runde im Team, wer welche Aufgabe übernimmt, und behandelt Städte mit drei Würfeln zuerst.'
	},
	{
		title: 'Dobble',
		minPlayers: 2, maxPlayers: 8, duration: 10, genre: 'Party',
		description:
			'Ein Reaktionsspiel, das in wenigen Sekunden erklärt ist: Auf je zwei Karten gibt es immer genau ein gleiches Symbol, und wer es zuerst findet, punktet. Es braucht scharfe Augen und eine schnelle Zunge. Perfekt als kleiner Zwischendurch-Spass für alle Altersstufen.',
		rules:
			'Vorbereitung:\n1. Alle erhalten eine verdeckte Karte, der Rest bildet einen Stapel in der Tischmitte.\n\nAblauf:\n1. Auf Kommando werden die eigene Karte und die oberste Stapelkarte gleichzeitig aufgedeckt.\n2. Wer als Erste oder Erster das Symbol nennt, das auf der eigenen Karte und auf der Stapelkarte vorkommt, nimmt die Stapelkarte und legt sie auf den eigenen Stapel.\n3. Die neue Stapelkarte wird aufgedeckt und es geht weiter.\n4. Die Karten auf den eigenen Stapeln bleiben sichtbar, die oberste Karte ist immer die Vergleichskarte.\n\nSpielende:\n1. Sobald der Stapel in der Mitte leer ist, endet das Spiel.\n2. Wer die meisten Karten gesammelt hat, gewinnt.\n\nTipp:\nSchaue nicht auf die Karte als Ganzes, sondern pick dir ein Symbol heraus und suche es auf der anderen Karte.'
	},
	{
		title: 'Kniffel',
		minPlayers: 1, maxPlayers: 6, duration: 30, genre: 'Würfel',
		description:
			'Das klassische Würfelspiel mit fünf Würfeln und einem Block: In jeder Runde wirfst du bis zu dreimal und entscheidest, welche Würfel du behältst, um bestimmte Kombinationen zu erreichen. Eine Mischung aus Glück und Taktik, auch allein spielbar.',
		rules:
			'Vorbereitung:\n1. Alle erhalten einen Spielblock und einen Stift. Fünf Würfel und ein Becher liegen bereit.\n\nAblauf:\n1. Wer dran ist, würfelt bis zu dreimal mit allen fünf Würfeln. Nach jedem Wurf dürfen beliebige Würfel liegen bleiben, die anderen werden neu geworfen.\n2. Danach trägt man das Ergebnis in genau ein Feld des Blocks ein. Passt die Kombination nirgends, muss man ein Feld streichen (0 Punkte).\n3. Oberer Block: Einser bis Sechser, es zählt die Summe der Würfel mit dieser Zahl. Ab 63 Punkten gibt es einen Bonus von 35.\n4. Unterer Block: Dreierpasch und Viererpasch (Summe aller Augen), Full House (25), kleine Strasse (30), grosse Strasse (40), Kniffel, also fünf gleiche Würfel (50), Chance (Summe aller Augen).\n\nSpielende:\n1. Nach 13 Runden sind alle Felder gefüllt. Die Punkte werden zusammengezählt, die höchste Summe gewinnt.\n\nTipp:\nBeginne die Runde mit der Zahl, die am häufigsten fällt, und streiche zuerst die schwer erreichbaren Felder.'
	},
	{
		title: 'Mario Kart',
		minPlayers: 1, maxPlayers: 4, duration: 30, genre: 'Videospiel',
		description:
			'Ein Rennspiel auf der Konsole für den schnellen Wettkampf zwischendurch: Ihr fahrt auf bunten Strecken, sammelt Items und stört die anderen mit Panzern und Bananenschalen. Gespielt wird am gleichen Bildschirm, ideal für Spieleabende, bei denen auch Gelegenheitsspielende mithalten wollen.',
		rules:
			'Vorbereitung:\n1. Konsole starten, Controller verbinden und den Mehrspielermodus am gleichen Bildschirm wählen.\n2. Eine Rennserie (Cup) auswählen und die Spielstärke, z. B. 100 oder 150 ccm, einstellen.\n3. Alle wählen eine Spielfigur und ein Fahrzeug.\n\nAblauf:\n1. Beim Start rechtzeitig Gas geben, damit der Turbo startet.\n2. Während der Fahrt fährst du durch Item-Boxen und erhältst zufällig ein Item, zum Beispiel einen Panzer, eine Bananenschale oder einen Turbo.\n3. Wer in Kurven driftet und dabei wieder gerade fährt, bekommt einen kurzen Geschwindigkeitsschub.\n4. Ein Cup besteht aus 4 Rennen. Nach jedem Rennen gibt es Punkte nach Platzierung.\n\nSpielende:\n1. Nach dem letzten Rennen werden die Punkte addiert. Wer die meisten hat, gewinnt den Cup.\n\nTipp:\nHalte dich beim Item-Einsatz zurück: Eine Bananenschale hinter dir schützt, ein Panzer nach vorn trifft den Führenden.'
	}
];

// Beispiel-Runden: [Spieltitel, Gewinner, Bewertung, Notiz, vor wie vielen Tagen]
const rounds = [
	['Catan', 'Anna', 'super', 'Lange, aber richtig spannend.', 21],
	['Dixit', 'Ben', 'super', 'Super mit der ganzen Gruppe.', 18],
	['Uno', 'Clara', 'gut', 'Schnell zum Aufwärmen.', 15],
	['Codenames', 'Dario', 'super', 'Lustige Hinweise!', 12],
	['Azul', 'Anna', 'gut', 'Schön und einfach erklärt.', 10],
	['Exploding Kittens', 'Ben', 'gut', '', 7],
	['Catan', 'Clara', 'super', 'Revanche war fällig.', 5],
	['Dobble', 'Dario', 'schlecht', 'Zu hektisch für Grossmutter.', 3],
	['Mario Kart', 'Anna', 'super', 'Finale am Abend.', 1],
	['Qwixx', 'Ben', 'gut', 'Schnell und trotzdem spannend.', 14],
	['Jass (Schieber)', 'Clara', 'super', 'Knappes Ende im letzten Stich.', 9],
	['Werwolf', 'Dario', 'super', 'Die ganze Gruppe war dabei.', 6],
	['Schach', 'Anna', 'gut', 'Lange, aber faire Partie.', 4],
	['Das verrückte Labyrinth', 'Ben', 'super', 'Auch die Kinder hatten Spass.', 2]
];

const allGames = [...games, ...extraGames];

const client = new MongoClient(process.env.DB_URI);

try {
	await client.connect();
	const db = client.db('GameNight');

	const removed = await db.collection('games').deleteMany({ title: { $in: FICTIONAL_TITLES } });
	if (removed.deletedCount) console.log(`Aufgeräumt: ${removed.deletedCount} erfundene Spiele einer früheren Version entfernt.`);

	let added = 0;
	for (const game of allGames) {
		const res = await db
			.collection('games')
			.updateOne({ title: game.title }, { $set: game, $setOnInsert: { createdAt: new Date() } }, { upsert: true });
		if (res.upsertedCount) added++;
	}
	console.log(`Spiele: ${added} neu angelegt, ${allGames.length - added} aktualisiert.`);

	await db.collection('rounds').deleteMany({ userId: 'seed' });
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
} finally {
	await client.close();
}
