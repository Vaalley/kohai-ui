<script lang="ts">
	let { data } = $props<{ data: { slug: string } }>();
</script>

<section>
	<h1>Profile for {data?.slug}</h1>
</section>

<style lang="scss">
</style>
