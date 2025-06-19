<script lang="ts">
	import type { Game } from "$lib";

	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";

	let { data } = $props<{ data: { slug: string } }>();

	let game: Game | null = $state(null);
	let tags: string[] = $state([]);

	$effect(() => {
		async function fetchGameData() {
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
		}

		fetchGameData();
	});

	$inspect(game);

	let isExpanded = $state(false);
	const maxLength = 200;

	let displayedSummary = $state("");

	$effect(() => {
		if (game && game.summary) {
			if (isExpanded || game.summary.length <= maxLength) {
				displayedSummary = game.summary;
			} else {
				displayedSummary = game.summary.substring(0, maxLength) + "...";
			}
		} else {
			displayedSummary = "";
		}
	});
</script>

<section class="game">
	{#if game}
		<h1>{game.name}</h1>
		{#if game && game.summary}
			<p>{displayedSummary}</p>
			{#if game.summary.length > maxLength}
				<Button clickAction={() => (isExpanded = !isExpanded)} width="fit-content" size="sm">
					{isExpanded ? "Read less" : "Read more"}
				</Button>
			{/if}
		{/if}
		<!-- <img src="//images.igdb.com/igdb/image/upload/t_720p/{game.cover.image_id}.jpg" alt={game.name}> -->
	{/if}

	<form action="">
		<div class="tag-inputs">
			<Input placeholder="Add a tag" />
			<Input placeholder="Add a tag" />
			<Input placeholder="Add a tag" />
		</div>
		<Button clickAction={() => console.log("TODO: implement update tags")} width="fit-content" color="primary">Update my tags</Button>
	</form>
</section>

<style lang="scss">
	.game {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);

		p {
			text-align: center;
			max-width: 60ch;
		}
	}

	form {
		.tag-inputs {
			margin-top: var(--spacing-2xl);
			display: flex;
			gap: var(--spacing-xl);
		}

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xl);
	}
</style>
