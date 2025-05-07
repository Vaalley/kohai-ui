<script lang="ts">
	import Button from "$lib/components/atoms/button.svelte";
	import Mail from "lucide-svelte/icons/mail";
	import Input from "$lib/components/atoms/input.svelte";

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
		<Button size="lg"><Mail size="1em" /> Test button lg</Button>
		<Button clickAction={clickTest}><Mail size="1em" /> Test button md</Button>
		<Button size="sm" clickAction={clickTest} disabled><Mail size="1em" /> Test button sm</Button>
	</section>

	<section title="Button colors">
		<Button color="default"><Mail size="1em" /> Test button default</Button>
		<Button color="primary"><Mail size="1em" /> Test button primary</Button>
		<Button color="destructive"><Mail size="1em" /> Test button destructive</Button>
	</section>

	<section title="Links">
		<a href="/">Test link</a>
	</section>

	<section title="Inputs">
		<Input placeholder="Test input" size="lg" />
		<Input placeholder="Test input" size="md" />
		<Input placeholder="Test input" size="sm" />
	</section>
</main>
