<script lang="ts">
	let { placeholder, size = "md", disabled, icon: Icon, type = "text", onInput, onKeyPress, iconClass, width = "300px" }: {
		placeholder?: string;
		size?: "lg" | "md" | "sm";
		disabled?: boolean;
		icon?: any;
		type?: string;
		onInput?: (event: Event) => void;
		onKeyPress?: (event: KeyboardEvent) => void;
		iconClass?: string;
		width?: string;
	} = $props();
</script>

<label class="input-container input-container--{size}{Icon ? ' has-icon' : ''}">
	<input
		{disabled}
		{placeholder}
		{type}
		oninput={onInput}
		onkeypress={onKeyPress}
		class="input--{size}"
		style="--width: {width}"
	/>

	{#if Icon}
		<div class="icon icon--{size} {iconClass || ''}">
			<Icon size={size === "lg" ? "20px" : size === "md" ? "16px" : "14px"} />
		</div>
	{/if}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		border: var(--border-width) solid var(--gray);
		border-radius: var(--border-radius-full);
		width: fit-content;
		transition: all 0.2s ease-in-out;

		&:focus-within {
			border-color: var(--light-gray);
		}
	}

	.input-container input {
		border: none;
		outline: none;
		width: var(--width);
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

	// icon inside label right padding
	.has-icon.input-container--lg {
		padding-right: var(--spacing-lg);
	}

	.has-icon.input-container--md {
		padding-right: var(--spacing-md);
	}

	.has-icon.input-container--sm {
		padding-right: var(--spacing-sm);
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
