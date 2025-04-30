<script lang="ts">
	import type { Snippet } from 'svelte';

	// Declare the children prop which receives the snippet
	let { children }: { children: Snippet } = $props();
</script>

<button onclick={() => console.log("Button clicked")}>
	{@render children()}
</button>

<style lang="scss">
</style>