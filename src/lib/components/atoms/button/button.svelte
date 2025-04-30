<script lang="ts">
	import type { Snippet } from "svelte";

	// Declare the children prop which receives the snippet
	let { children, size = "md", color = "default" }: { children: Snippet; size?: "lg" | "md" | "sm"; color?: "default" | "primary" | "destructive" } =
		$props();
</script>

<button onclick={() => console.log("Button clicked")} class="button--{size} button--{color}">
	{@render children()}
</button>

<style lang="scss">
	// Button sizes
	.button--lg {
		font-size: var(--font-size-lg);
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
