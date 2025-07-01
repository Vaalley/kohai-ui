<script lang="ts">
	interface Props {
		items: string[];
		label: string;
	}

	let { items, label }: Props = $props();
</script>

<div role="list" aria-label={label}>
	<ul class="items-list">
		{#each items as item}
			<li class="item">{item}</li>
		{/each}
	</ul>
</div>

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
