<script lang="ts">
	import { type Game, getImageUrl } from "$lib";
	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import VerticalSeparator from "$lib/components/atoms/VerticalSeparator.svelte";
	import HorizontalSeparator from "$lib/components/atoms/HorizontalSeparator.svelte";
	import { isMobile } from "$lib/stores.svelte";
	import ChipCloud from "$lib/components/molecules/ChipCloud.svelte";
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
		try {
			const response = await fetch(
				`${import.meta.env.VITE_KOHAI_API_URL}/api/tags/${data.slug}`,
				{
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
					},
					method: "GET",
				},
			);

			if (!response.ok) {
				if (response.status === 404) {
					tags = [];
					return;
				}
				return;
			}

			const result = await response.json();
			tags = result?.data || [];
		} catch (error) {
			tags = [];
		}
	}

	async function fetchGameData() {
		const response = await fetch(
			`${import.meta.env.VITE_KOHAI_API_URL}/api/games/${data.slug}`,
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

	function handleTagInput(event: Event, index: number) {
		const target = event.target as HTMLInputElement;
		userTags[index] = target.value;
	}

	function updateTags() {
		async function updateTags() {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_KOHAI_API_URL}/api/tags/${data.slug}`,
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

				if (!response.ok) {
					if (response.status === 401) {
						toast.error("You need to be logged in to add tags");
					} else {
						const errorText = await response.text();
						toast.error(errorText || "Failed to update tags");
					}
					return;
				}

				const result = await response.json();
				toast.success("Tags updated successfully");
				fetchTags();
			} catch (error) {
				console.error("Error updating tags:", error);
				toast.error("Failed to update tags");
			}
		}
		updateTags();
	}

	// fetch things when slug changes
	$effect(() => {
		const slug = data.slug;
		if (slug) {
			// reset state when navigating to new game
			game = null;
			tags = [];
			userTags = [];
			displayedSummary = "";

			// fetch both game data and tags
			fetchGameData();
			fetchTags();
		}
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
</script>

<svelte-head>
	<title>{game?.name || "Game Details"}</title>
</svelte-head>

<section class="game">
	{#if game}
		<h1>{game.name}</h1>
		<div class="summary-cover">
			<img
				src={getImageUrl(game.cover.image_id, "t_cover_small_2x")}
				alt={`Cover art for ${game.name}`}
				loading="lazy"
			/>
			{#if $isMobile}
				<HorizontalSeparator width="200px" />
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
		<Button clickAction={updateTags} width="fit-content" color="primary">Update my tags</Button>
	</form>

	<div aria-label="Tags">
		<ChipCloud
			items={tags?.map((tag) => ({ label: String(tag.tag ?? ""), value: Number(tag.count ?? 0) })) || []}
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
