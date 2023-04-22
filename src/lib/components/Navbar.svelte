<script>
	import { user } from '$lib/stores';
</script>

<nav class="nav p-1 fixed left-0 top-0 w-full flex flex-row justify-around">
	<a class="place-self-center font-bold hover:scale-125 ease-out text-lg duration-100" href="/"
		>Home</a
	>
	{#if !$user}
		<a
			class="place-self-center font-bold hover:scale-125 ease-out text-lg duration-100"
			href="/signup">Sign Up</a
		>
		<a
			class="place-self-center font-bold hover:scale-125 ease-out text-lg duration-100"
			href="/login">Login</a
		>
	{/if}

	{#if $user}
		<a
			class="place-self-center font-bold hover:scale-125 ease-out text-lg duration-100"
			href={`/${$user.URL}`}>Your Page</a
		>
		<a
			class="place-self-center font-bold hover:scale-125 ease-out text-lg duration-100"
			data-sveltekit-preload-data="off"
			href={`/${$user.URL}/dashboard`}>Dashboard</a
		>
		<a
			class="place-self-center font-bold hover:scale-125 ease-out text-lg duration-100"
			data-sveltekit-preload-data="off"
			href="/logout">Logout</a
		>
	{/if}
	<div class="w-10 h-10 my-1 rounded-full border border-primary bg-white/[0.2] cursor-pointer">
		{#if $user}
			<p class="text-center text-3xl place-self-center">{$user?.firstName.substring(0, 1)}</p>
		{:else}
			<i class="fa-solid fa-user text-center text-2xl translate-x-[9px] translate-y-[5px]" />
		{/if}
	</div>
</nav>

<style>
	.nav {
		background: linear-gradient(to right, #ff3c00, #242424);
		border-bottom: 2px solid rgba(122, 117, 117, 0.3);
	}
</style>
