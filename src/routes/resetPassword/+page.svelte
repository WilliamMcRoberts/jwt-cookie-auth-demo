<script lang="ts">
	export let data;
	export let form;
	$: email = data?.email;
</script>

<div class="login-wrapper">
	<h2 class="text-center text-lg font-bold text-primary-500">Reset Your Password</h2>

	<form method="post" action="?/resetPassword">
		<div class="form-item">
			<label for="password">Password<sup><small class="required">*</small></sup></label>
			<input id="password" type="password" name="password" required />
		</div>

		<div class="form-item">
			<label for="confirmPassword"
				>Confirm Password<sup><small class="required">*</small></sup></label
			>
			<input id="confirmPassword" type="password" name="confirmPassword" required />
		</div>

		<input type="hidden" bind:value={email} name="email" id="email" />

		<div class="form-item">
			<button type="submit" class="btn btn-primary">Reset</button>
		</div>
		<div class="form-item">
			{#if form}
				<small class:error={form?.error} class:success={!form?.error}>{form?.message}</small>
			{/if}
		</div>
	</form>
</div>

<style>
	div {
		color: #fff;
		margin-bottom: 0.5em;
	}
	label {
		padding-right: 0.5em;
	}
	.error {
		padding-left: 0.5em;
		color: #ff0000;
	}
	.success {
		padding-left: 0.5em;
		color: #00ff44;
	}
	.required {
		padding-left: 0.5em;
		color: #ff0000;
	}
	button {
		width: 100%;
		background-color: #fff;
		transition: all 0.3s ease-in;
	}
	button:hover {
		cursor: pointer;
		text-decoration: underline;
		color: #fff;
		background-color: #4d4c4c;
		transition: all 0.3s ease-in;
	}
	.form-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.login-wrapper {
		height: 100vh;
	}
</style>
