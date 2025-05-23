<script lang="ts">
	import Input from "$lib/components/atoms/Input.svelte";
	let { data } = $props<{ data: { slug: string } }>();
</script>

<section>
	<div class="tag-inputs">
		<Input placeholder="Add a tag" />
		<Input placeholder="Add a tag" />
		<Input placeholder="Add a tag" />
	</div>
	<h1>{data?.slug}</h1>
</section>

<style lang="scss">
	.tag-inputs {
		display: flex;
		gap: var(--spacing-xl);
	}
</style>
