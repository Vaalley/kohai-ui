<script lang="ts">
	let { width = "100px" }: { width?: string } = $props();
</script>

<div class="separator" style="--width: {width}"></div>

<style lang="scss">
	.separator {
		height: var(--border-width);
		width: var(--width);
		background-color: var(--gray);
	}
</style>
