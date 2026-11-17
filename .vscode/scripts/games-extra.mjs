// Weitere Beispiel-Spiele, werden von seed.mjs eingelesen.
// Beschreibung und Anleitung sind in eigenen Worten zusammengefasst, sie ersetzen keine Original-Spielregeln.

export const extraGames = [
	{
		title: 'Schach',
		minPlayers: 2, maxPlayers: 2, duration: 60, genre: 'Strategie',
		description:
			'Der Klassiker unter den Denkspielen: Zwei Seiten kämpfen auf 64 Feldern um den gegnerischen König. Es gibt keinen Zufall, nur Planung, Voraussicht und Geduld. Die Grundregeln lernt man schnell, sie zu meistern dauert ein Leben lang.',
		rules:
			'Vorbereitung:\n1. Das Brett so legen, dass jede Person ein helles Feld in der rechten unteren Ecke hat.\n2. In der vorderen Reihe stehen die 8 Bauern, dahinter von aussen nach innen Turm, Springer, Läufer, Dame und König. Die Dame steht auf ihrer eigenen Farbe.\n3. Weiss beginnt, dann wird abwechselnd gezogen.\n\nAblauf:\n1. Der König zieht ein Feld in beliebige Richtung. Die Dame zieht beliebig weit gerade oder diagonal. Der Turm zieht gerade, der Läufer diagonal.\n2. Der Springer springt in L-Form (zwei Felder gerade, eines seitlich) und darf Figuren überspringen.\n3. Der Bauer zieht ein Feld vorwärts (am Anfang auch zwei) und schlägt diagonal.\n4. Landet eine Figur auf einem gegnerischen Feld, wird die gegnerische Figur geschlagen. Sonderzüge sind Rochade, en passant und die Bauernumwandlung.\n\nSpielende:\nWer den gegnerischen König schachmatt setzt, gewinnt. Kann niemand mehr gewinnen oder hat eine Seite keinen erlaubten Zug (Patt), endet die Partie unentschieden.\n\nTipp:\nKontrolliere die Mitte und entwickle Springer und Läufer, bevor du mit der Dame loslegst.'
	},
	{
		title: 'Mühle',
		minPlayers: 2, maxPlayers: 2, duration: 20, genre: 'Strategie',
		description:
			'Ein uraltes Brettspiel für zwei Personen mit nur 9 Steinen pro Seite. Wer drei Steine in eine Reihe bringt, darf einen gegnerischen Stein entfernen. Einfach erklärt, aber überraschend taktisch.',
		rules:
			'Vorbereitung:\n1. Das Mühle-Brett mit drei ineinanderliegenden Quadraten und 24 Punkten auflegen.\n2. Jede Person erhält 9 Steine einer Farbe.\n\nAblauf:\n1. Setzphase: Abwechselnd setzt man einen Stein auf einen freien Punkt.\n2. Bilden drei eigene Steine eine gerade Linie, ist das eine Mühle. Dann entfernt man einen Stein der Gegenseite, der nicht in einer Mühle steht.\n3. Zugphase: Sind alle Steine gesetzt, schiebt man pro Zug einen Stein entlang einer Linie auf den nächsten freien Punkt.\n4. Springphase: Hat jemand nur noch drei Steine, darf er mit einem Stein auf jeden freien Punkt springen.\n\nSpielende:\nWer nur noch zwei Steine hat oder keinen Zug mehr machen kann, verliert.\n\nTipp:\nBeweglichkeit ist wichtiger als schnelle Mühlen: Wer eingesperrt wird, verliert, auch mit vielen Steinen.'
	},
	{
		title: 'Dame',
		minPlayers: 2, maxPlayers: 2, duration: 30, genre: 'Strategie',
		description:
			'Ein klassisches Zwei-Personen-Spiel auf dem Schachbrett: Ihr zieht diagonal und versucht, die gegnerischen Steine zu überspringen. Wer die andere Seite erreicht, bekommt eine mächtige Dame. Die Regeln unterscheiden sich je nach Region, deshalb vorher kurz abmachen.',
		rules:
			'Vorbereitung:\n1. Das Brett so legen, dass jede Person ein dunkles Feld in der linken unteren Ecke hat.\n2. Jede Person stellt 12 Steine auf die dunklen Felder der drei vordersten Reihen.\n\nAblauf:\n1. Man zieht einen Stein ein Feld diagonal nach vorne auf ein freies dunkles Feld.\n2. Steht ein gegnerischer Stein diagonal davor und dahinter ist es frei, springt man darüber und nimmt den Stein vom Brett. Oft gilt Schlagzwang, das heisst, man muss schlagen, wenn es möglich ist.\n3. Mehrfachsprünge sind erlaubt, wenn nach dem Sprung gleich der nächste möglich ist.\n4. Erreicht ein Stein die letzte Reihe der Gegenseite, wird er zur Dame. Sie darf je nach Variante beliebig weit diagonal in alle Richtungen ziehen.\n\nSpielende:\nWer alle gegnerischen Steine geschlagen hat oder die Gegenseite blockiert, gewinnt.\n\nTipp:\nHalte deine hinteren Steine möglichst lange stehen, so kommt die Gegenseite nicht leicht zur Dame.'
	},
	{
		title: 'Mensch ärgere dich nicht',
		minPlayers: 2, maxPlayers: 4, duration: 30, genre: 'Familie',
		description:
			'Der Familienklassiker, bei dem Glück und Ärger nah beieinanderliegen: Wer eine Figur schlagen kann, schickt sie zurück an den Start. Ideal für Kinder und Grosseltern, weil man keine Strategie lernen muss und trotzdem mitfiebert.',
		rules:
			'Vorbereitung:\n1. Alle wählen eine Farbe und stellen ihre 4 Figuren in das eigene Haus.\n\nAblauf:\n1. Wer an der Reihe ist, würfelt. Mit einer 6 kommt eine Figur auf das eigene Startfeld und man würfelt gleich noch einmal. Sind alle Figuren im Haus, hat man pro Zug drei Versuche.\n2. Jede Figur zieht so viele Felder im Uhrzeigersinn, wie der Würfel zeigt.\n3. Landet man auf einem Feld mit einer gegnerischen Figur, wird diese geschlagen und muss zurück ins Haus.\n4. Steht eine eigene Figur auf dem Startfeld, muss sie zuerst ziehen, damit neue Figuren hinauskönnen.\n5. Die Figuren laufen eine ganze Runde und ziehen dann in die vier Zielfelder.\n\nSpielende:\nWer als Erste oder Erster alle vier Figuren im Ziel hat, gewinnt.\n\nTipp:\nSchlage lieber Figuren, die kurz vor dem Ziel stehen, denn sie verlieren am meisten.'
	},
	{
		title: 'Monopoly',
		minPlayers: 2, maxPlayers: 6, duration: 90, genre: 'Familie',
		description:
			'Ihr kauft Strassen, baut Häuser und kassiert Miete, bis die anderen pleite sind. Das Spiel kombiniert Würfelglück mit Verhandlungsgeschick und kann lange dauern. Die Regeln und das Startgeld unterscheiden sich je nach Ausgabe.',
		rules:
			'Vorbereitung:\n1. Das Spielbrett auslegen, das Spielgeld (meist 1500 pro Person) und die Grundstückskarten bereitlegen.\n2. Alle wählen eine Figur und stellen sie auf «Los».\n\nAblauf:\n1. Wer an der Reihe ist, würfelt mit zwei Würfeln und zieht die Figur im Uhrzeigersinn.\n2. Landet man auf einem freien Grundstück, darf man es kaufen. Sonst wird es versteigert.\n3. Landet man auf einem fremden Grundstück, zahlt man Miete.\n4. Besitzt man alle Strassen einer Farbe, darf man Häuser und später Hotels bauen und kassiert höhere Miete.\n5. Bei Ereignis- und Gemeinschaftsfeldern zieht man eine Karte. Das Gefängnis erreicht man über ein bestimmtes Feld, eine Karte oder dreimal Pasch.\n6. Beim Überqueren von «Los» erhält man Geld von der Bank.\n\nSpielende:\nWer kein Geld mehr hat, scheidet aus. Die letzte verbleibende Person gewinnt. Alternativ spielt man eine Zeit lang und die reichste Person gewinnt.\n\nTipp:\nOrange und rote Strassen werden am häufigsten besucht, weil sie kurz hinter dem Gefängnis liegen.'
	},
	{
		title: 'Scrabble',
		minPlayers: 2, maxPlayers: 4, duration: 60, genre: 'Wortspiel',
		description:
			'Ein Spiel für alle, die gern Wörter bilden: Aus sieben Buchstabensteinen legt ihr Wörter wie in einem Kreuzworträtsel auf das Brett und sammelt Punkte. Seltene Buchstaben und Bonusfelder machen den Unterschied.',
		rules:
			'Vorbereitung:\n1. Alle Buchstabensteine kommen in den Beutel. Jede Person zieht 7 Steine und stellt sie auf ihren Halter.\n2. Alle ziehen einen Stein: Wer dem Buchstaben A am nächsten ist, beginnt.\n\nAblauf:\n1. Das erste Wort muss über das Stern-Feld in der Mitte gelegt werden, danach müssen neue Wörter an bestehende anschliessen.\n2. Die Steine eines Zuges liegen immer in einer Zeile oder Spalte. Alle entstehenden Wörter müssen gültig sein.\n3. Punkte: Summe der Buchstabenwerte, mit den Bonusfeldern (Buchstabe doppelt oder dreifach, Wort doppelt oder dreifach).\n4. Danach zieht man Steine nach, bis man wieder 7 hat. Wer nicht legen kann, tauscht Steine oder setzt aus.\n5. Werden alle 7 Steine in einem Zug gelegt, gibt es 50 Bonuspunkte.\n\nSpielende:\nSind der Beutel leer und eine Person ohne Steine, endet das Spiel. Übrige Steine zählen als Minuspunkte. Die höchste Punktzahl gewinnt.\n\nTipp:\nKurze Wörter mit Z, X oder Q auf einem Bonusfeld sind oft mehr wert als lange Wörter.'
	},
	{
		title: 'Cluedo',
		minPlayers: 3, maxPlayers: 6, duration: 45, genre: 'Rätsel',
		description:
			'Im Herrenhaus ist ein Mord geschehen. Ihr klärt durch Befragen und Kombinieren, wer es war, womit und in welchem Raum. Notizblock und gutes Zuhören sind eure wichtigsten Werkzeuge.',
		rules:
			'Vorbereitung:\n1. Je eine Person-, Waffen- und Raumkarte kommt verdeckt in den Umschlag. Das ist die Lösung.\n2. Die restlichen Karten werden gleichmässig an alle verteilt.\n3. Alle erhalten einen Detektivblock und eine Spielfigur.\n\nAblauf:\n1. Wer an der Reihe ist, würfelt und bewegt sich in einen Raum.\n2. In einem Raum darf man eine Vermutung äussern: Person, Waffe und der aktuelle Raum. Die genannte Figur und Waffe kommen in den Raum.\n3. Reihum zeigt die erste Person mit einer passenden Karte diese heimlich. Die anderen sehen nicht, welche Karte es war.\n4. Mit jedem Hinweis streicht man auf dem Block Möglichkeiten durch.\n5. Wer sicher ist, macht eine Anklage und schaut heimlich in den Umschlag.\n\nSpielende:\nStimmt die Anklage, gewinnt man. Stimmt sie nicht, scheidet man aus und hilft nur noch mit Kartenzeigen.\n\nTipp:\nAuch Fragen, die du nicht selbst stellst, geben Hinweise. Beobachte, wer welche Karten zeigt.'
	},
	{
		title: 'Activity',
		minPlayers: 4, maxPlayers: 16, duration: 45, genre: 'Party',
		description:
			'Ein Spiel für Teams, bei dem Begriffe gezeichnet, umschrieben oder pantomimisch dargestellt werden. Sobald die Sanduhr läuft, wird es hektisch und lustig. Es braucht keine Vorkenntnisse und eignet sich für grosse Runden.',
		rules:
			'Vorbereitung:\n1. Zwei oder mehr Teams bilden. Jedes Team stellt eine Figur auf das Startfeld.\n2. Karten, Würfel und Sanduhr bereitlegen.\n\nAblauf:\n1. Das Team am Zug zieht eine Karte. Darauf stehen Begriffe für Zeichnen, Umschreiben und Darstellen (Pantomime), meist mit Punktzahlen.\n2. Ein Teammitglied sucht eine Kategorie und einen Begriff aus.\n3. Die Sanduhr wird umgedreht. Das Teammitglied stellt den Begriff dar, ohne ihn zu sagen, und das Team rät.\n4. Wird der Begriff erraten, rückt das Team entsprechend der Punktzahl vor. Sonst kommt das nächste Team an die Reihe.\n\nSpielende:\nDas erste Team, das das Zielfeld erreicht und dort einen Begriff errät, gewinnt.\n\nTipp:\nWähle Begriffe, bei denen alle in deinem Team sofort eine Idee haben.'
	},
	{
		title: 'Jenga',
		minPlayers: 1, maxPlayers: 8, duration: 15, genre: 'Geschicklichkeit',
		description:
			'Ein Turm aus Holzklötzen, aus dem ihr abwechselnd Klötze zieht und oben wieder anlegt. Es braucht eine ruhige Hand und Nervenstärke. Wer den Turm zum Einsturz bringt, verliert.',
		rules:
			'Vorbereitung:\n1. Der Turm wird aus 54 Klötzen gebaut: 18 Etagen mit je 3 Klötzen, jede Etage quer zur darunterliegenden.\n\nAblauf:\n1. Wer an der Reihe ist, zieht mit einer Hand einen Klotz aus einer Etage unterhalb der obersten vollständigen Etage.\n2. Der Klotz wird oben quer auf den Turm gelegt, sodass eine neue Etage entsteht.\n3. Der Turm darf nur mit einer Hand berührt werden. Mit der Fingerspitze tastet man, welche Klötze locker sind.\n4. Danach ist die nächste Person dran.\n\nSpielende:\nStürzt der Turm bei einem Zug ein, hat die Person verloren, die ihn zuletzt bewegt hat. Mit dem Rest wird neu aufgebaut.\n\nTipp:\nKlötze aus der Mitte einer Etage sind oft leichter zu ziehen als die äusseren.'
	},
	{
		title: 'Mau-Mau',
		minPlayers: 2, maxPlayers: 5, duration: 15, genre: 'Karten',
		description:
			'Ein schnelles Kartenspiel mit 32 Karten, das fast alle kennen. Wer zuerst keine Karten mehr hat, gewinnt. Die Sonderkarten sorgen für Überraschungen, die Regeln unterscheiden sich allerdings je nach Region.',
		rules:
			'Vorbereitung:\n1. Mit einem Kartenspiel zu 32 Karten (Sieben bis Ass) wird gespielt. Alle erhalten 5 Karten.\n2. Die oberste Karte des Stapels wird offen als Ablagestapel hingelegt.\n\nAblauf:\n1. Man legt eine Karte mit gleicher Farbe oder gleichem Wert auf den Ablagestapel.\n2. Wer nichts legen kann, zieht eine Karte und darf sie spielen, wenn sie passt.\n3. Sonderkarten (häufige Variante): Bei einer Sieben zieht die nächste Person zwei Karten, es sei denn, sie legt selbst eine Sieben. Eine Acht lässt die nächste Person aussetzen. Ein Bube darf auf fast alles gelegt werden, und die Person wünscht sich eine Farbe.\n4. Wer nur noch eine Karte hat, sagt «Mau». Wer es vergisst und erwischt wird, zieht zwei Karten.\n\nSpielende:\nWer alle Karten losgeworden ist und «Mau-Mau» sagt, gewinnt die Runde.\n\nTipp:\nMerke dir, welche Farben die anderen gerade nicht ablegen können, und wünsche dir genau diese.'
	},
	{
		title: 'Jass (Schieber)',
		minPlayers: 4, maxPlayers: 4, duration: 60, genre: 'Karten',
		description:
			'Das beliebteste Kartenspiel der Schweiz: Zwei Teams spielen gegeneinander und sammeln Punkte mit Stichen. Gespielt wird mit 36 Karten, vor jeder Runde wird eine Trumpffarbe bestimmt. Es verbindet Taktik, Absprache mit dem Partner und ein wenig Glück.',
		rules:
			'Vorbereitung:\n1. Vier Personen spielen in zwei Teams, die Partner sitzen sich gegenüber. Alle erhalten 9 Karten.\n2. Die Person, die beginnt, bestimmt die Trumpffarbe oder «schiebt» die Entscheidung an den Partner.\n\nAblauf:\n1. Es wird reihum je eine Karte in die Mitte gelegt. Man muss die ausgespielte Farbe bedienen. Wer das nicht kann, darf trumpfen oder eine andere Karte abwerfen.\n2. Den Stich gewinnt die höchste Karte der ausgespielten Farbe oder der höchste Trumpf. Die Siegerin oder der Sieger spielt den nächsten Stich aus.\n3. Beim Zählen sind die Trumpfkarten Bauer (20), Nell, also die Neun (14), Ass (11), König (4), Ober (3) und Banner, also die Zehn (10) wertvoll. In den anderen Farben zählen Ass (11), König (4), Ober (3), Under (2) und Banner (10).\n\nWertung:\nAlle Stiche ergeben zusammen 157 Punkte, der letzte Stich zählt 5 Punkte extra.\nGewinnt ein Team alle Stiche, gibt es zusätzlich 100 Punkte (Match).\n\nSpielende:\nEs wird gespielt, bis ein Team die vorher vereinbarte Punktzahl erreicht, zum Beispiel 1000.\n\nTipp:\nSprich dich mit dem Partner über Handzeichen und gespielte Karten ab, so wisst ihr, wer welche Farbe stark hat.'
	},
	{
		title: 'Qwixx',
		minPlayers: 2, maxPlayers: 5, duration: 15, genre: 'Würfel',
		description:
			'Ein schnelles Würfelspiel, bei dem alle gleichzeitig mitspielen. Ihr kreuzt Zahlen in vier Farbreihen an, und je mehr Kreuze in einer Reihe stehen, desto mehr Punkte gibt es. Gutes Abwägen zählt mehr als reines Glück.',
		rules:
			'Vorbereitung:\n1. Alle erhalten einen Block und einen Stift. Es gibt zwei weisse und vier farbige Würfel.\n2. Die roten und gelben Reihen laufen von 2 bis 12, die grünen und blauen von 12 bis 2.\n\nAblauf:\n1. Die aktive Person würfelt alle sechs Würfel.\n2. Zuerst dürfen alle die Summe der beiden weissen Würfel in einer beliebigen Farbreihe ankreuzen.\n3. Danach darf nur die aktive Person die Summe eines weissen und eines farbigen Würfels in der passenden Farbreihe ankreuzen.\n4. Man darf nur Felder rechts von allen bisherigen Kreuzen ankreuzen, Felder dazwischen verfallen.\n5. Wer in der aktiven Runde nichts ankreuzt, muss ein Fehlwurf-Kästchen ankreuzen (je 5 Minuspunkte).\n6. Eine Reihe darf man mit dem letzten Feld abschliessen, wenn man mindestens 5 Kreuze darin hat.\n\nSpielende:\nSind zwei Reihen geschlossen oder hat jemand vier Fehlwürfe, ist das Spiel zu Ende. Pro Reihe zählt man die Punkte nach der Anzahl Kreuze.\n\nTipp:\nWer zu viele Felder überspringt, verliert Punkte, also nutze lieber kleine Lücken.'
	},
	{
		title: 'Qwirkle',
		minPlayers: 2, maxPlayers: 4, duration: 45, genre: 'Legespiel',
		description:
			'Ihr legt Steine mit Farben und Formen aneinander und sammelt Punkte für jede Reihe. Es braucht keine Wörter und keine Kenntnisse, nur Auge und Planung. Wer eine Reihe mit sechs verschiedenen Steinen legt, erhält einen Qwirkle-Bonus.',
		rules:
			'Vorbereitung:\n1. Alle erhalten 6 Steine aus dem Beutel. Auf jedem Stein ist eine von 6 Formen in einer von 6 Farben abgebildet.\n2. Wer die längste Reihe mit gleichen Farben oder Formen hat, beginnt.\n\nAblauf:\n1. Man legt einen oder mehrere Steine an. Alle Steine eines Zuges müssen in einer Reihe liegen.\n2. Jede entstehende Reihe muss entweder gleiche Farben mit verschiedenen Formen oder gleiche Formen mit verschiedenen Farben zeigen. Kein Stein darf doppelt in einer Reihe vorkommen.\n3. Man erhält einen Punkt pro Stein in jeder Reihe, die man verändert hat.\n4. Danach zieht man Steine nach, bis man wieder 6 hat.\n\nSpielende:\nSobald der Beutel leer ist und jemand alle Steine gelegt hat, endet das Spiel. Wer die meisten Punkte hat, gewinnt.\n\nTipp:\nMit einem Stein, der zwei Reihen gleichzeitig verlängert, holst du die meisten Punkte.'
	},
	{
		title: 'Rummikub',
		minPlayers: 2, maxPlayers: 4, duration: 45, genre: 'Legespiel',
		description:
			'Ein Spiel mit Zahlensteinen, bei dem ihr Reihen und Gruppen legt und bestehende Kombinationen auf dem Tisch umbaut. Wer zuerst alle Steine los ist, gewinnt. Das Umlegen von Steinen sorgt für überraschende Wendungen.',
		rules:
			'Vorbereitung:\n1. Alle Steine werden gemischt, jede Person nimmt 14 und stellt sie auf ihren Ständer.\n2. Ein Spiel hat vier Farben mit den Zahlen 1 bis 13 (zweimal) und zwei Jokern.\n\nAblauf:\n1. Wer an der Reihe ist, legt Steine aus: Reihen (aufeinanderfolgende Zahlen derselben Farbe, mindestens 3) oder Gruppen (gleiche Zahl in mindestens 3 verschiedenen Farben).\n2. Beim ersten Auslegen müssen die Steine zusammen mindestens 30 Punkte ergeben und stammen nur vom eigenen Ständer.\n3. Danach darf man beliebige Steine anlegen und Kombinationen auf dem Tisch umbauen, solange am Ende alle Kombinationen gültig sind.\n4. Kann oder will man nichts legen, zieht man einen Stein.\n\nSpielende:\nWer als Erste oder Erster alle Steine abgelegt hat, gewinnt. Die anderen zählen die Zahlen ihrer Steine als Minuspunkte.\n\nTipp:\nHalte den Joker möglichst lange zurück, er rettet dich bei schwierigen Umbauten.'
	},
	{
		title: 'Scotland Yard',
		minPlayers: 3, maxPlayers: 6, duration: 60, genre: 'Rätsel',
		description:
			'Eine Person spielt den unsichtbaren Mister X, der durch London flieht, die anderen jagen ihn als Detektive. Gefahren wird mit Taxi, Bus und U-Bahn. Nur zu bestimmten Zeitpunkten zeigt sich Mister X, den Rest müssen die Detektive erraten.',
		rules:
			'Vorbereitung:\n1. Eine Person übernimmt Mister X, alle anderen sind Detektive.\n2. Alle ziehen zufällig Startfelder und erhalten Fahrscheine für Taxi, Bus und U-Bahn. Mister X bekommt zusätzlich schwarze Tickets und Doppelzüge.\n\nAblauf:\n1. Mister X zieht zuerst und notiert verdeckt sein Verkehrsmittel auf einer Zugtafel, seinen Standort zeigt er nicht.\n2. Danach ziehen die Detektive offen ein Feld weiter und geben ihr benutztes Ticket an Mister X.\n3. In bestimmten Runden (3, 8, 13, 18 und 24) zeigt Mister X seinen Standort.\n4. Die Detektive versuchen, ihn durch die Verkehrsmittel auf der Tafel einzukreisen.\n\nSpielende:\nMister X verliert, wenn ein Detektiv sein Feld erreicht oder er nicht mehr ziehen kann. Er gewinnt, wenn er nach der 24. Runde noch unentdeckt ist oder die Detektive keine Tickets mehr haben.\n\nTipp:\nAls Detektive sprecht euch ab, wer welche Ausgänge abschneidet.'
	},
	{
		title: 'Das verrückte Labyrinth',
		minPlayers: 2, maxPlayers: 4, duration: 20, genre: 'Familie',
		description:
			'Ein Labyrinth, das sich bei jedem Zug verändert: Ihr schiebt Gangteile hinein und sucht den Weg zu euren Schätzen. Ein schnelles, fröhliches Spiel für Kinder und Erwachsene.',
		rules:
			'Vorbereitung:\n1. Die Gangteile werden zufällig auf das Brett gelegt, ein Teil bleibt übrig.\n2. Jede Person bekommt einen Stapel Schatzkarten und stellt die Figur in die eigene Ecke.\n3. Die oberste Schatzkarte wird angeschaut, die anderen bleiben verdeckt.\n\nAblauf:\n1. Wer an der Reihe ist, schiebt das übrige Gangteil von aussen in eine Zeile oder Spalte. Dadurch wird ein anderes Teil hinausgeschoben.\n2. Man darf die Zeile oder Spalte nicht gleich wieder zurückschieben, die der Vorgänger verschoben hat.\n3. Danach zieht man seine Figur beliebig weit über offene Gänge.\n4. Hat man den gesuchten Schatz erreicht, dreht man die Karte um und schaut die nächste an.\n\nSpielende:\nWer alle Schätze gesammelt hat und zuerst wieder auf dem Startfeld steht, gewinnt.\n\nTipp:\nSchiebe so, dass du deinen Weg öffnest und gleichzeitig den Weg der anderen unterbrichst.'
	},
	{
		title: 'Tabu',
		minPlayers: 4, maxPlayers: 10, duration: 30, genre: 'Party',
		description:
			'Ein Spiel für zwei Teams, in dem ihr einen Begriff erklären müsst, ohne die naheliegendsten Wörter zu verwenden. Sobald jemand ein verbotenes Wort sagt, ertönt der Summer. Gut für gesellige Runden und Wortgewandte.',
		rules:
			'Vorbereitung:\n1. Zwei Teams bilden. Karten, Sanduhr und Summer bereitlegen.\n\nAblauf:\n1. Ein Mitglied des Teams am Zug zieht eine Karte. Darauf steht oben der gesuchte Begriff und darunter mehrere verbotene Wörter.\n2. Die Sanduhr wird umgedreht. Die Person erklärt den Begriff mit Worten, ohne den Begriff, verbotene Wörter, Wortteile, Gesten oder Fremdsprachen zu verwenden.\n3. Das Team rät so viele Begriffe wie möglich, bis die Zeit abgelaufen ist.\n4. Das gegnerische Team passt auf und drückt den Summer bei Fehlern.\n\nSpielende:\nFür jeden erratenen Begriff erhält das Team einen Punkt, für jeden Fehler gibt es einen Minuspunkt. Nach einer vereinbarten Anzahl Runden gewinnt das Team mit den meisten Punkten.\n\nTipp:\nWenn dir kein Satz einfällt, wechsle zur nächsten Karte, anstatt Zeit zu verlieren.'
	},
	{
		title: 'Wer bin ich?',
		minPlayers: 2, maxPlayers: 10, duration: 15, genre: 'Party',
		description:
			'Jede Person trägt eine berühmte Figur oder Person auf der Stirn, die sie selbst nicht sieht. Durch Ja-Nein-Fragen findet ihr heraus, wer ihr seid. Einfach vorbereitet und überall spielbar.',
		rules:
			'Vorbereitung:\n1. Alle schreiben auf Haftnotizen bekannte Figuren, Personen oder Tiere.\n2. Jede Person bekommt eine fremde Notiz auf die Stirn, ohne sie selbst zu sehen.\n\nAblauf:\n1. Reihum stellt man den anderen Fragen, die nur mit Ja oder Nein beantwortet werden dürfen, zum Beispiel «Bin ich eine Frau?» oder «Gibt es mich wirklich?».\n2. Bei einem «Ja» darf man weiterfragen, bei einem «Nein» ist die nächste Person dran.\n3. Wer glaubt, die Lösung zu kennen, nennt sie direkt.\n\nSpielende:\nWer seine Identität zuerst richtig errät, gewinnt. Danach kann man weiterspielen, bis alle gelöst haben.\n\nTipp:\nBeginne mit allgemeinen Fragen (Mensch oder Tier, real oder erfunden) und gehe dann ins Detail.'
	},
	{
		title: 'Stadt Land Fluss',
		minPlayers: 2, maxPlayers: 8, duration: 20, genre: 'Wortspiel',
		description:
			'Ein Papierspiel, für das ihr nur Stift und Zettel braucht. Zu einem zufälligen Buchstaben müsst ihr Begriffe aus verschiedenen Kategorien finden, und wer originelle Antworten hat, bekommt mehr Punkte.',
		rules:
			'Vorbereitung:\n1. Auf einem Blatt eine Tabelle mit Kategorien anlegen, zum Beispiel Stadt, Land, Fluss, Tier, Beruf und Name.\n\nAblauf:\n1. Eine Person zählt im Kopf das Alphabet durch, eine andere sagt «Stopp». Der Buchstabe, bei dem man gerade ist, wird verwendet.\n2. Alle schreiben zu jeder Kategorie einen passenden Begriff, der mit diesem Buchstaben beginnt.\n3. Wer fertig ist, ruft «Stopp», und alle hören auf zu schreiben.\n4. Reihum liest man die Antworten vor. Pro Kategorie gibt es 20 Punkte, wenn nur du eine Antwort hast, 10 Punkte für eine Antwort, die kein anderer hat, und 5 Punkte, wenn mehrere dasselbe geschrieben haben.\n\nSpielende:\nNach einer vereinbarten Zahl Runden zählt man die Punkte zusammen. Die höchste Summe gewinnt.\n\nTipp:\nOriginelle Begriffe zählen mehr als die erstbesten, die allen einfallen.'
	},
	{
		title: 'Trivial Pursuit',
		minPlayers: 2, maxPlayers: 6, duration: 60, genre: 'Quiz',
		description:
			'Das Wissens-Quiz zum Brettspiel: Ihr beantwortet Fragen aus sechs Kategorien, um farbige Käsestücke zu sammeln. Wer alle sechs hat, muss im Zentrum eine finale Frage beantworten. Gute Allgemeinbildung ist von Vorteil.',
		rules:
			'Vorbereitung:\n1. Alle erhalten eine Spielfigur samt Käseschachtel und stellen sie in die Mitte des Brettes.\n2. Die Fragekarten liegen bereit, jede Karte enthält Fragen zu allen sechs Kategorien.\n\nAblauf:\n1. Man würfelt und zieht in beliebige Richtung entlang der Felder.\n2. Die Farbe des Feldes bestimmt die Kategorie. Die Person links liest die Frage vor.\n3. Wer richtig antwortet, würfelt erneut. Bei einer falschen Antwort ist die nächste Person dran.\n4. Auf den Käse-Feldern am Rand erhält man bei richtiger Antwort einen farbigen Käsekeil.\n\nSpielende:\nWer alle sechs Käsekeile hat, geht zurück zur Mitte. Die anderen wählen die Kategorie der Abschlussfrage. Wird sie richtig beantwortet, gewinnt man.\n\nTipp:\nMit einer Mannschaft mit verschiedenen Wissensgebieten macht das Spiel noch mehr Spass.'
	},
	{
		title: '6 nimmt!',
		minPlayers: 2, maxPlayers: 10, duration: 30, genre: 'Karten',
		description:
			'Ein schnelles Kartenspiel, bei dem ihr gleichzeitig Karten wählt und so wenige Karten wie möglich nehmen wollt. Es gibt keine Verlierer durch Zufall, sondern durch falsches Einschätzen der anderen. Ideal für grosse Runden.',
		rules:
			'Vorbereitung:\n1. Das Spiel besteht aus 104 Karten mit Zahlen und Stierköpfen (Minuspunkte). Alle erhalten 10 Karten.\n2. Vier Karten werden als Startkarten für vier Reihen offen in die Tischmitte gelegt.\n\nAblauf:\n1. Alle wählen gleichzeitig eine Karte und legen sie verdeckt hin. Dann werden alle aufgedeckt.\n2. Von der niedrigsten zur höchsten Karte werden sie in die Reihe angelegt, deren letzte Karte kleiner ist und am nächsten liegt.\n3. Wer die sechste Karte in eine Reihe legt, muss die ersten fünf Karten nehmen und erhält deren Stierköpfe als Minuspunkte. Die sechste Karte wird zur neuen Startkarte.\n4. Ist die gespielte Karte kleiner als alle Reihenenden, nimmt man eine Reihe nach Wahl.\n\nSpielende:\nNach zehn Runden endet ein Durchgang. Wer die wenigsten Minuspunkte hat, gewinnt. Ein längeres Spiel endet, wenn jemand 66 Minuspunkte erreicht hat.\n\nTipp:\nSpiele Karten, die weit von den Reihenenden entfernt sind, nicht ganz am Anfang.'
	},
	{
		title: 'Halli Galli',
		minPlayers: 2, maxPlayers: 6, duration: 15, genre: 'Party',
		description:
			'Ein Reaktionsspiel mit Früchten und einer Glocke: Sobald genau fünf gleiche Früchte offen liegen, wird geklingelt. Es braucht Schnelligkeit und scharfe Augen, ein grosser Spass für alle Altersgruppen.',
		rules:
			'Vorbereitung:\n1. Die Karten werden gleichmässig verteilt, jede Person hat einen verdeckten Stapel vor sich. Die Glocke steht in der Mitte.\n\nAblauf:\n1. Reihum dreht jede Person die oberste Karte ihres Stapels um und legt sie offen vor sich hin.\n2. Sind auf allen sichtbaren Karten zusammen genau fünf Früchte derselben Sorte zu sehen, wird die Glocke geschlagen.\n3. Wer zuerst klingelt, nimmt alle offenen Karten und legt sie unter den eigenen Stapel.\n4. Wer fälschlicherweise klingelt, muss jeder anderen Person eine Karte abgeben.\n\nSpielende:\nWer keine Karten mehr hat, scheidet aus. Die letzte Person im Spiel gewinnt.\n\nTipp:\nSchau nicht auf einzelne Karten, sondern zähle immer die Summe pro Frucht.'
	},
	{
		title: 'Wizard',
		minPlayers: 3, maxPlayers: 6, duration: 45, genre: 'Karten',
		description:
			'Ein Stichspiel, bei dem ihr vor jeder Runde ansagen müsst, wie viele Stiche ihr macht. Nur wer genau richtig liegt, bekommt Punkte. Die Zauberer und Narren verändern die Lage und sorgen für Überraschungen.',
		rules:
			'Vorbereitung:\n1. Das Spiel besteht aus 60 Karten: vier Farben mit den Werten 1 bis 13, vier Zauberer und vier Narren.\n2. Es wird in mehreren Runden gespielt. In der ersten Runde erhält jede Person eine Karte, danach jeweils eine mehr.\n3. Die oberste Karte des Stapels bestimmt die Trumpffarbe.\n\nAblauf:\n1. Alle sagen an, wie viele Stiche sie in dieser Runde machen wollen.\n2. Die Person links vom Geber spielt aus. Man muss die Farbe bedienen, wenn man kann. Zauberer schlagen alles, Narren verlieren immer.\n3. Den Stich gewinnt der höchste Trumpf oder, wenn es keinen gibt, die höchste Karte der angespielten Farbe.\n\nWertung:\nWer genau richtig angesagt hat, erhält 20 Punkte plus 10 Punkte pro Stich.\nWer danebenliegt, verliert 10 Punkte pro Stich Unterschied.\n\nSpielende:\nNach der letzten Runde (60 geteilt durch die Zahl der Spielenden) gewinnt, wer die meisten Punkte hat.\n\nTipp:\nIn den ersten Runden mit wenigen Karten sind Ansagen von null Stichen oft die sichersten.'
	},
	{
		title: 'Werwolf',
		minPlayers: 6, maxPlayers: 18, duration: 30, genre: 'Party',
		description:
			'Ein Dorf wird von Werwölfen bedroht, aber niemand weiss, wer sie sind. In Nacht- und Tagrunden verdächtigt und verteidigt ihr euch gegenseitig. Das Spiel lebt von Bluffen, Diskutieren und guter Menschenkenntnis.',
		rules:
			'Vorbereitung:\n1. Eine Person übernimmt die Spielleitung. Alle anderen ziehen verdeckt eine Rolle: Dorfbewohner, Werwolf oder Seherin.\n2. Bei etwa 8 Personen sind meist 2 Werwölfe und 1 Seherin dabei.\n\nAblauf:\n1. Nacht: Alle schliessen die Augen. Die Werwölfe öffnen sie und bestimmen leise ein Opfer. Danach öffnet die Seherin die Augen und fragt, ob eine Person ein Werwolf ist. Die Spielleitung antwortet mit Nicken.\n2. Tag: Alle öffnen die Augen. Die Spielleitung teilt mit, wer in der Nacht ausgeschieden ist.\n3. Das Dorf diskutiert, wer verdächtig ist, und stimmt ab. Die Person mit den meisten Stimmen scheidet aus und deckt ihre Rolle auf.\n4. Dann folgt wieder eine Nacht.\n\nSpielende:\nDas Dorf gewinnt, wenn alle Werwölfe ausgeschieden sind. Die Werwölfe gewinnen, wenn sie gleich viele oder mehr sind als die Dorfbewohner.\n\nTipp:\nAls Werwolf hilft es, im Dorf unauffällig mitzudiskutieren und andere Verdächtige zu nennen.'
	},
	{
		title: 'Mastermind',
		minPlayers: 2, maxPlayers: 2, duration: 15, genre: 'Rätsel',
		description:
			'Ein Knobelspiel für zwei: Eine Person denkt sich einen geheimen Farbcode aus, die andere versucht ihn in möglichst wenigen Zügen zu knacken. Rückmeldungen mit kleinen Stiften zeigen, wie nah man dran ist.',
		rules:
			'Vorbereitung:\n1. Die Codiererin oder der Codierer steckt verdeckt vier farbige Stifte aus sechs möglichen Farben als Geheimcode auf. Farben dürfen mehrfach vorkommen.\n\nAblauf:\n1. Die ratende Person legt eine Reihe aus vier Stiften als Tipp.\n2. Die Codiererin oder der Codierer gibt Rückmeldung: Ein schwarzer Stift bedeutet, dass eine Farbe an der richtigen Stelle steckt. Ein weisser bedeutet, dass die Farbe im Code vorkommt, aber an einer anderen Stelle.\n3. Die ratende Person versucht mit den Hinweisen, den Code in höchstens 10 Versuchen zu knacken.\n\nSpielende:\nHat die ratende Person den Code geknackt, wechselt man die Rollen. Wer weniger Versuche benötigt, gewinnt.\n\nTipp:\nBeginne mit zwei Farben doppelt, zum Beispiel Rot-Rot-Blau-Blau, so erhältst du schnell Informationen.'
	},
	{
		title: 'Vier gewinnt',
		minPlayers: 2, maxPlayers: 2, duration: 10, genre: 'Strategie',
		description:
			'Ein einfaches Strategiespiel für zwei: Ihr werft abwechselnd Spielsteine in ein senkrechtes Gitter und versucht, vier in eine Reihe zu bringen. Die Regeln sind in einer Minute erklärt, aber es braucht Voraussicht.',
		rules:
			'Vorbereitung:\n1. Das senkrechte Gitter mit 7 Spalten und 6 Zeilen aufstellen. Jede Person erhält 21 Steine einer Farbe.\n\nAblauf:\n1. Abwechselnd lässt man einen Stein in eine Spalte fallen. Er rutscht nach unten, bis er auf den Boden oder einen anderen Stein trifft.\n2. Ziel ist es, vier eigene Steine in einer Linie zu haben, waagrecht, senkrecht oder diagonal.\n3. Gleichzeitig muss man verhindern, dass die andere Person eine solche Linie bildet.\n\nSpielende:\nWer zuerst vier in einer Reihe hat, gewinnt. Ist das Gitter voll und niemand hat gewonnen, ist es unentschieden.\n\nTipp:\nDie mittlere Spalte ist wichtig, weil sie an den meisten Linien beteiligt ist.'
	},
	{
		title: 'Memory',
		minPlayers: 2, maxPlayers: 6, duration: 15, genre: 'Familie',
		description:
			'Das Gedächtnisspiel, das auch Kinder mühelos spielen: Zu jedem Bild gibt es ein zweites, und ihr müsst die Paare finden. Wer sich die Positionen am besten merkt, sammelt die meisten Paare.',
		rules:
			'Vorbereitung:\n1. Alle Karten werden gemischt und verdeckt in Reihen ausgelegt.\n\nAblauf:\n1. Wer an der Reihe ist, deckt zwei Karten auf.\n2. Zeigen beide dasselbe Bild, darf man das Paar behalten und gleich noch einmal aufdecken.\n3. Passen sie nicht zusammen, dreht man sie wieder um und die nächste Person ist dran.\n4. Alle merken sich, wo welche Bilder liegen.\n\nSpielende:\nSind alle Paare gefunden, gewinnt die Person mit den meisten Paaren.\n\nTipp:\nDecke zuerst eine unbekannte Karte auf. Passt sie zu einer Karte, die du schon kennst, hast du ein sicheres Paar.'
	},
	{
		title: 'Schiffe versenken',
		minPlayers: 2, maxPlayers: 2, duration: 20, genre: 'Strategie',
		description:
			'Ein Ratespiel für zwei mit versteckten Flotten: Ihr versucht, die Schiffe der anderen Seite zu finden und zu versenken, ohne zu wissen, wo sie liegen. Es braucht Wahrscheinlichkeitsdenken und etwas Glück.',
		rules:
			'Vorbereitung:\n1. Jede Person hat zwei Raster mit 10 mal 10 Feldern: eines für die eigene Flotte, eines zum Notieren der Schüsse.\n2. Die Flotte wird geheim eingezeichnet, üblich sind Schiffe mit 5, 4, 3, 3 und 2 Feldern, waagrecht oder senkrecht und ohne Überschneidungen.\n\nAblauf:\n1. Abwechselnd nennt man ein Feld, zum Beispiel «B7».\n2. Die andere Person antwortet «Wasser», «Treffer» oder «Versenkt».\n3. Das Ergebnis trägt man auf dem eigenen Schussraster ein.\n4. Nach einem Treffer sucht man die Nachbarfelder ab, um das Schiff zu finden.\n\nSpielende:\nWer zuerst alle gegnerischen Schiffe versenkt hat, gewinnt.\n\nTipp:\nSchiesse zu Beginn in einem Schachbrettmuster, so findest du die grossen Schiffe schneller.'
	},
	{
		title: 'Overcooked',
		minPlayers: 1, maxPlayers: 4, duration: 30, genre: 'Videospiel',
		description:
			'Ein Kochspiel für die Konsole, bei dem ihr gemeinsam Bestellungen in einer verrückten Küche erfüllt. Die Küche verändert sich ständig und das Chaos ist vorprogrammiert. Ohne Absprache geht gar nichts.',
		rules:
			'Vorbereitung:\n1. Das Spiel starten und die Controller verbinden. Gemeinsames Spielen am Bildschirm (Couch-Koop) wählen.\n2. Eine Küche (Level) aussuchen und ein Koch- oder Küchenteam bilden.\n\nAblauf:\n1. Oben am Bildschirm erscheinen Bestellungen mit Zutaten und Zeitlimit.\n2. Zutaten werden geholt, geschnitten, in Pfanne oder Topf gekocht und auf Tellern serviert.\n3. Benutztes Geschirr muss gespült werden und kommt zurück in die Küche.\n4. Die Küche kann sich bewegen, brennen oder durch Hindernisse getrennt sein, deshalb sollte man sich absprechen.\n\nSpielende:\nAm Ende des Levels gibt es Punkte für servierte Gerichte und Sterne für das Ergebnis. Alle gewinnen gemeinsam.\n\nTipp:\nVerteilt Aufgaben: eine Person schneidet, eine kocht, eine spült.'
	},
	{
		title: 'Just Dance',
		minPlayers: 1, maxPlayers: 6, duration: 30, genre: 'Videospiel',
		description:
			'Ein Tanzspiel für die Konsole: Ihr ahmt die Bewegungen einer Figur auf dem Bildschirm nach und sammelt Punkte. Es braucht keine Vorkenntnisse und funktioniert in jeder Gruppe, auch bei Unsicheren.',
		rules:
			'Vorbereitung:\n1. Das Spiel starten und die Controller oder Smartphones als Bewegungssensor verbinden.\n2. Einen Song und, wenn gewünscht, einen Modus auswählen.\n\nAblauf:\n1. Die Tänzerinnen und Tänzer auf dem Bildschirm zeigen die Choreografie vor.\n2. Ihr macht die Bewegungen nach und haltet dabei den Controller oder das Smartphone in der Hand.\n3. Je genauer die Bewegungen zum Rhythmus passen, desto mehr Punkte erhaltet ihr.\n4. Nach jedem Song gibt es eine Bewertung mit Sternen.\n\nSpielende:\nNach den gewählten Songs gewinnt die Person mit den meisten Punkten.\n\nTipp:\nAchte vor allem auf Arme und Oberkörper, diese Bewegungen bewertet das Spiel am stärksten.'
	}
];
