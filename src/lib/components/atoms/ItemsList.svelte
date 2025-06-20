<script lang="ts">
	let { items }: { items: string[] } = $props();
</script>

<ul class="items-list">
	{#each items as item}
		<li class="item">{item}</li>
	{/each}
</ul>

<style lang="scss">
	.items-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		list-style-type: disc;
	}

	.item {
		padding: var(--spacing-sm);
	}
</style>
