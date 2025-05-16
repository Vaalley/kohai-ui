<script lang="ts">
	import User from "lucide-svelte/icons/user";
	import Search from "lucide-svelte/icons/search";
	import Button from "../atoms/Button.svelte";
	import Input from "../atoms/Input.svelte";
	import { debounce } from "$lib";

	let query = $state("");
	let results = $state([]);

	const debouncedSearch = debounce(handleSearch);
	async function handleSearch() {
		if (!query) return;
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
			results = data.data;
			console.table(results);
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
				const value = (event.target as HTMLInputElement).value;
				query = value;
				debouncedSearch();
			}}
		/>
	</div>
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
