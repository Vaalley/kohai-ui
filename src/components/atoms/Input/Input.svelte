<script lang="ts">
	import "./Input.css";

	let {
		size = "md",
		children,
		...rest
	} = $props();
</script>
<div class="input-container">
	{@render children?.()}

	<input
		class="input input--{size}"
		{...rest}
	/>
</div>
