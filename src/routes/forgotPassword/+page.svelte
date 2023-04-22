<script lang="ts">
	export let form;
	console.log(form);
</script>

<h2 class="text-center text-lg font-bold text-primary-500">Forgot Password</h2>

<div class="login-wrapper max-w-[700px] mx-auto mt-20">
	<form method="post" action="?/sendReset">
		<div class="form-item">
			<label for="email">Email<sup><small class="required">*</small></sup></label>
			<input id="email" type="email" name="email" required />
		</div>

		<div class="form-item">
			<button
				type="submit"
				class="btn btn-primary w-full duration-150 ease-in font-bold bg-primary hover:text-primary hover:bg-white"
				>Send Email</button
			>
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

	.form-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.login-wrapper {
		height: 100vh;
	}
</style>
