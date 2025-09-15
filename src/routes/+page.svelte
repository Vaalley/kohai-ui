<script lang="ts">
	import type { RandomTopGame } from "$lib/types.js";
	import { getImageUrl } from "$lib/utils.js";

	let games = $state<RandomTopGame[]>([]);
	let loading = $state(true);
	let error = $state("");

	$effect(() => {
		async function fetchGames() {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_KOHAI_API_URL}/api/games/top/random?t=${Date.now()}`,
					{
						headers: {
							"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
							"Cache-Control": "no-cache",
							"Pragma": "no-cache",
						},
					},
				);

				if (response.ok) {
					const result = await response.json();
					if (result.success) {
						games = result.data;
						loading = false;
						error = "";
						return;
					}
				}
				error = "Failed to load games";
				loading = false;
			} catch (e) {
				error = "Failed to load games";
				loading = false;
				console.error("Error:", e);
			}
		}

		fetchGames();
	});
</script>

<svelte:head>
	<title>Home page</title>
</svelte:head>

<section class="hero" aria-label="Hero section">
	<h1>Welcome to Kohai</h1>
	<p>
		Kohai is a web application that enables users to associate descriptive words with video games, creating a
		crowdsourced tagging system. Users can view aggregated popular tags for each piece of media, providing an
		organic, community-driven description system.
	</p>

	<section class="popular-games" aria-label="Popular games">
		<h2>Popular games:</h2>
		{#if loading}
			<div class="loading">Loading games...</div>
		{:else if error}
			<div class="error">{error}</div>
		{:else}
			<div class="images">
				{#each games as game}
					<a href="/game/{game.id}" data-sveltekit-preload-data="hover">
						{#if game.cover?.image_id}
							<img
								class="game-cover"
								src={getImageUrl(game.cover.image_id)}
								alt="{game.name} cover"
								loading="lazy"
							/>
						{:else}
							<div class="no-image">
								<span>{game.name}</span>
							</div>
						{/if}
					</a>
				{/each}
			</div>
		{/if}
	</section>
</section>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: var(--spacing-xl) 0;

		p {
			text-align: center;
			max-width: 800px;
		}
	}

	.popular-games {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xl);
		margin: var(--spacing-2xl) 0;

		.images {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: var(--spacing-xl);

			@media (max-width: 768px) {
				grid-template-columns: repeat(2, 1fr);
			}

			img {
				width: 150px;
				object-fit: cover;
			}
		}

		.loading, .error {
			text-align: center;
		}

		.error {
			color: var(--color-error);
		}
	}

	.game-cover {
		transition: transform 0.1s ease-in-out;

		&:hover {
			transform: scale(1.05);
		}
	}
</style>
