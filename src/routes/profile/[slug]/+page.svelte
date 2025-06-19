<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import Button from "$lib/components/atoms/Button.svelte";

	let { data } = $props<{ data: { slug: string } }>();
	let user: any = $state(null);
	let currentUser: any = $derived(page.data.user);

	onMount(async () => {
		// Fetch user data from backend using data.slug
		const response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/api/users/${data.slug}`, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
			},
		});
		user = await response.json();
		user = user.data;
	});

	async function deleteAccount() {
		// TODO: Delete account
		console.log("Deleting account");
	}
</script>

<section class="profile">
	{#if user}
		<h1>{user.username}</h1>

		<Button clickAction={() => navigator.clipboard.writeText(window.location.href)} color="primary">Copy profile link</Button>
		{#if currentUser && currentUser.id === user._id}
			<Button clickAction={deleteAccount} color="destructive">Delete Account</Button>
		{/if}
	{:else}
		<p>Loading user data...</p>
	{/if}
</section>

<style lang="scss">
	.profile {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
