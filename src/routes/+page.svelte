<script>
	import { enhance } from '$app/forms';
	import { emojiFor, hueFor, ratingFromAvg } from '#lib/games.js';

	let { data, form } = $props();

	const isAdmin = $derived(data.user?.role === 'admin');

	// Filter
	let q = $state('');
	let players = $state(null);
	let maxDuration = $state(null);
	let genre = $state('');

	// Admin-Bereich
	let showAdd = $state(false);
	let editId = $state(null);

	// Zufalls-Generator
	let spinning = $state(false);
	let pick = $state(null);
	let showPick = $state(false);

	const has = (v) => v !== null && v !== undefined && v !== '';

	const genres = $derived([...new Set(data.games.map((g) => g.genre).filter(Boolean))].sort());

	const filtered = $derived(
		data.games.filter((g) => {
			const text = `${g.title} ${g.genre} ${g.description}`.toLowerCase();
			if (q.trim() && !text.includes(q.trim().toLowerCase())) return false;
			if (has(players) && (Number(players) < g.minPlayers || Number(players) > g.maxPlayers))
				return false;
			if (has(maxDuration) && g.duration > Number(maxDuration)) return false;
			if (genre && g.genre !== genre) return false;
			return true;
		})
	);

	const anyFilter = $derived(Boolean(q.trim() || has(players) || has(maxDuration) || genre));

	function resetFilters() {
		q = '';
		players = null;
		maxDuration = null;
		genre = '';
	}

	function randomPick() {
		if (!filtered.length || spinning) return;
		const list = filtered;
		const draw = () => list[Math.floor(Math.random() * list.length)];
		spinning = true;
		showPick = true;
		const timer = setInterval(() => (pick = draw()), 90);
		setTimeout(() => {
			clearInterval(timer);
			pick = draw();
			spinning = false;
		}, 1400);
	}

	// Nach erfolgreichem Speichern die Formulare wieder schliessen
	const afterSave = () => async ({ result, update }) => {
		await update();
		if (result.type === 'success') {
			showAdd = false;
			editId = null;
		}
	};
</script>

<svelte:head>
	<title>Spielsuche · GameNight</title>
</svelte:head>

{#snippet gameFields(g)}
	<div class="row g-2">
		<div class="col-12">
			<label class="form-label" for="title-{g?.id ?? 'new'}">Titel</label>
			<input class="form-control" id="title-{g?.id ?? 'new'}" name="title" value={g?.title ?? ''} required />
		</div>
		<div class="col-4">
			<label class="form-label" for="min-{g?.id ?? 'new'}">Min. Spieler</label>
			<input class="form-control" id="min-{g?.id ?? 'new'}" name="minPlayers" type="number" min="1" value={g?.minPlayers ?? ''} required />
		</div>
		<div class="col-4">
			<label class="form-label" for="max-{g?.id ?? 'new'}">Max. Spieler</label>
			<input class="form-control" id="max-{g?.id ?? 'new'}" name="maxPlayers" type="number" min="1" value={g?.maxPlayers ?? ''} required />
		</div>
		<div class="col-4">
			<label class="form-label" for="dur-{g?.id ?? 'new'}">Dauer (Min.)</label>
			<input class="form-control" id="dur-{g?.id ?? 'new'}" name="duration" type="number" min="1" value={g?.duration ?? ''} required />
		</div>
		<div class="col-12">
			<label class="form-label" for="genre-{g?.id ?? 'new'}">Genre</label>
			<input class="form-control" id="genre-{g?.id ?? 'new'}" name="genre" list="genre-list" placeholder="z. B. Strategie, Party, Karten" value={g?.genre ?? ''} />
		</div>
		<div class="col-12">
			<label class="form-label" for="desc-{g?.id ?? 'new'}">Beschreibung</label>
			<textarea class="form-control" id="desc-{g?.id ?? 'new'}" name="description" rows="2" placeholder="Worum geht es in ein bis zwei Sätzen?">{g?.description ?? ''}</textarea>
		</div>
		<div class="col-12">
			<label class="form-label" for="rules-{g?.id ?? 'new'}">Kurz-Anleitung</label>
			<textarea class="form-control" id="rules-{g?.id ?? 'new'}" name="rules" rows="4" placeholder={'Vorbereitung:\n1. ...\n\nAblauf:\n...'}>{g?.rules ?? ''}</textarea>
		</div>
	</div>
{/snippet}

<datalist id="genre-list">
	{#each genres as g}<option value={g}></option>{/each}
</datalist>

<!-- Kopfbereich -->
<section class="text-center py-4">
	<h1 class="display-5 fw-bold gn-title">Was spielen wir heute?</h1>
	<p class="lead opacity-75 mb-0">
		Filtere nach Spieleranzahl, Dauer und Genre – oder lass den Zufall entscheiden.
	</p>
</section>

<!-- Filter -->
<section class="glass p-3 p-md-4 mb-4">
	<div class="row g-3 align-items-end">
		<div class="col-12 col-lg-3">
			<label class="form-label" for="q">🔎 Stichwort</label>
			<input class="form-control" id="q" placeholder="Titel, Genre …" bind:value={q} />
		</div>
		<div class="col-6 col-lg-2">
			<label class="form-label" for="players">👥 Spieler</label>
			<input class="form-control" id="players" type="number" min="1" placeholder="Anzahl" bind:value={players} />
		</div>
		<div class="col-6 col-lg-2">
			<label class="form-label" for="dur">⏱ Max. Minuten</label>
			<input class="form-control" id="dur" type="number" min="1" placeholder="z. B. 40" bind:value={maxDuration} />
		</div>
		<div class="col-12 col-lg-2">
			<label class="form-label" for="genre">🎭 Genre</label>
			<select class="form-select" id="genre" bind:value={genre}>
				<option value="">Alle Genres</option>
				{#each genres as g}<option value={g}>{g}</option>{/each}
			</select>
		</div>
		<div class="col-12 col-lg-3 d-flex gap-2">
			<button class="btn btn-warning flex-grow-1 fw-semibold" type="button" onclick={randomPick} disabled={!filtered.length || spinning}>
				🎲 Zufalls-Generator
			</button>
			{#if anyFilter}
				<button class="btn btn-outline-light" type="button" onclick={resetFilters} title="Filter zurücksetzen">✕</button>
			{/if}
		</div>
	</div>
	<div class="small opacity-75 mt-3">
		{filtered.length} von {data.games.length} Spielen
		{#if !data.user}· <a href="/login">Melde dich an</a>, um Ergebnisse und Notizen zu speichern.{/if}
	</div>
</section>

<!-- Zufalls-Ergebnis -->
{#if showPick && pick}
	<section class="glass p-4 mb-4 text-center gn-pick" class:spinning>
		<div class="small text-uppercase opacity-75 mb-1">
			{spinning ? 'Der Zufalls-Generator würfelt …' : 'Der Zufalls-Generator schlägt vor:'}
		</div>
		<div class="gn-pick-emoji">{emojiFor(pick.genre)}</div>
		<h2 class="h2 mb-2">{pick.title}</h2>
		{#if !spinning}
			<div class="mb-3 opacity-75">
				👥 {pick.minPlayers}–{pick.maxPlayers} Spieler · ⏱ {pick.duration} Min.
				{#if pick.genre}· {pick.genre}{/if}
			</div>
			<div class="d-flex justify-content-center gap-2 flex-wrap">
				<a class="btn btn-warning fw-semibold" href="/spiel/{pick.id}">Spiel öffnen →</a>
				<button class="btn btn-outline-light" type="button" onclick={randomPick}>🎲 Nochmal</button>
				<button class="btn btn-outline-light" type="button" onclick={() => (showPick = false)}>Schliessen</button>
			</div>
		{/if}
	</section>
{/if}

<!-- Admin: Spiel hinzufügen -->
{#if isAdmin}
	<section class="mb-4">
		<button class="btn btn-outline-warning" type="button" onclick={() => (showAdd = !showAdd)}>
			{showAdd ? '✕ Abbrechen' : '＋ Spiel hinzufügen'}
		</button>
		{#if showAdd}
			<form class="glass p-3 p-md-4 mt-3 gn-pop" method="POST" action="?/add" use:enhance={afterSave}>
				<h2 class="h5 mb-3">Neues Spiel</h2>
				{@render gameFields(null)}
				<button class="btn btn-warning mt-3 fw-semibold" type="submit">Speichern</button>
			</form>
		{/if}
	</section>
{/if}

{#if form?.error}
	<div class="alert alert-danger" role="alert">{form.error}</div>
{/if}

<!-- Spiele -->
{#if filtered.length === 0}
	<div class="glass p-5 text-center">
		<div class="display-4">🫥</div>
		<p class="mb-3 mt-2">Kein Spiel passt zu diesen Filtern.</p>
		{#if anyFilter}
			<button class="btn btn-outline-light" type="button" onclick={resetFilters}>Filter zurücksetzen</button>
		{/if}
	</div>
{:else}
	<div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
		{#each filtered as g (g.id)}
			{@const rating = ratingFromAvg(g.avg)}
			<div class="col">
				<article class="glass gn-card h-100 overflow-hidden d-flex flex-column" style="--hue:{hueFor(g.genre || g.title)}">
					<div class="gn-banner"><span class="gn-emoji">{emojiFor(g.genre)}</span></div>

					{#if editId === g.id}
						<form class="p-3" method="POST" action="?/update" use:enhance={afterSave}>
							<input type="hidden" name="id" value={g.id} />
							{@render gameFields(g)}
							<div class="d-flex gap-2 mt-3">
								<button class="btn btn-warning btn-sm fw-semibold" type="submit">Speichern</button>
								<button class="btn btn-outline-light btn-sm" type="button" onclick={() => (editId = null)}>Abbrechen</button>
							</div>
						</form>
					{:else}
						<div class="p-3 d-flex flex-column gap-2 flex-grow-1">
							<h2 class="h5 mb-0">{g.title}</h2>
							<div class="d-flex flex-wrap gap-2">
								<span class="badge gn-badge">👥 {g.minPlayers}–{g.maxPlayers}</span>
								<span class="badge gn-badge">⏱ {g.duration} Min.</span>
								{#if g.genre}<span class="badge gn-badge gn-genre">{g.genre}</span>{/if}
							</div>
							{#if g.description}
								<p class="small opacity-75 mb-0 gn-clamp">{g.description}</p>
							{/if}
							<div class="small mt-auto pt-2 opacity-75">
								{#if g.played}
									{rating?.emoji} {rating?.label} · {g.played}× gespielt
								{:else}
									Noch nicht gespielt
								{/if}
							</div>
							<div class="d-flex flex-wrap gap-2 pt-1">
								<a class="btn btn-warning btn-sm fw-semibold" href="/spiel/{g.id}">Spiel öffnen</a>
								{#if isAdmin}
									<button class="btn btn-outline-light btn-sm" type="button" onclick={() => (editId = g.id)}>✏️ Bearbeiten</button>
									<form
										method="POST"
										action="?/delete"
										use:enhance={({ cancel }) => {
											if (!confirm(`«${g.title}» wirklich löschen?`)) cancel();
										}}
									>
										<input type="hidden" name="id" value={g.id} />
										<button class="btn btn-outline-danger btn-sm" type="submit">🗑 Löschen</button>
									</form>
								{/if}
							</div>
						</div>
					{/if}
				</article>
			</div>
		{/each}
	</div>
{/if}

<style>
	.gn-title {
		background: linear-gradient(90deg, #ffc857, #ff7eb6, #7ee8fa, #ffc857);
		background-size: 300% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: gn-text 8s linear infinite;
	}
	@keyframes gn-text {
		to {
			background-position: 300% 0;
		}
	}

	.gn-card {
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.gn-card:hover {
		transform: translateY(-6px) rotate(-0.4deg);
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
	}
	.gn-banner {
		height: 84px;
		display: grid;
		place-items: center;
		background: linear-gradient(135deg, hsl(var(--hue) 75% 42%), hsl(calc(var(--hue) + 40) 70% 28%));
	}
	.gn-emoji {
		font-size: 2.6rem;
		transition: transform 0.3s ease;
	}
	.gn-card:hover .gn-emoji {
		transform: scale(1.25) rotate(12deg);
	}
	.gn-badge {
		background: rgba(255, 255, 255, 0.14);
		font-weight: 500;
	}
	.gn-genre {
		background: hsl(var(--hue) 70% 38%);
	}
	.gn-clamp {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.gn-pick-emoji {
		font-size: 4rem;
	}
	.spinning .gn-pick-emoji {
		animation: gn-spin 0.35s linear infinite;
	}
	.gn-pick {
		animation: gn-pop 0.35s ease;
	}
	.gn-pop {
		animation: gn-pop 0.3s ease;
	}
	@keyframes gn-spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes gn-pop {
		from {
			opacity: 0;
			transform: scale(0.96) translateY(8px);
		}
	}
</style>
