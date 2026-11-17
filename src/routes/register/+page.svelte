<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
	let password = $state('');
	let confirm = $state('');
	let showPw = $state(false);
	let busy = $state(false);

	// Einfache Passwort-Stärke für direktes Feedback
	const strength = $derived.by(() => {
		let s = 0;
		if (password.length >= 6) s++;
		if (password.length >= 10) s++;
		if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s++;
		if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) s++;
		return s;
	});
	const labels = ['Zu kurz', 'Schwach', 'Okay', 'Gut', 'Stark'];
	const colors = ['danger', 'danger', 'warning', 'info', 'success'];
	const mismatch = $derived(confirm.length > 0 && confirm !== password);
</script>

<svelte:head>
	<title>Registrieren · GameNight</title>
</svelte:head>

<div class="row justify-content-center">
	<div class="col-12 col-md-7 col-lg-5">
		<div class="glass p-4 p-md-5 mt-3">
			<div class="text-center mb-4">
				<div class="gn-big">🎟️</div>
				<h1 class="h3 mt-2">Konto erstellen</h1>
				<p class="opacity-75 mb-0">Dann kannst du Gewinner, Bewertungen und Notizen festhalten.</p>
			</div>

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
						minlength="3"
						maxlength="20"
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
						autocomplete="new-password"
						minlength="6"
						bind:value={password}
						required
					/>
					{#if password}
						<div class="progress mt-2" style="height:6px">
							<div
								class="progress-bar bg-{colors[strength]}"
								style="width:{(strength / 4) * 100}%"
							></div>
						</div>
						<div class="small opacity-75 mt-1">Stärke: {labels[strength]}</div>
					{/if}
				</div>
				<div class="mb-3">
					<label class="form-label" for="confirm">Passwort wiederholen</label>
					<input
						class="form-control"
						class:is-invalid={mismatch}
						id="confirm"
						name="confirm"
						type={showPw ? 'text' : 'password'}
						autocomplete="new-password"
						bind:value={confirm}
						required
					/>
					{#if mismatch}<div class="invalid-feedback d-block">Die Passwörter stimmen nicht überein.</div>{/if}
					<div class="form-check mt-2">
						<input class="form-check-input" type="checkbox" id="showpw" bind:checked={showPw} />
						<label class="form-check-label small" for="showpw">Passwörter anzeigen</label>
					</div>
				</div>
				<button class="btn btn-warning w-100 fw-semibold" type="submit" disabled={busy || mismatch}>
					{busy ? 'Konto wird erstellt …' : 'Registrieren'}
				</button>
			</form>

			<p class="text-center small mt-4 mb-0">
				Schon ein Konto? <a href="/login">Zur Anmeldung</a>
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
			transform: translateY(-8px) rotate(8deg);
		}
	}
</style>
