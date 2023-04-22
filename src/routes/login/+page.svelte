<script lang="ts">
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores';
	export let form;
	export let data;
	$: clearUser = data?.clearUser;
	$: {
		if (clearUser) user.set(undefined);
	}
</script>

<h2 class="text-center text-lg font-bold text-primary-500">Signin Page</h2>

<form use:enhance method="post" action="?/login" class="max-w-[700px] mx-auto mt-20">
	<div class="form-item">
		<label for="email">Email<sup><small class="required">*</small></sup></label>
		<input
			value={form?.email ?? ''}
			id="email"
			type="email"
			name="email"
			required
			class="text-black"
		/>
	</div>
	<div class="form-item">
		<label for="password">Password<sup><small class="required">*</small></sup></label>
		<input id="password" type="password" name="password" required class="text-black" />
	</div>

	<div class="form-item">
		{#if form?.error}
			<small>{form?.message}</small>
		{/if}
	</div>

	<div class="form-item">
		<button
			type="submit"
			class="btn btn-primary w-full duration-150 ease-in font-bold bg-primary hover:text-primary hover:bg-white"
			>Login</button
		>
	</div>

	<div class="form-item">
		<a class="reset-link" href="/forgotPassword"><small>Forgot Password?</small></a>
	</div>
</form>

<style>
	div {
		color: #fff;
		margin-bottom: 0.5em;
	}
	label {
		padding-right: 0.5em;
	}

	.form-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.required {
		padding-left: 0.5em;
		color: #ff0000;
	}
	.reset-link {
		color: #ffffff;
		text-decoration: none;
	}
	.reset-link:hover {
		text-decoration: underline;
	}
</style>
