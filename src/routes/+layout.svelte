<script>
	// ⚠️ Falls deine alte +layout.svelte eine Bootstrap-Importzeile hatte
	// (z. B. import 'bootstrap/dist/css/bootstrap.min.css';), setze sie hier wieder ein.

	import { page } from '$app/state';

	let { data, children } = $props();
	let menuOpen = $state(false);

	// Schwebende Spiel-Symbole im Hintergrund (feste Werte, damit Server und Browser gleich rendern)
	const floaters = [
		{ e: '🎲', left: '5%', size: '3.2rem', dur: '26s', delay: '-4s' },
		{ e: '♟️', left: '14%', size: '2.6rem', dur: '32s', delay: '-18s' },
		{ e: '🃏', left: '23%', size: '3rem', dur: '28s', delay: '-9s' },
		{ e: '🧩', left: '33%', size: '2.4rem', dur: '35s', delay: '-25s' },
		{ e: '👑', left: '42%', size: '2.8rem', dur: '30s', delay: '-2s' },
		{ e: '🎯', left: '51%', size: '3.4rem', dur: '27s', delay: '-14s' },
		{ e: '🏆', left: '60%', size: '2.6rem', dur: '34s', delay: '-21s' },
		{ e: '🎲', left: '68%', size: '2.2rem', dur: '29s', delay: '-7s' },
		{ e: '🃏', left: '76%', size: '3.1rem', dur: '33s', delay: '-16s' },
		{ e: '♟️', left: '84%', size: '2.9rem', dur: '25s', delay: '-11s' },
		{ e: '🧩', left: '91%', size: '3.3rem', dur: '31s', delay: '-27s' },
		{ e: '🎮', left: '47%', size: '2.3rem', dur: '38s', delay: '-31s' }
	];

	const path = $derived(page.url.pathname);
	const searchActive = $derived(path === '/' || path.startsWith('/spiel'));
</script>

<div class="gn-floaters" aria-hidden="true">
	{#each floaters as f}
		<span
			class="gn-floater"
			style="left:{f.left}; font-size:{f.size}; animation-duration:{f.dur}; animation-delay:{f.delay};"
		>
			<span class="gn-sway">{f.e}</span>
		</span>
	{/each}
</div>

<nav class="navbar navbar-expand-lg navbar-dark sticky-top gn-nav">
	<div class="container">
		<a class="navbar-brand fw-bold" href="/" onclick={() => (menuOpen = false)}>
			<span class="gn-logo">🎲</span> GameNight
		</a>

		<button
			class="navbar-toggler"
			type="button"
			aria-label="Menü öffnen"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" class:show={menuOpen}>
			<ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
				<li class="nav-item">
					<a
						class="nav-link"
						class:active={searchActive}
						href="/"
						onclick={() => (menuOpen = false)}>🔎 Spielsuche</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						class:active={path.startsWith('/historie')}
						href="/historie"
						onclick={() => (menuOpen = false)}>🏆 Historie &amp; Gewinner</a
					>
				</li>
			</ul>

			<div class="d-flex align-items-center gap-2 flex-wrap">
				{#if data.user}
					<span class="gn-pill">
						👤 {data.user.username}
						<span class="badge ms-1 {data.user.role === 'admin' ? 'text-bg-warning' : 'text-bg-info'}">
							{data.user.role === 'admin' ? 'Admin' : 'Mitglied'}
						</span>
					</span>
					<form method="POST" action="/logout">
						<button class="btn btn-outline-light btn-sm" type="submit">Abmelden</button>
					</form>
				{:else}
					<span class="gn-pill text-white-50">Gast-Ansicht</span>
					<a class="btn btn-outline-light btn-sm" href="/login" onclick={() => (menuOpen = false)}
						>Anmelden</a
					>
					<a class="btn btn-warning btn-sm" href="/register" onclick={() => (menuOpen = false)}
						>Registrieren</a
					>
				{/if}
			</div>
		</div>
	</div>
</nav>

<main class="container py-4 gn-main">
	{@render children()}
</main>

<footer class="text-center small text-white-50 pb-4 gn-main">
	🎲 GameNight-Generator · Prototyp
</footer>

<style>
	:global(body) {
	--bs-body-color: #f3f1ff;
	--bs-body-color-rgb: 243, 241, 255;
	--bs-heading-color: #ffffff;
	--bs-secondary-color: rgba(243, 241, 255, 0.75);
	--bs-border-color: rgba(255, 255, 255, 0.2);
	min-height: 100vh;
	color: #f3f1ff !important;
	background: linear-gradient(135deg, #14112e, #2b1055, #1d2b64, #14112e);
	background-size: 300% 300%;
	background-attachment: fixed;
	animation: gn-shift 28s ease infinite;
	}
	:global(a) {
		color: #ffc857;
	}
	:global(a:hover) {
		color: #ffe08a;
	}

	/* Glas-Karten */
	:global(.glass) {
		color: #f3f1ff;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 1.1rem;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
	}

	/* Formularfelder auf dunklem Grund lesbar machen */
	:global(.glass .form-control),
	:global(.glass .form-select) {
		background-color: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.25);
		color: #fff;
	}
	:global(.glass .form-control::placeholder) {
		color: rgba(255, 255, 255, 0.55);
	}
	:global(.glass .form-control:focus),
	:global(.glass .form-select:focus) {
		background-color: rgba(255, 255, 255, 0.16);
		border-color: #ffc857;
		box-shadow: 0 0 0 0.2rem rgba(255, 200, 87, 0.25);
		color: #fff;
	}
	:global(.glass .form-select option) {
		background: #2b1055;
		color: #fff;
	}
	:global(.glass .form-label) {
		opacity: 0.85;
		font-size: 0.85rem;
	}

	.gn-nav {
		background: rgba(20, 17, 46, 0.78);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
		z-index: 1030;
	}
	.gn-logo {
		display: inline-block;
		animation: gn-roll 6s ease-in-out infinite;
	}
	.gn-pill {
		color: #fff;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.1);
		font-size: 0.85rem;
	}
	.nav-link.active {
		color: #ffc857 !important;
		font-weight: 600;
	}

	.gn-main {
		position: relative;
		z-index: 1;
	}

	/* Bewegter Hintergrund */
	.gn-floaters {
		position: fixed;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}
	.gn-floater {
		position: absolute;
		bottom: -15vh;
		opacity: 0.17;
		animation-name: gn-rise;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		filter: drop-shadow(0 0 12px rgba(255, 200, 87, 0.35));
	}
	.gn-sway {
		display: inline-block;
		animation: gn-sway 6s ease-in-out infinite alternate;
	}

	@keyframes gn-rise {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-135vh);
		}
	}
	@keyframes gn-sway {
		from {
			transform: rotate(-18deg) translateX(-14px);
		}
		to {
			transform: rotate(18deg) translateX(14px);
		}
	}
	@keyframes gn-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
	@keyframes gn-roll {
		0%,
		70%,
		100% {
			transform: rotate(0deg);
		}
		85% {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(body),
		.gn-floater,
		.gn-sway,
		.gn-logo {
			animation: none;
		}
	}
</style>
