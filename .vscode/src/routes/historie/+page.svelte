<script>
	import { enhance } from '$app/forms';
	import { RATINGS } from '#lib/games.js';

	let { data, form } = $props();

	const isAdmin = $derived(data.user?.role === 'admin');
	let filter = $state('');

	const shown = $derived(
		data.rounds.filter((r) =>
			`${r.gameTitle} ${r.winner} ${r.note}`.toLowerCase().includes(filter.trim().toLowerCase())
		)
	);
	const maxWins = $derived(data.leaderboard[0]?.wins ?? 1);
	const maxPlayed = $derived(data.topGames[0]?.count ?? 1);
	const medals = ['🥇', '🥈', '🥉'];

	const fmt = (iso) =>
		new Date(iso).toLocaleString('de-CH', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
</script>

<svelte:head>
	<title>Historie &amp; Gewinner · GameNight</title>
</svelte:head>

<section class="text-center py-3">
	<h1 class="display-6 fw-bold">🏆 Historie &amp; Gewinner</h1>
	<p class="opacity-75 mb-0">Wer gewinnt am häufigsten – und was kommt am liebsten auf den Tisch?</p>
</section>

{#if form?.error}
	<div class="alert alert-danger">{form.error}</div>
{/if}

{#if data.rounds.length === 0}
	<div class="glass p-5 text-center">
		<div class="display-4">🎲</div>
		<p class="mt-2">Noch keine Runden gespeichert. Spiele eine Runde und trage das Ergebnis ein!</p>
		<a class="btn btn-warning fw-semibold" href="/">Spiel suchen</a>
	</div>
{:else}
	<div class="row g-4">
		<!-- Statistiken -->
		<div class="col-12 col-lg-4">
			<div class="glass p-3 p-md-4 mb-4">
				<h2 class="h5 mb-3">Rangliste</h2>
				{#each data.leaderboard as p, i (p.name)}
					<div class="mb-3">
						<div class="d-flex justify-content-between">
							<span>{medals[i] ?? `${i + 1}.`} {p.name}</span>
							<strong>{p.wins} {p.wins === 1 ? 'Sieg' : 'Siege'}</strong>
						</div>
						<div class="gn-bar"><div style="width:{(p.wins / maxWins) * 100}%"></div></div>
					</div>
				{/each}
			</div>

			<div class="glass p-3 p-md-4">
				<h2 class="h5 mb-3">Meistgespielt</h2>
				{#each data.topGames as t (t.title)}
					<div class="mb-3">
						<div class="d-flex justify-content-between">
							<span>🎲 {t.title}</span>
							<strong>{t.count}×</strong>
						</div>
						<div class="gn-bar alt"><div style="width:{(t.count / maxPlayed) * 100}%"></div></div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Verlauf -->
		<div class="col-12 col-lg-8">
			<input class="form-control gn-search mb-3" placeholder="🔎 Verlauf durchsuchen (Spiel, Gewinner, Notiz)" bind:value={filter} />

			{#if shown.length === 0}
				<p class="opacity-75">Keine Einträge gefunden.</p>
			{/if}

			<div class="gn-timeline">
				{#each shown as r (r.id)}
					{@const rate = RATINGS[r.rating]}
					<article class="glass p-3 mb-3 gn-entry">
						<div class="d-flex justify-content-between align-items-start gap-2">
							<div>
								<h3 class="h6 mb-1"><a href="/spiel/{r.gameId}">{r.gameTitle}</a></h3>
								<div>🏆 <strong>{r.winner}</strong></div>
							</div>
							<span class="badge text-bg-{rate?.cls ?? 'secondary'}">{rate?.emoji} {rate?.label}</span>
						</div>
						{#if r.note}
							<blockquote class="small opacity-75 fst-italic mt-2 mb-0">«{r.note}»</blockquote>
						{/if}
						<div class="d-flex justify-content-between align-items-center small opacity-75 mt-2">
							<span>{fmt(r.createdAt)} · eingetragen von {r.username}</span>
							{#if isAdmin}
								<form
									method="POST"
									action="?/deleteRound"
									use:enhance={({ cancel }) => {
										if (!confirm('Diesen Eintrag löschen?')) cancel();
									}}
								>
									<input type="hidden" name="id" value={r.id} />
									<button class="btn btn-outline-danger btn-sm py-0" type="submit">🗑</button>
								</form>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.gn-search {
		background-color: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.28);
		border-radius: 0.8rem;
		color: #fff;
		padding: 0.7rem 1rem;
	}
	.gn-search::placeholder {
		color: rgba(255, 255, 255, 0.65);
	}
	.gn-search:focus {
		background-color: rgba(255, 255, 255, 0.18);
		border-color: #ffc857;
		box-shadow: 0 0 0 0.2rem rgba(255, 200, 87, 0.25);
		color: #fff;
	}
	.gn-bar {
		height: 8px;
		border-radius: 99px;
		background: rgba(255, 255, 255, 0.12);
		overflow: hidden;
		margin-top: 4px;
	}
	.gn-bar div {
		height: 100%;
		border-radius: 99px;
		background: linear-gradient(90deg, #ffc857, #ff7eb6);
		transition: width 0.8s ease;
	}
	.gn-bar.alt div {
		background: linear-gradient(90deg, #7ee8fa, #80ff72);
	}
	.gn-entry {
		animation: slide 0.35s ease both;
	}
	@keyframes slide {
		from {
			opacity: 0;
			transform: translateX(16px);
		}
	}
</style>
