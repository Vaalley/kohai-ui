<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		type?: "button" | "submit" | "reset";
		size?: "lg" | "md" | "sm";
		color?: "default" | "primary" | "destructive";
		clickAction?: () => void;
		disabled?: boolean;
		width?: string;
	}

	let {
		children,
		type = "button",
		size = "md",
		color = "default",
		clickAction,
		disabled,
		width = "auto",
	}: Props = $props();
</script>

<button {disabled} {type} onclick={clickAction} class="button--{size} button--{color}" style="--width: {width}">
	{@render children()}
</button>

<style lang="scss">
	button {
		width: var(--width);
	}

	// Button sizes
	.button--lg {
		font-size: var(--font-size-lg);
		padding: var(--spacing-md) var(--spacing-xl);
	}

	.button--md {
		font-size: var(--font-size-md);
	}

	.button--sm {
		font-size: var(--font-size-sm);
		padding: var(--spacing-sm) var(--spacing-md);
	}

	// Button colors
	.button--default {
		background-color: var(--background);
		color: var(--foreground);
		border: var(--border-width) solid var(--gray);

		&:hover {
			background-color: var(--gray);
		}
	}

	.button--primary {
		background-color: var(--primary);
		border: var(--border-width) solid var(--primary-dark);

		&:hover {
			background-color: var(--primary-dark);
		}
	}

	.button--destructive {
		background-color: var(--destructive);
		border: var(--border-width) solid var(--destructive-dark);

		&:hover {
			background-color: var(--destructive-dark);
		}
	}
</style>
