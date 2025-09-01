<script lang="ts">
	import { onMount } from "svelte";
	import { goto, invalidateAll } from "$app/navigation";
	import { toast } from "svelte-sonner";

	onMount(async () => {
		const response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/api/auth/logout`, {
			method: "POST",
			credentials: "include", // Important for sending cookies to the backend
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
			},
		});

		if (response.ok) {
			toast.success("Logout successful");
			await invalidateAll();
			await goto("/");
		} else {
			toast.error("Logout failed");
			await goto("/");
		}
	});
</script>

<svelte:head>
	<title>Logout</title>
</svelte:head>

<p>Logging out...</p>
