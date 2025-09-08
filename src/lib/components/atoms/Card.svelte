<script lang="ts">
	import type { Snippet } from "svelte";
	import HorizontalSeparator from "$lib/components/atoms/HorizontalSeparator.svelte";

	interface Props {
		title?: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="card" role="region">
	{#if title}
		<h2 aria-label={title}>{title}</h2>
		<HorizontalSeparator width="100%" />
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
