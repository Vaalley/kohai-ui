<script lang="ts">
	let { actions }: { actions: any[] } = $props();
</script>

<div>
	{#each actions as action}
		<a href={action.link}>{action.label}</a>
	{/each}
</div>
