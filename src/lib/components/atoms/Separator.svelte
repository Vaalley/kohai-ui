<script lang="ts">
	interface Props {
		width?: string;
	}

	let { width = "100px" }: Props = $props();
</script>

<div class="separator" role="separator" style="--width: {width}" aria-orientation="horizontal"></div>

<style lang="scss">
	.separator {
		height: var(--border-width);
		width: var(--width);
		background-color: var(--gray);
	}
</style>
