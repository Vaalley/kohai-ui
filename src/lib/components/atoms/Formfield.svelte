<script lang="ts">
	import type { Snippet } from "svelte";

	let { label, children }: { label?: string; children: Snippet } = $props();
</script>

<div class="formfield">
	{#if label}
		<label for={label}>{label}</label>
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
