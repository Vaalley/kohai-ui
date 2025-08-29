<script lang="ts">
	import { page } from "$app/state";
	import Button from "$lib/components/atoms/Button.svelte";
	import { goto, invalidateAll } from "$app/navigation";
	import { toast } from "svelte-sonner";
	import VerticalSeparator from "$lib/components/atoms/VerticalSeparator.svelte";
	import ItemsList from "$lib/components/atoms/ItemsList.svelte";

	let { data } = $props<{ data: { slug: string } }>();
	let user: any = $state(null);
	let stats: any = $state(null);
	let mostUsedWords: string[] = $state([]);
	let recentTags: string[] = $state([]);
	let otherStats: string[] = $state([]);
	let currentUser: any = $derived(page.data.user);
	let deleteModal: HTMLDialogElement;

	$effect(() => {
		async function fetchUserData() {
			const response = await fetch(
				`${import.meta.env.VITE_KOHAI_API_URL}/api/users/${data.slug}`,
				{
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
					},
				},
			);
			let userData = await response.json();
			user = userData.data;
		}

		async function fetchUserStats() {
			const response = await fetch(
				`${import.meta.env.VITE_KOHAI_API_URL}/api/users/stats/${data.slug}`,
				{
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
					},
				},
			);
			stats = await response.json().then((data) => data.data);

			mostUsedWords = stats.topTags.map(
				(tag: any) => `${tag.tag} - ${tag.count}`,
			);

			recentTags = stats.recentTags.map(
				(tag: any) => `${tag.tag} - ${tag.timestamp.toLocaleString().split("T")[0]}`,
			);

			otherStats = [
				`Total contributions: ${stats.totalContributions}`,
				`Total unique games tagged: ${stats.uniqueGamesTagged}`,
				`First contribution date: ${stats.firstContributionDate.toLocaleString().split("T")[0]}`,
				`Last contribution date: ${stats.lastContributionDate.toLocaleString().split("T")[0]}`,
				`Tag diversity / total unique tags: ${stats.tagDiversity}`,
			];
		}

		fetchUserStats();
		fetchUserData();
	});

	function handleDeleteClick() {
		deleteModal.showModal();
	}

	async function confirmDelete() {
		deleteModal.close();
		let response = await fetch(
			`${import.meta.env.VITE_KOHAI_API_URL}/api/users/${data.slug}`,
			{
				method: "DELETE",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
				},
			},
		);

		response = await fetch(
			`${import.meta.env.VITE_KOHAI_API_URL}/auth/logout`,
			{
				method: "POST",
				credentials: "include",
			},
		);

		if (response.ok) {
			toast.success("Account deleted");
		} else {
			toast.error("Account deletion failed");
		}

		await invalidateAll();
		await goto("/");
	}
</script>

<svelte-head>
	<title>{user?.username}</title>
</svelte-head>

<section class="profile">
	{#if user}
		<h1>{user.username}</h1>

		<div class="buttons">
			<Button
				clickAction={() => navigator.clipboard.writeText(window.location.href)}
				color="primary"
			>Copy profile link</Button>
			{#if currentUser && currentUser.isadmin}
				<Button clickAction={() => goto(`/admin`)} color="primary">Admin Panel</Button>
			{/if}
			{#if currentUser && currentUser.id === user._id}
				<Button clickAction={handleDeleteClick} color="destructive">Delete Account</Button>
			{/if}
		</div>

		<section class="stats">
			<div class="stat">
				<h2>Most used words</h2>
				<ItemsList items={mostUsedWords} label="Most used words" />
			</div>
			<VerticalSeparator height="auto" />
			<div class="stat">
				<h2>Historic</h2>
				<ItemsList items={recentTags} label="Historic" />
			</div>
			<VerticalSeparator height="auto" />
			<div class="stat">
				<h2>Other Statistics</h2>
				<ItemsList items={otherStats} label="Other Statistics" />
			</div>
		</section>
	{:else}
		<p>Loading user data...</p>
	{/if}
</section>

<dialog id="delete-modal" bind:this={deleteModal}>
	<h2>Confirm Account Deletion</h2>
	<p>
		Are you sure you want to delete your account? This action cannot be undone.
	</p>
	<div class="modal-actions">
		<Button clickAction={() => deleteModal.close()} color="primary">Cancel</Button>
		<Button clickAction={confirmDelete} color="destructive">Confirm</Button>
	</div>
</dialog>

<style lang="scss">
	.profile {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.buttons {
		display: flex;
		gap: var(--spacing-lg);
		margin-top: var(--spacing-xl);
	}

	.stats {
		margin-top: var(--spacing-2xl);
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		gap: var(--spacing-lg);
	}

	.stat {
		h2 {
			margin-bottom: var(--spacing-xl);
		}
	}
</style>
