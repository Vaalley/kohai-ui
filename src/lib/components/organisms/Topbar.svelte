<script lang="ts">
	import User from "lucide-svelte/icons/user";
	import LogIn from "lucide-svelte/icons/log-in";
	import LogOut from "lucide-svelte/icons/log-out";
	import UserPlus from "lucide-svelte/icons/user-plus";

	import Search from "lucide-svelte/icons/search";
	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Separator from "$lib/components/atoms/Separator.svelte";

	import { debounce, type ProfileMenuLink } from "$lib";
	import { profile, searchResults } from "$lib/stores.svelte";
	import { onMount } from "svelte";

	let query = $state("");
	let profileMenuLinks = $state<ProfileMenuLink[]>([]);
	let searchMenu = $state<HTMLDialogElement | null>(null);
	let profileMenu = $state<HTMLDialogElement | null>(null);

	onMount(() => {
		searchMenu = document.getElementById("search") as HTMLDialogElement;
		profileMenu = document.getElementById("profile") as HTMLDialogElement;
	});

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
		} catch (error) {
			console.error("Search failed:", error);
		}

		searchMenu?.showModal();
	}

	function handleProfileClick() {
		if (profile) {
			if (profile.isLoggedIn) {
				profileMenuLinks = [
					{ label: "Profile", url: "/profile", icon: User },
					{ label: "Logout", url: "/logout", icon: LogOut },
				];
			} else {
				profileMenuLinks = [
					{ label: "Login", url: "/login", icon: LogIn },
					{ label: "Register", url: "/register", icon: UserPlus },
				];
			}
		}

		profileMenu?.showModal();
	}
</script>

<section class="topbar">
	<a href="/">
		<img src="/Logo.svg" alt="Logo" />
	</a>
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
		<dialog id="search">
			{#each searchResults.data as game}
				<a href={`/games/${game.slug}`}>{game.name}</a>
				{#if game !== searchResults.data[searchResults.data.length - 1]}
					<Separator width="100%" />
				{/if}
			{/each}
		</dialog>
	</div>

	<div>
		<Button clickAction={handleProfileClick}><User /></Button>
		<dialog id="profile">
			{#each profileMenuLinks as link}
				<a href={link.url}><link.icon />{link.label}</a>
				{#if link !== profileMenuLinks[profileMenuLinks.length - 1]}
					<Separator width="100%" />
				{/if}
			{/each}
		</dialog>
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
