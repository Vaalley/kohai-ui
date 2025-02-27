<script lang="ts">
	import "./Input.css";

	let {
		size = "md",
		icon,
		...rest
	} = $props();
</script>

<input
	class="input input--{size}"
	{...rest}
/>
