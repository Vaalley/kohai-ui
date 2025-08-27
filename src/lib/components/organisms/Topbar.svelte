<script lang="ts">
	import Search from "lucide-svelte/icons/search";
	import LoaderCircle from "lucide-svelte/icons/loader-circle";
	import User from "lucide-svelte/icons/user";
	import LogOut from "lucide-svelte/icons/log-out";
	import UserPlus from "lucide-svelte/icons/user-plus";
	import LogIn from "lucide-svelte/icons/log-in";

	import Button from "$lib/components/atoms/Button.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Separator from "$lib/components/atoms/Separator.svelte";

	import { type ProfileMenuLink } from "$lib";
	import { searchResults } from "$lib/stores.svelte";
	import { type Component } from "svelte";
	import { page } from "$app/state";
	import { toast } from "svelte-sonner";
	import { isMobile } from "$lib/stores.svelte";

	let searchQuery = $state("");
	let isLoading = $state(false);
	let profileMenuLinks = $state<ProfileMenuLink[]>([]);
	let searchMenu = $state<HTMLDialogElement | null>(null);
	let profileMenu = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		searchMenu = document.getElementById("search") as HTMLDialogElement;
		profileMenu = document.getElementById("profile") as HTMLDialogElement;
		if (page.data.user) {
			profileMenuLinks = [
				{
					label: "Profile",
					url: `/profile/${page.data.user.username}`,
					icon: User as unknown as Component,
				},
				{
					label: "Logout",
					url: "/logout",
					icon: LogOut as unknown as Component,
				},
			];
		} else {
			profileMenuLinks = [
				{
					label: "Login",
					url: "/login",
					icon: LogIn as unknown as Component,
				},
				{
					label: "Register",
					url: "/register",
					icon: UserPlus as unknown as Component,
				},
			];
		}
	});

	async function handleSearch() {
		if (!searchQuery) {
			searchResults.data = [];
			return;
		}

		isLoading = true;
		try {
			const response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/games/search`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
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

	function handleProfileClick() {
		profileMenu?.showModal();
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === "Enter") {
			handleSearch();
		}
	}
</script>

<section class="topbar" role="banner">
	<a href="/" aria-label="Home">
		<img src="/Logo.svg" alt="Kohai Logo" />
	</a>
	<div role="search">
		<Input
			type="search"
			placeholder="Search"
			icon={isLoading ? LoaderCircle : Search}
			iconClass={isLoading ? "animate-spin" : ""}
			size={$isMobile ? "sm" : "md"}
			width={$isMobile ? "100px" : "300px"}
			onInput={(event) => {
				searchQuery = (event.target as HTMLInputElement).value;
			}}
			onKeyPress={handleKeyPress}
		/>
	</div>
	<dialog id="search" aria-label="Search results">
		{#each searchResults.data as game}
			<a onclick={() => searchMenu?.close()} href={`/game/${game.id}`}>{game.name}</a>
			{#if game !== searchResults.data[searchResults.data.length - 1]}
				<Separator width="100%" />
			{/if}
		{/each}
	</dialog>

	<Button clickAction={handleProfileClick}>
		<User aria-hidden="true" />
	</Button>
	<dialog id="profile" aria-label="User menu">
		{#each profileMenuLinks as link}
			<a onclick={() => profileMenu?.close()} href={link.url}><link.icon />{link.label}</a>
			{#if link !== profileMenuLinks[profileMenuLinks.length - 1]}
				<Separator width="100%" />
			{/if}
		{/each}
	</dialog>
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
