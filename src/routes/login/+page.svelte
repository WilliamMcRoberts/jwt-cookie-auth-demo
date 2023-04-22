<script lang="ts">
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { user } from '$lib/stores';
	import {} from 'os';
	import { onMount } from 'svelte';

	export let form;
	export let data;

	$: clearUser = data?.clearUser;
	$: {
		if (clearUser) user.set(undefined);
	}
</script>

<h2 class="text-center text-lg font-bold text-primary-500">Signin Page</h2>

<form
	method="post"
	action="?/login"
	class="max-w-[700px] mx-auto mt-20"
	use:enhance={async ({ form, data, action, cancel, submitter }) => {
		console.log('form', form);
		const { email, password } = Object.fromEntries(data);

		if (typeof email !== 'string' || typeof password !== 'string') {
			cancel();
		}

		console.log('data', Object.fromEntries(data));
		console.log('action', action);
		console.log('cancel', cancel);
		console.log('submitter', submitter);

		// check form data
		// do stuff
		return async ({ result, update }) => {
			console.log('result', result);
			console.log('update', update);
			if (result.type === 'redirect') {
			}
			await update();

			// await update();
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
		};
	}}
>
	<div class=" flex flex-row justify-between mb-4">
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
	<div class=" flex flex-row justify-between mb-4">
		<label for="password">Password<sup><small class="required">*</small></sup></label>
		<input id="password" type="password" name="password" required class="text-black" />
	</div>

	<div class=" flex flex-row justify-between mb-4">
		{#if form?.error}
			<small>{form?.message}</small>
		{/if}
	</div>

	<div class=" flex flex-row justify-between mb-4">
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
