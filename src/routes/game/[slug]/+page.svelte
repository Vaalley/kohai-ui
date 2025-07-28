<script lang="ts">
	import type { Game } from "$lib";
	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import VerticalSeparator from "$lib/components/atoms/VerticalSeparator.svelte";
	import Separator from "$lib/components/atoms/Separator.svelte";
	import { isMobile } from "$lib/stores.svelte";
	import { onMount } from "svelte";
	import ItemsList from "$lib/components/atoms/ItemsList.svelte";
	import type { Tag } from "$lib/types";
	import { toast } from "svelte-sonner";

	let { data } = $props<{ data: { slug: string } }>();

	let game: Game | null = $state(null);
	let userTags: string[] = $state([]);
	let tags: Tag[] = $state([]);
	let isExpanded = $state(false);
	let displayedSummary = $state("");

	const summaryMaxLength = 200;

	async function fetchTags() {
		const response = await fetch(
			`${import.meta.env.VITE_KOHAI_API_URL}/tags/${data.slug}`,
			{
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
				},
				method: "GET",
			},
		);
		const result = await response.json();
		tags = result?.data;
	}

	async function fetchGameData() {
		const response = await fetch(
			`${import.meta.env.VITE_KOHAI_API_URL}/games/gameInfo/${data.slug}`,
			{
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
				},
				method: "GET",
			},
		);
		const result = await response.json();
		game = result?.data[0];
	}

	// fetch things on page load
	onMount(() => {
		fetchTags();
		fetchGameData();
	});

	// Update displayed summary
	$effect(() => {
		if (game && game.summary) {
			if (isExpanded || game.summary.length <= summaryMaxLength) {
				displayedSummary = game.summary;
			} else {
				displayedSummary =
					game.summary.substring(0, summaryMaxLength) + "...";
			}
		} else {
			displayedSummary = "";
		}
	});

	function handleTagInput(event: Event, index: number) {
		const target = event.target as HTMLInputElement;
		userTags[index] = target.value;
	}

	function updateTags() {
		async function updateTags() {
			const response = await fetch(
				`${import.meta.env.VITE_KOHAI_API_URL}/tags/${data.slug}`,
				{
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
					},
					method: "PUT",
					body: JSON.stringify({ tags: userTags }),
				},
			);
			const result = await response.json();
			if (!response.ok) {
				toast.error(result.message);
				return;
			}
			toast.success("Tags updated successfully");
			fetchTags(); // Refresh tags list
		}
		updateTags();
	}
</script>

<svelte-head>
	<title>{game?.name || "Game Details"}</title>
</svelte-head>

<section class="game">
	{#if game}
		<h1>{game.name}</h1>
		<div class="summary-cover">
			<img
				src="//images.igdb.com/igdb/image/upload/t_cover_small_2x/{game
					.cover.image_id}.jpg"
				alt={`Cover art for ${game.name}`}
				loading="lazy"
			/>
			{#if $isMobile}
				<Separator width="200px" />
			{:else}
				<VerticalSeparator height="200px" />
			{/if}
			<div class="summary">
				{#if game && game.summary}
					<p>{displayedSummary}</p>
					{#if game.summary.length > summaryMaxLength}
						<Button
							clickAction={() => (isExpanded = !isExpanded)}
							width="fit-content"
							size="sm"
						>
							{isExpanded ? "Read less" : "Read more"}
						</Button>
					{/if}
				{/if}
			</div>
		</div>
	{/if}

	<form action="" aria-label="Tag management">
		<fieldset class="tag-inputs">
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
		</fieldset>
		<Button clickAction={updateTags} width="fit-content" color="primary"
			>Update my tags</Button
		>
	</form>

	<div aria-label="Tags">
		<ItemsList
			items={tags.map((tag) => `${tag.tag}: ${tag.count}`)}
			label="Tags"
		/>
	</div>
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
