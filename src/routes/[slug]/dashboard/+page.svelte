<script lang="ts">
	export let form;
	export let data;
	import {
		layout,
		carousel,
		hero,
		message,
		primaryColor,
		secondaryColor,
		textColor,
		user
	} from '$lib/stores';
	$: User = data?.userMinusPassword;
	$: {
		const newUser = data?.userMinusPassword;
		user.set(newUser);
	}
	$: saveResult = form?.message;
	$: {
		if (saveResult)
			setTimeout(() => {
				saveResult = '';
			}, 3000);
	}
</script>

<div>
	<h1 class="text-center">{`Welcome to your dashboard ${data?.userMinusPassword?.firstName}!`}</h1>

	<h2 class="text-center">
		Admin Options
		<sup title="These options will be reflected only for your URL."><small>i</small></sup>
	</h2>

	<form method="post" action="?/saveOptions" class="max-w-[700px] mx-auto mt-20">
		<label for="layout">Navigation Location</label>
		<select name="layout" value={User?.options.layout}>
			<option value="top">Top</option>
			<option value="side">Side</option>
		</select>
		<hr />

		<div class="layout-color-option">
			<label for="primary">Primary Color</label>
			<input
				type="color"
				id="primary"
				name="primary"
				value={User?.palette.primary ?? '242424'}
				class="text-black"
			/>
		</div>
		<div class="layout-color-option">
			<label for="secondary">Secondary Color</label>
			<input
				type="color"
				id="secondary"
				name="secondary"
				value={User?.palette.secondary ?? 'FFFFFF'}
				class="text-black"
			/>
		</div>
		<div class="layout-color-option">
			<label for="text">Text Color</label>
			<input
				type="color"
				id="text"
				name="text"
				value={User?.palette.text ?? 'FFFFFF'}
				class="text-black"
			/>
		</div>
		<hr />
		<div class="layout-option">
			<label for="carousel">Carousel</label>
			<input
				type="checkbox"
				name="carousel"
				value="carousel"
				checked={User?.options.carousel}
				class="text-black"
			/>
		</div>
		<div class="layout-option">
			<label for="hero">Hero</label>
			<input
				type="checkbox"
				name="hero"
				value="hero"
				checked={User?.options.hero}
				class="text-black"
			/>
		</div>
		<div class="layout-option">
			<div>
				<label for="message">Custom Message</label>
			</div>
			<textarea cols={20} name="message" value={User?.options.message} class="text-black" />
		</div>

		<div class="layout-option">
			<button
				type="submit"
				class="duration-150 ease-in font-bold bg-primary hover:text-primary hover:bg-white p-1"
				>Save</button
			>
			<button
				class="duration-150 ease-in font-bold bg-primary hover:text-primary hover:bg-white p-1"
				>Save & View</button
			>
		</div>
	</form>
</div>

<style>
	h1,
	h2 {
		margin-top: 0.25em;
		margin-bottom: 0.25em;
	}
	select {
		width: 100%;
	}
	.layout-option {
		margin-bottom: 0.5em;
	}
	.layout-color-option {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 0.2em;
	}
	small {
		display: inline-block;
		width: 1em;
		height: 1em;
		border: 1px solid #ffffff;
		border-radius: 50%;
		padding: 2px;
	}
	sup {
		display: inline-block;
		width: 1em;
		height: 1em;
		text-align: center;
	}
</style>
