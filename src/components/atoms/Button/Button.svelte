<script lang="ts">
	import "./Button.css";

	let {
		variant = "primary",
		size = "md",
		children,
		...rest
	} = $props();
</script>

<button
	{...rest}
	class="button button--{variant} button--{size}"
>
	{@render children?.()}
</button>
