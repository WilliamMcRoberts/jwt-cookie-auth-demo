<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;

	let thisForm: HTMLFormElement;
</script>

<h2 class="text-center text-lg font-bold text-primary-500">Sign Up Page</h2>

<form method="post" action="?/signup" class="max-w-[700px] mx-auto mt-20">
	<div class="form-group flex flex-row justify-between mb-4">
		<label for="firstName">Firstname<sup><small>*</small></sup></label>
		<input
			value={form?.firstName ?? ''}
			id="firstName"
			type="text"
			name="firstName"
			required
			style:color="black"
		/>
	</div>

	<div class="form-group flex flex-row justify-between mb-4">
		<label for="lastName">Lastname<sup><small>*</small></sup></label>
		<input
			value={form?.lastName ?? ''}
			id="lastName"
			type="text"
			name="lastName"
			required
			style:color="black"
		/>
	</div>

	<div class="form-group flex flex-row justify-between mb-4">
		<label for="email">Email<sup><small>*</small></sup></label>
		<input
			class:fieldError={form?.emailUsed}
			value={form?.email ?? ''}
			id="email"
			type="email"
			name="email"
			required
			style:color="black"
		/>
	</div>

	<div class="form-group flex flex-row justify-between mb-4">
		<label for="password">Password<sup><small>*</small></sup></label>
		<input
			style:color="black"
			class:fieldError={form?.weakPassword}
			type="password"
			id="password"
			name="password"
			required
		/>
	</div>

	<div class="form-group flex flex-row justify-between mb-4">
		<label for="userurl">Name of your page<sup><small>*</small></sup></label>
		<input
			style:color="black"
			value={form?.urlChoice ?? ''}
			class:fieldError={form?.urlTaken}
			type="text"
			id="userurl"
			name="userurl"
			required
		/>
	</div>

	<div class="form-group flex flex-row justify-between mb-4">
		{#if form?.error}
			<small>{form?.message}</small>
		{/if}
	</div>

	<div class="form-group flex flex-row justify-between mb-8">
		<button
			type="submit"
			class="btn btn-primary w-full duration-150 ease-in font-bold bg-primary hover:text-primary hover:bg-white"
			>Sign Up</button
		>
	</div>
</form>

<style>
	label {
		padding-right: 0.5em;
	}
	small {
		padding-left: 1em;
		color: #ff0000;
	}

	.fieldError {
		outline: 2px solid #ff0000;
	}
</style>
