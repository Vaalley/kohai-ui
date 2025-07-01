<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		label?: string;
		children: Snippet;
	}

	let { label, children }: Props = $props();
</script>

<div class="formfield" role="group">
	{#if label}
		<label for={label} aria-label={label}>{label}</label>
	{/if}
	{@render children()}
</div>

<style lang="scss">
	.formfield {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
</style>
