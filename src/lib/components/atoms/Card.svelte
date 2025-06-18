<script lang="ts">
	import type { Snippet } from "svelte";
	import Separator from "$lib/components/atoms/Separator.svelte";

	let { title, children }: { title?: string; children: Snippet } = $props();
</script>

<div class="card">
	{#if title}
		<h2>{title}</h2>
		<Separator width="100%" />
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
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
</style>
