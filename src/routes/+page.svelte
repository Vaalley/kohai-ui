<script lang="ts">
	import Button from "$lib/components/atoms/button.svelte";
	import Mail from "lucide-svelte/icons/mail";

	function clickTest() {
		console.log("clicked");
	}
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
		<Button size="lg" Icon={Mail}>Test button lg</Button>
		<Button clickAction={clickTest} Icon={Mail}>Test button md</Button>
		<Button size="sm" Icon={Mail} clickAction={clickTest} disabled>Test button sm</Button>
	</section>

	<section title="Button colors">
		<Button color="default">Test button default</Button>
		<Button color="primary">Test button primary</Button>
		<Button color="destructive">Test button destructive</Button>
	</section>

	<section title="Links">
		<a href="/">Test link</a>
	</section>
</main>
