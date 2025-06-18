<script lang="ts">
	import "../styles/reset.scss";
	import "../styles/variables.scss";
	import "../styles/global.scss";

	import Topbar from "$lib/components/organisms/Topbar.svelte";
	import Footer from "$lib/components/organisms/Footer.svelte";

	import { Toaster } from "svelte-sonner";

	let { children } = $props();
</script>

<Topbar />

<Toaster richColors />

<main>
	{@render children()}
</main>

<Footer />
