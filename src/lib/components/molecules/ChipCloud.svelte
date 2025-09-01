<script lang="ts">
	let { items, label, maxItems = 100 } = $props<{
		items: Array<{ label: string; value: number }>;
		label?: string;
		maxItems?: number;
	}>();

	type ChipItem = { label: string; value: number };

	const list = $derived<ChipItem[]>((items ?? []).slice(0, maxItems));
	const decorated = $derived(list.map((item: ChipItem, i: number) => ({ ...item, _i: i })));
	const values = $derived(decorated.map((i: { value: number }) => i.value));
	const minV = $derived(values.length ? Math.min(...values) : 0);
	const maxV = $derived(values.length ? Math.max(...values) : 1);
	const range = $derived(Math.max(1, maxV - minV));

	const norm = (v: number): number => (v - minV) / range;
</script>

<div class="chip-cloud" role="list" aria-label={label ?? "Tags"}>
	{#each decorated as item (item.label)}
		<span
			role="listitem"
			class="chip"
			style={`--w:${norm(item.value)}; --i:${item._i};`}
			aria-label={`${item.label} (${item.value})`}
			title={`${item.label}: ${item.value}`}
		>
			<span class="chip__text">{item.label}</span>
			<span class="chip__count">{item.value}</span>
		</span>
	{/each}
</div>

<style lang="scss">
	.chip-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		justify-content: center;
		width: 600px;

		@media (max-width: 768px) {
			width: 400px;
		}
	}

	.chip {
		font-size: var(--font-size-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--border-radius-full);
		background: var(--background);
		color: var(--foreground);
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		border: var(--border-width) solid var(--gray);
		transition: all 150ms ease;

		&:hover {
			filter: brightness(1.5);
			transform: translateY(-3px);
		}
	}

	.chip__count {
		font-size: var(--font-size-sm);
		line-height: 1.5;
		padding: 0 var(--spacing-sm);
		border-radius: var(--border-radius-full);
		background: var(--gray);
		color: var(--foreground);
	}
</style>
