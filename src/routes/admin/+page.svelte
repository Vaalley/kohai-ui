<script lang="ts">
	import VerticalSeparator from "$lib/components/atoms/VerticalSeparator.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import ItemsList from "$lib/components/atoms/ItemsList.svelte";
	import { toast } from "svelte-sonner";

	let user: string = $state("");

	// Aggregated strings to show in the stats list
	let userStats: string[] = $state([]);

	function handleUserSearchInput(event: Event) {
		user = (event.target as HTMLInputElement).value;
	}

	async function fetchUserStats() {
		if (!user?.trim()) {
			toast.error("Please enter a username first");
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_KOHAI_API_URL}/api/users/${user}/stats`,
				{
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
					},
				},
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch stats (${response.status})`);
			}

			const data = await response.json();
			const stats = data?.data;

			if (!stats) {
				userStats = ["No stats available for this user."];
				return;
			}

			toast.success(`Stats fetched successfully for ${user}`);

			// Show only a couple of the user stats on Admin page
			userStats = [
				`Total contributions: ${stats.totalContributions}`,
				`Unique games tagged: ${stats.uniqueGamesTagged}`,
				`Last contribution: ${String(stats.lastContributionDate).split("T")[0]}`,
			];
		} catch (err: any) {
			console.error(err);
			toast.error(err?.message ?? "Failed to fetch user stats");
		}
	}

	async function deleteUser() {
		if (!user?.trim()) {
			toast.error("Please enter a username first");
			return;
		}

		const confirmed = window.confirm(`Delete user "${user}"? This cannot be undone.`);
		if (!confirmed) return;

		try {
			const response = await fetch(
				`${import.meta.env.VITE_KOHAI_API_URL}/api/users/${user}`,
				{
					method: "DELETE",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
					},
				},
			);

			if (!response.ok) {
				throw new Error(`Failed to delete user (${response.status})`);
			}

			toast.success(`User "${user}" deleted`);
			userStats = [];
			user = "";
		} catch (err: any) {
			console.error(err);
			toast.error(err?.message ?? "Failed to delete user");
		}
	}
</script>

<section class="admin" aria-label="Admin dashboard">
	<h1 aria-label="Admin dashboard heading">Admin Dashboard</h1>
	<div class="admin-content" aria-labelledby="admin-dashboard-heading">
		<section aria-labelledby="user-control-heading">
			<h2>User Control Panel</h2>
			<div class="buttons-container" aria-label="User control buttons">
				<Input placeholder="Username" onInput={(event) => handleUserSearchInput(event)} />
				<Button color="primary" clickAction={fetchUserStats}>Fetch</Button>
			</div>
			<h3>Stats:</h3>
			<ItemsList items={userStats} label="User Statistics" />
			<h3>Actions:</h3>
			<div class="buttons-container" aria-label="User action buttons">
				<Button color="primary">Promote to admin</Button>
				<Button color="destructive" clickAction={deleteUser}>Delete user account</Button>
			</div>
		</section>
		<VerticalSeparator height="auto" />
		<section class="kohai-info" aria-labelledby="kohai-info-heading">
			<h2>Kohai Info</h2>
			<div>
				<h3>Stats:</h3>
				<!-- <ItemsList items={appStats.map((stat) => stat.value)} label="Kohai Statistics" /> -->
			</div>
		</section>
	</div>
</section>

<style lang="scss">
	.admin {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.admin-content {
		margin-top: var(--spacing-2xl);
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		gap: var(--spacing-lg);
	}

	h2 {
		margin-bottom: var(--spacing-xl);
	}

	h3 {
		margin-bottom: var(--spacing-md);
		margin-top: var(--spacing-lg);
	}

	.buttons-container {
		display: flex;
		gap: var(--spacing-md);
	}
</style>
