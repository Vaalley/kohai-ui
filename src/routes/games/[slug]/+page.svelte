<script lang="ts">
	let { data } = $props<{ data: { slug: string } }>();
</script>

<section>
	<h1>{data?.slug}</h1>
</section>
