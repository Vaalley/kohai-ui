<script lang="ts">
	import VerticalSeparator from "$lib/components/atoms/VerticalSeparator.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import ItemsList from "$lib/components/atoms/ItemsList.svelte";

	let user: string = $state("");

	const stats = [
		{ label: "Total Users", value: "100" },
		{ label: "Active Users", value: "50" },
		{ label: "Inactive Users", value: "50" },
	];

	function handleUserSearchInput(event: Event) {
		user = (event.target as HTMLInputElement).value;
	}

	$inspect(user);
</script>

<section class="admin" aria-label="Admin dashboard">
	<h1 aria-label="Admin dashboard heading">Admin Dashboard</h1>
	<div class="admin-content" aria-labelledby="admin-dashboard-heading">
		<section class="user-control" aria-labelledby="user-control-heading">
			<h2 id="user-control-heading">User Control Panel</h2>
			<div class="buttons-container" aria-label="User control buttons">
				<Input placeholder="Username" onInput={(event) => handleUserSearchInput(event)} />
				<Button color="primary">Fetch</Button>
			</div>
			<h3 id="stats-heading">Stats:</h3>
			<ItemsList items={stats.map((stat) => stat.value)} label="User Statistics" />
			<h3 id="actions-heading">Actions:</h3>
			<div class="buttons-container" aria-label="User action buttons">
				<Button color="primary">Promote to admin</Button>
				<Button color="destructive">Delete user account</Button>
			</div>
		</section>
		<VerticalSeparator height="auto" />
		<section class="kohai-info" aria-labelledby="kohai-info-heading">
			<h2 id="kohai-info-heading">Kohai Info</h2>
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

	.user-control * {
		margin-top: var(--spacing-lg);
	}

	.buttons-container {
		display: flex;
		gap: var(--spacing-md);
	}
</style>
