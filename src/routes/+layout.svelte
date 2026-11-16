<script>
	let { data, children } = $props();
</script>

<header class="topbar">
	<div class="user-status">
		{#if data.user}
			<span>
				Angemeldet als <strong>{data.user.username}</strong>
				<span class="badge {data.user.role}">
					({data.user.role === 'admin' ? 'Admin' : 'Mitglied'})
				</span>
			</span>
		{:else}
			<span>Nicht angemeldet (Gast-Ansicht)</span>
		{/if}
	</div>

	<nav class="nav-links">
		<a href="/">🎲 Spielsuche</a>
		<a href="/historie">🏆 Historie & Gewinner</a>

		{#if data.user?.role === 'admin'}
			<a href="/admin" class="btn-admin">+ Spiel hinzufügen</a>
		{/if}

		{#if data.user}
			<form method="POST" action="/login?/logout" style="display:inline;">
				<button type="submit" class="btn-link">Abmelden</button>
			</form>
		{:else}
			<a href="/login" class="btn-login">Anmelden</a>
		{/if}
	</nav>
</header>

<main class="container">
	{@render children()}
</main>

<style>
	:global(body) {
		font-family: system-ui, -apple-system, sans-serif;
		background: #f4f6f8;
		color: #1e293b;
		margin: 0;
		font-size: 1.05rem; /* Grosse, klare Schrift für alle Personas inkl. Helga */
	}
	.topbar {
		background: #1e293b;
		color: white;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.badge.admin {
		background: #f59e0b;
		color: #000;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: bold;
	}
	.badge.member {
		background: #3b82f6;
		color: white;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		font-size: 0.85rem;
	}
	.nav-links {
		display: flex;
		align-items: center;
		gap: 1.2rem;
	}
	.nav-links a, .btn-link {
		color: white;
		text-decoration: none;
		background: none;
		border: none;
		font-size: 1rem;
		cursor: pointer;
	}
	.btn-admin {
		background: #10b981;
		padding: 0.4rem 0.8rem;
		border-radius: 6px;
		font-weight: 600;
	}
	.btn-login {
		background: #3b82f6;
		padding: 0.4rem 0.8rem;
		border-radius: 6px;
	}
	.container {
		max-width: 960px;
		margin: 2rem auto;
		padding: 0 1rem;
	}
</style>