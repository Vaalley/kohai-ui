<script lang="ts">
	import User from "lucide-svelte/icons/user";
	import LogIn from "lucide-svelte/icons/log-in";
	import LogOut from "lucide-svelte/icons/log-out";
	import UserPlus from "lucide-svelte/icons/user-plus";

	import Search from "lucide-svelte/icons/search";
	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import LinkList from "$lib/components/molecules/LinkList.svelte";

	import { debounce } from "$lib";
	import { profile, searchResults } from "$lib/store.svelte";

	let query = $state("");
	let profileMenuLinks = $state([]);

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

	function handleProfileClick() {
		console.log(profile);

		if (profile) {
			if (profile.isLoggedIn) {
				profileMenuLinks = [
					{ label: "Profile", url: "/profile", icon: User },
					{ label: "Logout", url: "/logout", icon: LogOut },
				] as never[];
			} else {
				profileMenuLinks = [
					{ label: "Login", url: "/login", icon: LogIn },
					{ label: "Register", url: "/register", icon: UserPlus },
				] as never[];
			}

			profile.showMenu = !profile.showMenu;
		}
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
	</div>

	{#if searchResults.data.length > 0}
		<LinkList
			floating={true}
			links={searchResults.data.map((game) => ({
				label: game.name,
				url: `/games/${game.slug}`,
			})) as never[]}
		/>
	{/if}

	<div>
		<Button clickAction={handleProfileClick}><User /></Button>
		{#if profile?.showMenu}
			<LinkList floating={true} links={profileMenuLinks} />
		{/if}
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
