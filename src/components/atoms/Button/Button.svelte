<script lang="ts">
	import "./Button.css";

	let {
		variant = "primary",
		size = "md",
		children,
	} = $props();
</script>

<button class="button button--{variant} button--{size}">
	{@render children?.()}
</button>
