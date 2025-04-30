<script lang="ts">
	console.log("Hello world");

	function clickTest() {
		console.log("clicked");
	}

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

	<section title="Button sizes">
		<Button size="lg">Test button lg</Button>
		<Button clickAction={clickTest}>Test button md</Button>
		<Button size="sm">Test button sm</Button>
	</section>

	<section title="Button colors">
		<Button color="default">Test button default</Button>
		<Button color="primary">Test button primary</Button>
		<Button color="destructive">Test button destructive</Button>
	</section>

	<input type="text">
</main>
