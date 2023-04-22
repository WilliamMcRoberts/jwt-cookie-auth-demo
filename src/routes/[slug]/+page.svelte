<script lang="ts">
	import { user } from '$lib/stores';
	export let data;
	$: NoAuthUser = data?.noAuthUser;
</script>

<div>
	<h1 class=" text-center">Check out the wonderful work of {NoAuthUser?.firstName}</h1>
	{#if NoAuthUser?.options.message}
		<h2 class="message text-center">{NoAuthUser?.options.message}</h2>
	{/if}
</div>

<style>
	h1 {
		color: #ffffff;
		margin-block: 0.5em;
	}
	h2 {
		margin-block: 0.5em;
	}
	a {
		color: #e75454;
	}
</style>
