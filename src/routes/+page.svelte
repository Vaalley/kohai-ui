<script lang="ts">
	console.log("Hello world");

	import Button from "$lib/components/atoms/button/button.svelte";
</script>

<svelte:head>
	<title>Test page</title>
</svelte:head>

<main>
	<h1>Test header 1</h1>
	<h2>Test header 2</h2>
	<h3>Test header 3</h3>
	<h4>Test header 4</h4>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, laudantium atque. Perspiciatis, maxime temporibus nemo assumenda doloremque quasi
		tempore laboriosam?
	</p>

	<Button>Test button</Button>
</main>
