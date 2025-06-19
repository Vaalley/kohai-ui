<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import Button from "$lib/components/atoms/Button.svelte";
	import { goto, invalidateAll } from "$app/navigation";
	import { toast } from "svelte-sonner";

	let { data } = $props<{ data: { slug: string } }>();
	let user: any = $state(null);
	let currentUser: any = $derived(page.data.user);
	let deleteModal: HTMLDialogElement;

	onMount(async () => {
		const response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/api/users/${data.slug}`, {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
			},
		});
		user = await response.json();
		user = user.data;
	});

	function handleDeleteClick() {
		deleteModal.showModal();
	}

	async function confirmDelete() {
		deleteModal.close();
		let response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/api/users/${data.slug}`, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
			},
		});

		response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});

		if (response.ok) {
			toast.success("Account deleted");
		} else {
			toast.error("Account deletion failed");
		}

		await invalidateAll();
		await goto("/");
	}
</script>

<section class="profile">
	{#if user}
		<h1>{user.username}</h1>

		<div class="buttons">
			<Button clickAction={() => navigator.clipboard.writeText(window.location.href)} color="primary">Copy profile link</Button>
			{#if currentUser && currentUser.id === user._id}
				<Button clickAction={handleDeleteClick} color="destructive">Delete Account</Button>
			{/if}
		</div>
	{:else}
		<p>Loading user data...</p>
	{/if}
</section>

<dialog id="delete-modal" bind:this={deleteModal}>
	<h2>Confirm Account Deletion</h2>
	<p>Are you sure you want to delete your account? This action cannot be undone.</p>
	<div class="modal-actions">
		<Button clickAction={confirmDelete} color="destructive">Confirm</Button>
		<Button clickAction={() => deleteModal.close()} color="primary">Cancel</Button>
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

	dialog {
		background-color: var(--background-color);
		color: var(--text-color);
		padding: var(--spacing-xl);
		.modal-actions {
			display: flex;
			gap: var(--spacing-md);
			margin-top: var(--spacing-lg);
		}
	}
</style>
