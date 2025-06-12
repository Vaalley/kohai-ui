<script lang="ts">
	import type { Snippet } from "svelte";

	let { title, children }: { title?: string; children: Snippet } = $props();
</script>

<div class="card">
	{#if title}
		<h2>{title}</h2>
	{/if}
	{@render children()}
</div>

<style lang="scss">
	.card {
		border: var(--border-width) solid var(--gray);
		border-radius: var(--border-radius-lg);
		padding: var(--spacing-xl);
		width: fit-content;
		min-width: 300px;
		max-width: 800px;
	}
</style>
