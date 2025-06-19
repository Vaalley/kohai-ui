<script lang="ts">
	let { height = "auto" }: { height?: string } = $props();
</script>

<div class="separator" style="--height: {height}"></div>

<style lang="scss">
	.separator {
		height: var(--height);
		width: var(--border-width);
		background-color: var(--gray);
	}
</style>
