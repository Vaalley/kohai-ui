<script lang="ts">
	import User from "lucide-svelte/icons/user";
	import Search from "lucide-svelte/icons/search";
	import Button from "../atoms/Button.svelte";
	import Input from "../atoms/Input.svelte";
</script>

<div class="topbar">
	<div>
		<img src="Logo.svg" alt="Logo">
	</div>
	<div>
		<Input type="text" placeholder="Search" icon={Search} size="md" />
	</div>
	<div>
		<Button><User /></Button>
	</div>
</div>

<style lang="scss">
	.topbar {
		display: flex;
		height: 100px;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-xl);
		border-bottom: var(--border-width) solid var(--gray);
	}
</style>
