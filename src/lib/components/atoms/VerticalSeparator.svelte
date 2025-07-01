<script lang="ts">
	interface Props {
		height?: string;
	}

	let { height = "100px" }: Props = $props();
</script>

<div class="separator" role="separator" style="--height: {height}" aria-orientation="vertical"></div>

<style lang="scss">
	.separator {
		height: var(--height);
		width: var(--border-width);
		background-color: var(--gray);
	}
</style>
