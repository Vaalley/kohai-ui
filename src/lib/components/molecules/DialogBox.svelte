<script lang="ts">
	import type { Snippet } from "svelte";
	let { children, id }: { children: Snippet; id: string } = $props();
</script>

<dialog {id}>
	{@render children()}
</dialog>

<style lang="scss">
</style>
