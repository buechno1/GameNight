<script>
	import { enhance } from '$app/forms';
	import { emojiFor, hueFor, imageCandidates, nextImage, parseRules, RATINGS } from '#lib/games.js';

	let { data, form } = $props();

	// 1 = Übersicht, 2 = Anleitung & Spiel läuft, 3 = Ergebnis eintragen, 4 = gespeichert
	let step = $state(1);
	let rating = $state('');
	let busy = $state(false);

	const g = $derived(data.game);
	const sections = $derived(parseRules(g.rules));
	const steps = ['Spiel wählen', 'Anleitung & Spiel', 'Ergebnis'];
	const fmt = (iso) =>
		new Date(iso).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
</script>

<svelte:head>
	<title>{g.title} · GameNight</title>
</svelte:head>

<a class="small" href="/">← Zurück zur Spielsuche</a>

<!-- Fortschritt (wie im Flow der Skizze) -->
<ol class="gn-steps my-3">
	{#each steps as label, i}
		<li class:done={step > i + 1 || step === 4} class:current={step === i + 1}>
			<span class="dot">{step > i + 1 || step === 4 ? '✓' : i + 1}</span>
			<span class="lbl">{label}</span>
		</li>
	{/each}
</ol>

<div class="glass overflow-hidden" style="--hue:{hueFor(g.genre || g.title)}">
	<div class="gn-banner">
		<img src={imageCandidates(g)[0]} alt={g.title} onerror={(e) => nextImage(e, g)} />
		<div class="gn-banner-title">
			<span class="gn-emoji">{emojiFor(g.genre)}</span>
			<h1 class="h2 mb-0 ms-2">{g.title}</h1>
		</div>
	</div>

	<div class="p-3 p-md-4">
		{#if step === 1}
			<div class="gn-fade">
				<div class="d-flex flex-wrap gap-2 mb-3">
					<span class="badge gn-badge">👥 {g.minPlayers}–{g.maxPlayers} Spieler</span>
					<span class="badge gn-badge">⏱ {g.duration} Min.</span>
					{#if g.genre}<span class="badge gn-badge">{g.genre}</span>{/if}
				</div>
				<p class="mb-4 gn-text">{g.description || 'Keine Beschreibung vorhanden.'}</p>

				{#if data.rounds.length}
					<h2 class="h6 opacity-75">Letzte Runden</h2>
					<ul class="list-unstyled small mb-4">
						{#each data.rounds as r (r.id)}
							<li class="mb-1">
								{RATINGS[r.rating]?.emoji} 🏆 <strong>{r.winner}</strong> · {fmt(r.createdAt)}
								{#if r.note}<span class="opacity-75">– «{r.note}»</span>{/if}
							</li>
						{/each}
					</ul>
				{/if}

				<h2 class="h5">Spiel starten?</h2>
				<div class="d-flex gap-2">
					<button class="btn btn-warning fw-semibold px-4" type="button" onclick={() => (step = 2)}>Ja</button>
					<a class="btn btn-outline-light px-4" href="/">Nein</a>
				</div>
			</div>
		{:else if step === 2}
			<div class="gn-fade">
				<h2 class="h4">📖 Anleitung</h2>
				{#if sections.length}
					<div class="gn-rules glass p-3 p-md-4 mb-4">
						{#each sections as s}
							<section class="mb-3">
								{#if s.title}<h3 class="h6 text-uppercase gn-sec">{s.title}</h3>{/if}
								{#if s.kind === 'steps'}
									<ol class="gn-ol">
										{#each s.lines as line}<li>{line}</li>{/each}
									</ol>
								{:else if s.kind === 'bullets'}
									<ul class="gn-ul">
										{#each s.lines as line}<li>{line}</li>{/each}
									</ul>
								{:else}
									{#each s.lines as line}<p class="mb-1">{line}</p>{/each}
								{/if}
							</section>
						{/each}
					</div>
				{:else}
					<p class="opacity-75 mb-4">Für dieses Spiel gibt es noch keine Kurz-Anleitung.</p>
				{/if}
				<div class="d-flex gap-2">
					<button class="btn btn-outline-light" type="button" onclick={() => (step = 1)}>← Zurück</button>
					<button class="btn btn-warning fw-semibold" type="button" onclick={() => (step = 3)}>
						🏁 Spiel beenden
					</button>
				</div>
			</div>
		{:else if step === 3}
			<div class="gn-fade">
				<h2 class="h4">Spiel beendet 🎉</h2>

				{#if !data.user}
					<div class="alert alert-info">
						Um Gewinner, Bewertung und Notiz zu speichern, brauchst du ein Konto.
					</div>
					<div class="d-flex gap-2 flex-wrap">
						<a class="btn btn-warning fw-semibold" href="/login?next=/spiel/{g.id}">Anmelden</a>
						<a class="btn btn-outline-light" href="/register">Registrieren</a>
						<button class="btn btn-outline-light" type="button" onclick={() => (step = 2)}>← Zurück</button>
					</div>
				{:else}
					{#if form?.error}
						<div class="alert alert-danger py-2">{form.error}</div>
					{/if}
					<form
						method="POST"
						action="?/finish"
						use:enhance={() => {
							busy = true;
							return async ({ result, update }) => {
								await update({ reset: false });
								busy = false;
								if (result.type === 'success') step = 4;
							};
						}}
					>
						<div class="mb-3">
							<label class="form-label" for="winner">🏆 Wer hat gewonnen?</label>
							<input class="form-control" id="winner" name="winner" list="player-list" placeholder="Name eintragen oder auswählen" required />
							<datalist id="player-list">
								{#each data.players as p}<option value={p}></option>{/each}
							</datalist>
						</div>

						<div class="mb-3">
							<div class="form-label">Wie hat es dir gefallen?</div>
							<div class="d-flex flex-wrap gap-2">
								{#each Object.entries(RATINGS) as [key, r]}
									<input class="btn-check" type="radio" name="rating" id="r-{key}" value={key} bind:group={rating} required />
									<label class="btn btn-outline-{r.cls} gn-rate" for="r-{key}">{r.emoji} {r.label}</label>
								{/each}
							</div>
						</div>

						<div class="mb-3">
							<label class="form-label" for="note">📝 Notiz (hilft uns für kommende Empfehlungen)</label>
							<textarea class="form-control" id="note" name="note" rows="3" maxlength="500" placeholder="Notiz für das Spiel hinzufügen …"></textarea>
						</div>

						<div class="d-flex gap-2">
							<button class="btn btn-outline-light" type="button" onclick={() => (step = 2)}>← Zurück</button>
							<button class="btn btn-warning fw-semibold" type="submit" disabled={busy}>
								{busy ? 'Speichern …' : 'Speichern'}
							</button>
						</div>
					</form>
				{/if}
			</div>
		{:else}
			<div class="gn-fade text-center py-4">
				<div class="display-3 gn-trophy">🏆</div>
				<h2 class="h4 mt-2">Gespeichert!</h2>
				<p class="opacity-75">Das Ergebnis ist jetzt in der Historie sichtbar.</p>
				<div class="d-flex gap-2 justify-content-center flex-wrap">
					<a class="btn btn-warning fw-semibold" href="/historie">Zur Historie</a>
					<a class="btn btn-outline-light" href="/">Nächstes Spiel suchen</a>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.gn-banner {
		position: relative;
		height: 200px;
		overflow: hidden;
		background: linear-gradient(135deg, hsl(var(--hue) 75% 42%), hsl(calc(var(--hue) + 40) 70% 28%));
	}
	.gn-banner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.gn-banner-title {
		position: absolute;
		inset: auto 0 0 0;
		display: flex;
		align-items: center;
		padding: 2.5rem 1.5rem 1rem;
		background: linear-gradient(to top, rgba(10, 8, 30, 0.85), transparent);
	}
	.gn-emoji {
		font-size: 2rem;
		line-height: 1;
	}
	.gn-text {
		line-height: 1.7;
		white-space: pre-line;
	}
	.gn-badge {
		background: rgba(255, 255, 255, 0.14);
		font-weight: 500;
	}
	.gn-rules {
		line-height: 1.7;
	}
	.gn-sec {
		color: #ffc857;
		letter-spacing: 0.06em;
	}
	.gn-ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.gn-ul li {
		position: relative;
		padding-left: 1.4rem;
		margin-bottom: 0.4rem;
	}
	.gn-ul li::before {
		content: '•';
		position: absolute;
		left: 0.25rem;
		color: #ffc857;
		font-weight: 700;
	}
	.gn-ol {
		list-style: none;
		counter-reset: step;
		padding: 0;
		margin: 0;
	}
	.gn-ol li {
		counter-increment: step;
		position: relative;
		padding-left: 2.3rem;
		margin-bottom: 0.6rem;
	}
	.gn-ol li::before {
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0.1rem;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-size: 0.8rem;
		font-weight: 700;
		background: #ffc857;
		color: #2b1055;
	}
	.gn-rate {
		min-width: 7.5rem;
		transition: transform 0.15s ease;
	}
	.gn-rate:hover {
		transform: scale(1.06);
	}

	/* Fortschrittsanzeige */
	.gn-steps {
		list-style: none;
		display: flex;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
	}
	.gn-steps li {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		opacity: 0.55;
	}
	.gn-steps li.current,
	.gn-steps li.done {
		opacity: 1;
	}
	.dot {
		display: grid;
		place-items: center;
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.15);
		font-weight: 700;
		flex-shrink: 0;
	}
	.current .dot {
		background: #ffc857;
		color: #2b1055;
	}
	.done .dot {
		background: #3ddc97;
		color: #0b3b27;
	}
	@media (max-width: 575px) {
		.lbl {
			display: none;
		}
	}

	.gn-fade {
		animation: fade 0.3s ease;
	}
	.gn-trophy {
		animation: bounce 1s ease infinite;
	}
	@keyframes fade {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}
	@keyframes bounce {
		50% {
			transform: translateY(-10px) scale(1.08);
		}
	}
</style>
