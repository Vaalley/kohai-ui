<svelte-head>
	<title>{game?.name}</title>
</svelte-head>

<script lang="ts">
	import type { Game } from "$lib";
	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import VerticalSeparator from "$lib/components/atoms/VerticalSeparator.svelte";
	import Separator from "$lib/components/atoms/Separator.svelte";
	import { browser } from "$app/environment";

	let { data } = $props<{ data: { slug: string } }>();

	let game: Game | null = $state(null);
	let tags: string[] = $state([]);
	let isExpanded = $state(false);
	let displayedSummary = $state("");
	let isMobile = $state(false);

	$inspect(game);
	$inspect(tags);

	const summaryMaxLength = 200;

	// Fetch game data
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

	// Update displayed summary
	$effect(() => {
		if (game && game.summary) {
			if (isExpanded || game.summary.length <= summaryMaxLength) {
				displayedSummary = game.summary;
			} else {
				displayedSummary = game.summary.substring(0, summaryMaxLength) + "...";
			}
		} else {
			displayedSummary = "";
		}
	});

	// Handle screen size changes
	$effect(() => {
		if (browser) {
			checkScreenSize();
			window.addEventListener("resize", checkScreenSize);
			return () => {
				window.removeEventListener("resize", checkScreenSize);
			};
		}
	});

	function checkScreenSize() {
		if (browser) {
			isMobile = window.innerWidth <= 768;
		}
	}

	function handleTagInput(event: Event, index: number) {
		const target = event.target as HTMLInputElement;
		tags[index] = target.value;
	}
</script>

<section class="game">
	{#if game}
		<h1>{game.name}</h1>
		<div class="summary-cover">
			<img src="//images.igdb.com/igdb/image/upload/t_cover_small_2x/{game.cover.image_id}.jpg" alt={game.name}>
			{#if isMobile}
				<Separator width="200px" />
			{:else}
				<VerticalSeparator height="200px" />
			{/if}
			<div class="summary">
				{#if game && game.summary}
					<p>{displayedSummary}</p>
					{#if game.summary.length > summaryMaxLength}
						<Button clickAction={() => (isExpanded = !isExpanded)} width="fit-content" size="sm">
							{isExpanded ? "Read less" : "Read more"}
						</Button>
					{/if}
				{/if}
			</div>
		</div>
	{/if}

	<form action="">
		<div class="tag-inputs">
			<Input
				onInput={(event) => {
					handleTagInput(event, 0);
				}}
				placeholder="Add a tag"
			/>
			<Input
				onInput={(event) => {
					handleTagInput(event, 1);
				}}
				placeholder="Add a tag"
			/>
			<Input
				onInput={(event) => {
					handleTagInput(event, 2);
				}}
				placeholder="Add a tag"
			/>
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
			max-width: 60ch;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xl);
		.tag-inputs {
			margin-top: var(--spacing-2xl);
			display: flex;
			gap: var(--spacing-xl);

			@media (max-width: 1024px) {
				flex-direction: column;
				gap: var(--spacing-md);
			}
		}
	}

	.summary-cover {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-xl);

		@media (max-width: 768px) {
			flex-direction: column;
			gap: var(--spacing-md);
		}
	}

	.summary {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
</style>
