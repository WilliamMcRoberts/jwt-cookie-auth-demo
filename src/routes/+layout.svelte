<script lang="ts">
	import '../app.postcss';

	import Navbar from '$components/Navbar.svelte';

	import { user, isOnUserStyledPage } from '$lib/stores';
	$: User = $user;
</script>

<div class="main-app mt-20">
	<Navbar />

	<slot />
</div>

<svelte:head>
	<style>
		body {
			margin: 0;
		}
	</style>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>
