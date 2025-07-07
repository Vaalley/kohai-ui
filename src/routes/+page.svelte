<script lang="ts">
</script>

<svelte:head>
	<title>Kohai</title>
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
		<div class="images">
			<a href="/games/breath-of-the-wild">
				<img src="/images/hero/1.webp" alt="Breath of the Wild cover" />
			</a>
			<a href="/games/minecraft">
				<img src="/images/hero/2.webp" alt="Minecraft cover" />
			</a>
			<a href="/games/red-dead-redemption-2">
				<img
					src="/images/hero/3.webp"
					alt="Red Dead Redemption 2 cover"
				/>
			</a>
			<a href="/games/risk-of-rain-2">
				<img src="/images/hero/4.webp" alt="Risk of Rain 2 cover" />
			</a>
			<a href="/games/minecraft">
				<img src="/images/hero/2.webp" alt="Minecraft cover" />
			</a>
			<a href="/games/risk-of-rain-2">
				<img src="/images/hero/4.webp" alt="Risk of Rain 2 cover" />
			</a>
			<a href="/games/breath-of-the-wild">
				<img src="/images/hero/1.webp" alt="Breath of the Wild cover" />
			</a>
			<a href="/games/red-dead-redemption-2">
				<img
					src="/images/hero/3.webp"
					alt="Red Dead Redemption 2 cover"
				/>
			</a>
		</div>
	</section>
</section>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: var(--spacing-xl) 0;
	}

	.hero p {
		text-align: center;
		max-width: 800px;
	}

	.hero h1 {
		@media (max-width: 768px) {
			font-size: var(--font-size-2xl);
		}
	}

	.popular-games {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xl);
		margin: var(--spacing-2xl) 0;
	}

	.images {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-xl);

		@media (max-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.images img {
		width: 150px;
		object-fit: cover;
	}
</style>
