<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	export let data;
	let navChoice = '/';
	function handleNav(e: any) {
		console.log(e.target.value);
		goto(e.target.value, { noScroll: false });
	}
	$: User = data?.authedUser;
	$: {
		const newUser = data?.authedUser;
		user.set(newUser);
	}
</script>

<h1 class="text-center text-3xl font-bold">
	Welcome To The Photo Share App By Byte Bear - JWT / Cookie Auth Demo
</h1>

<div class="mx-auto w-3/4 mt-20">
	{#if data.URLList.length}
		<p class="text-lg">Not sure where to go? Check out one of these users!</p>
		<form class="w-full text-black my-2">
			<select bind:value={navChoice} name="urlList" on:change={handleNav} class="w-1/2">
				<option value="/">User List</option>
				{#each data.URLList as URL}
					<option value={URL}>{URL}</option>
				{/each}
			</select>
		</form>
	{/if}
</div>
