<script lang="ts">
	import Button from "$lib/components/atoms/button.svelte";
	import Mail from "lucide-svelte/icons/mail";
	import Input from "$lib/components/atoms/input.svelte";
	// Import icons for the input examples
	import Search from "lucide-svelte/icons/search";
	import User from "lucide-svelte/icons/user";
	import Bell from "lucide-svelte/icons/bell";
	import Calendar from "lucide-svelte/icons/calendar";

	function clickTest() {
		console.log("clicked");
	}
</script>

<svelte:head>
	<title>Test page</title>
</svelte:head>

<main>
	<section title="Logo">
		<img src="Logo.svg" alt="Logo">
	</section>

	<section title="Headers">
		<h1>Test header 1</h1>
		<h2>Test header 2</h2>
		<h3>Test header 3</h3>
		<h4>Test header 4</h4>
	</section>

	<section title="Paragraph">
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, laudantium atque. Perspiciatis, maxime temporibus nemo assumenda doloremque quasi
			tempore laboriosam?
		</p>
	</section>

	<section title="Button sizes">
		<Button size="lg"><Mail size="1em" /> Test button lg</Button>
		<Button clickAction={clickTest}><Mail size="1em" /> Test button md</Button>
		<Button size="sm" clickAction={clickTest} disabled><Mail size="1em" /> Test button sm</Button>
	</section>

	<section title="Button colors">
		<Button color="default"><Mail size="1em" /> Test button default</Button>
		<Button color="primary"><Mail size="1em" /> Test button primary</Button>
		<Button color="destructive"><Mail size="1em" /> Test button destructive</Button>
		<Button><User /></Button>
	</section>

	<section title="Links">
		<a href="/">Test link</a>
	</section>

	<section title="Inputs">
		<Input placeholder="Test input" icon={Search} size="lg" />
		<Input placeholder="Test input" icon={User} size="md" />
		<Input placeholder="Test input" icon={Bell} size="sm" />
	</section>
</main>
