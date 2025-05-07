<script lang="ts">
	let { placeholder, size = "md", disabled }: {
		placeholder?: string;
		size?: "lg" | "md" | "sm";
		disabled?: boolean;
	} = $props();
</script>

<input {disabled} {placeholder} class="input--{size}" type="text">

<style lang="scss">
	// Input sizes
	.input--lg {
		font-size: var(--font-size-lg);
		padding: var(--spacing-md) var(--spacing-xl);
	}

	.input--md {
		font-size: var(--font-size-md);
	}

	.input--sm {
		font-size: var(--font-size-sm);
		padding: var(--spacing-sm) var(--spacing-md);
	}
</style>
