<script lang="ts">
	import type { Snippet } from "svelte";

	let { children, link }: {
		children: Snippet;
		link?: string;
	} = $props();
</script>

<a href={link}>
	{@render children()}
</a>

<style lang="scss">
</style>
