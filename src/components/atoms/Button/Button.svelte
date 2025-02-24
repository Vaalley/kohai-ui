<script lang="ts">
	import "./Button.css";

	let { variant = "primary", children } = $props();
</script>

<button class="button button--{variant}">
	{@render children?.()}
</button>
