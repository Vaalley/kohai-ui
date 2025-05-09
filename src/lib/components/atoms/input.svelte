<script lang="ts">
	let { placeholder, size = "md", disabled, icon, type = "text" }: {
		placeholder?: string;
		size?: "lg" | "md" | "sm";
		disabled?: boolean;
		icon?: any;
		type?: string;
	} = $props();
</script>
<div class="input-container">
	<input
		{disabled}
		{placeholder}
		{type}
		class="input--{size}"
	/>

	{#if icon}
		{@const Icon = icon}
		<div class="icon icon--{size}">
			<Icon size={size === "lg" ? "20px" : size === "md" ? "16px" : "14px"} />
		</div>
	{/if}
</div>

<style lang="scss">
	.input-container {
		position: relative;
		display: inline-flex;
		align-items: center;
	}

	.icon {
		position: absolute;
		pointer-events: none;
	}

	// Icon sizes
	.icon--lg {
		right: var(--spacing-xl);
	}

	.icon--md {
		right: var(--spacing-lg);
	}

	.icon--sm {
		right: var(--spacing-md);
	}

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
