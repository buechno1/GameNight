<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let showPw = $state(false);
	let busy = $state(false);
</script>

<svelte:head>
	<title>Anmelden · GameNight</title>
</svelte:head>

<div class="row justify-content-center">
	<div class="col-12 col-md-7 col-lg-5">
		<div class="glass p-4 p-md-5 mt-3">
			<div class="text-center mb-4">
				<div class="gn-big">🔑</div>
				<h1 class="h3 mt-2">Willkommen zurück</h1>
				<p class="opacity-75 mb-0">Melde dich an, um Ergebnisse und Notizen zu speichern.</p>
			</div>

			{#if data.needLogin}
				<div class="alert alert-info py-2">Bitte melde dich an, um diese Seite zu sehen.</div>
			{/if}
			{#if form?.error}
				<div class="alert alert-danger py-2" role="alert">{form.error}</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					busy = true;
					return async ({ update }) => {
						await update({ reset: false });
						busy = false;
					};
				}}
			>
				<div class="mb-3">
					<label class="form-label" for="username">Benutzername</label>
					<input
						class="form-control"
						id="username"
						name="username"
						autocomplete="username"
						value={form?.username ?? ''}
						required
					/>
				</div>
				<div class="mb-3">
					<label class="form-label" for="password">Passwort</label>
					<input
						class="form-control"
						id="password"
						name="password"
						type={showPw ? 'text' : 'password'}
						autocomplete="current-password"
						required
					/>
					<div class="form-check mt-2">
						<input class="form-check-input" type="checkbox" id="showpw" bind:checked={showPw} />
						<label class="form-check-label small" for="showpw">Passwort anzeigen</label>
					</div>
				</div>
				<button class="btn btn-warning w-100 fw-semibold" type="submit" disabled={busy}>
					{busy ? 'Anmelden …' : 'Anmelden'}
				</button>
			</form>

			<p class="text-center small mt-4 mb-0">
				Noch kein Konto? <a href="/register">Jetzt registrieren</a>
			</p>
		</div>
	</div>
</div>

<style>
	.gn-big {
		font-size: 3rem;
		display: inline-block;
		animation: bob 3s ease-in-out infinite;
	}
	@keyframes bob {
		50% {
			transform: translateY(-8px) rotate(-8deg);
		}
	}
</style>
