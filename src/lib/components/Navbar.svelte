<script>
	import { user } from '$lib/stores';
</script>

<nav class="nav p-1 fixed left-0 top-0 w-full flex flex-row justify-around">
	<a href="/" class="place-self-center">Home</a>
	<a href="/signup" class="place-self-center">Sign Up</a>
	<a href="/login" class="place-self-center">Login</a>
	<div class="w-10 h-10 rounded-full border border-primary bg-white/[0.2]">
		<p class="text-center text-3xl place-self-center">{$user?.firstName.substring(0, 1)}</p>
	</div>
</nav>

<style>
	.nav {
		background: linear-gradient(to right, #ff3c00, #242424);
		border-bottom: 2px solid rgba(122, 117, 117, 0.3);
	}
</style>
