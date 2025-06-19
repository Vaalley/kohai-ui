<script lang="ts">
	import type { Game } from "$lib";

	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";

	import { onMount } from "svelte";

	let { data } = $props<{ data: { slug: string } }>();

	let game: Game | null = $state(null);
	let tags: string[] = $state([]);

	onMount(async () => {
		const response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/games/gameInfo/${data.slug}`, {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
			},
			method: "GET",
		});
		const result = await response.json();
		game = result?.data[0];
	});

	$inspect(game);
</script>

<section>
	{#if game}
		<h1>{game.name}</h1>
		<p>{game.summary}</p>
		<img src="//images.igdb.com/igdb/image/upload/t_720p/{game.cover.image_id}.jpg" alt={game.name}>
	{/if}

	<form action="">
		<div class="tag-inputs">
			<Input placeholder="Add a tag" />
			<Input placeholder="Add a tag" />
			<Input placeholder="Add a tag" />
		</div>
		<Button color="primary">Update my tags</Button>
	</form>
</section>

<style lang="scss">
	.tag-inputs {
		display: flex;
		gap: var(--spacing-xl);
	}
</style>
