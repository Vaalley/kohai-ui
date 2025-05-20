<script lang="ts">
</script>

<svelte:head>
	<title>Kohai</title>
</svelte:head>

<section class="hero">
	<h1>Welcome to Kohai</h1>
	<p>
		Kohai is a web application that enables users to associate descriptive words with video games, creating a crowdsourced tagging system. Users can view
		aggregated popular tags for each piece of media, providing an organic, community-driven description system.
	</p>
</section>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 400px;
	}

	.hero p {
		text-align: center;
		max-width: 800px;
	}
</style>
