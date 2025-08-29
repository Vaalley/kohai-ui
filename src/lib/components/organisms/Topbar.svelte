<script lang="ts">
	import User from "lucide-svelte/icons/user";
	import LogOut from "lucide-svelte/icons/log-out";
	import UserPlus from "lucide-svelte/icons/user-plus";
	import LogIn from "lucide-svelte/icons/log-in";

	import Button from "$lib/components/atoms/Button.svelte";
	import Separator from "$lib/components/atoms/Separator.svelte";
	import SearchBox from "$lib/components/molecules/SearchBox.svelte";

	import { type ProfileMenuLink } from "$lib";
	import { type Component } from "svelte";
	import { page } from "$app/state";

	let profileMenuLinks = $state<ProfileMenuLink[]>([]);
	let profileMenu = $state<HTMLDialogElement | null>(null);

	$effect(() => {
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

	function handleProfileClick() {
		profileMenu?.showModal();
	}
</script>

<section class="topbar" role="banner">
	<a href="/" aria-label="Home">
		<img src="/Logo.svg" alt="Kohai Logo" />
	</a>
	<SearchBox />

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
