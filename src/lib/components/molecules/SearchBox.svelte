<script lang="ts">
	import Search from "lucide-svelte/icons/search";
	import LoaderCircle from "lucide-svelte/icons/loader-circle";
	import Input from "$lib/components/atoms/Input.svelte";
	import HorizontalSeparator from "$lib/components/atoms/HorizontalSeparator.svelte";
	import { searchResults } from "$lib/stores.svelte";
	import { toast } from "svelte-sonner";
	import { isMobile } from "$lib/stores.svelte";

	let { placeholder = "Search", size = $isMobile ? "sm" : "md", width = $isMobile ? "100px" : "300px" } =
		$props();

	let searchQuery = $state("");
	let isLoading = $state(false);
	let searchMenu = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		searchMenu = document.getElementById("search-results") as HTMLDialogElement;
	});

	async function handleSearch() {
		if (!searchQuery) {
			searchResults.data = [];
			return;
		}

		isLoading = true;
		try {
			const response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/api/games/search`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
				},
				body: `search "${
					searchQuery.replaceAll('"', '"')
				}"; fields name,id; where category = 0; limit 10;`,
			});
			const data = await response.json();
			searchResults.data = data.data;
			if (searchResults.data.length > 0) {
				searchMenu?.showModal();
			} else {
				toast.info("No results found");
			}
		} catch (error) {
			toast.error("Search failed");
		} finally {
			isLoading = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === "Enter") {
			handleSearch();
		}
	}
</script>

<div role="search" class="search-container">
	<Input
		type="search"
		{placeholder}
		icon={isLoading ? LoaderCircle : Search}
		iconClass={isLoading ? "animate-spin" : ""}
		{size}
		{width}
		onInput={(event) => {
			searchQuery = (event.target as HTMLInputElement).value;
		}}
		onKeyPress={handleKeyPress}
	/>
	<dialog id="search-results" aria-label="Search results">
		{#each searchResults.data as game}
			<a onclick={() => searchMenu?.close()} href={`/game/${game.id}`}>{game.name}</a>
			{#if game !== searchResults.data[searchResults.data.length - 1]}
				<HorizontalSeparator width="100%" />
			{/if}
		{/each}
	</dialog>
</div>

<style lang="scss">
	.search-container {
		position: relative;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	:global(.animate-spin) {
		animation: spin 1s linear infinite;
	}
</style>
