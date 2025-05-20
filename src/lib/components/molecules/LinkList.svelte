<script lang="ts">
	import Separator from "$lib/components/atoms/Separator.svelte";
	let { links, floating }: { links: any[]; floating?: boolean } = $props();
</script>

<div class="link-list {floating ? 'floating' : ''}">
	{#each links as link}
		<a href={link.url}>{link.label}</a>
		{#if link !== links[links.length - 1]}
			<Separator width="100%" />
		{/if}
	{/each}
</div>

<style lang="scss">
	.link-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		border: var(--border-width) solid var(--gray);
		border-radius: var(--border-radius-lg);
		background-color: var(--background);
	}

	.floating {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
