<script lang="ts">
	import User from "lucide-svelte/icons/user";
	import Search from "lucide-svelte/icons/search";
	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import LinkList from "$lib/components/molecules/LinkList.svelte";
	import { debounce } from "$lib";
	import { searchResults } from "$lib/store.svelte";

	let query = $state("");

	const debouncedSearch = debounce(handleSearch);
	async function handleSearch() {
		if (!query) {
			searchResults.data = [];
			return;
		}

		try {
			const response = await fetch("http://127.0.0.1:2501/games/search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: `search "${query}"; fields name,slug; limit 10;`,
			});
			const data = await response.json();
			searchResults.data = data.data;
			console.table(searchResults);
		} catch (error) {
			console.error("Search failed:", error);
		}
	}
</script>

<section class="topbar">
	<div>
		<img src="Logo.svg" alt="Logo" />
	</div>
	<div>
		<Input
			type="text"
			placeholder="Search"
			icon={Search}
			size="md"
			onInput={(event) => {
				query = (event.target as HTMLInputElement).value;
				debouncedSearch();
			}}
		/>
	</div>

	{#if searchResults.data.length > 0}
		<LinkList
			floating={true}
			links={searchResults.data.map((game) => ({
				label: game.name,
				url: `/games/${game.slug}`,
			}))}
		/>
	{/if}

	<div>
		<Button><User /></Button>
	</div>
</section>

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
