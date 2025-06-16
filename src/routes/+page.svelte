<script lang="ts">
	import Button from "$lib/components/atoms/Button.svelte";
	import { toast, Toaster } from "svelte-sonner";

	let userData = $state();

	async function me() {
		return fetch(import.meta.env.VITE_KOHAI_API_URL + "/auth/me", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Not authenticated");
				}
				return response.json();
			})
			.then((data) => {
				console.log("user data: ", data);
				toast.success("Fetched user data successfully");
				userData = data.user;
			})
			.catch((error) => {
				console.error(error);
				toast.error("Failed to fetch user data");
			});
	}

	async function logout() {
		return fetch(import.meta.env.VITE_KOHAI_API_URL + "/auth/logout", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Logout failed");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Logout successful", data);
				toast.success("Logout successful");
				userData = null;
			})
			.catch((error) => {
				console.error(error);
				toast.error("Logout failed");
			});
	}
</script>

<svelte:head>
	<title>Kohai</title>
</svelte:head>

<Toaster />

<section class="hero">
	<h1>Welcome to Kohai</h1>
	<p>
		Kohai is a web application that enables users to associate descriptive words with video games, creating a crowdsourced tagging system. Users can view
		aggregated popular tags for each piece of media, providing an organic, community-driven description system.
	</p>

	<section class="test">
		<Button color="primary" width="fit-content" clickAction={me}>Me</Button>
		<Button color="destructive" width="fit-content" clickAction={logout}>Logout</Button>
		<div>
			<h2>user info:</h2>
			{#if userData}
				<pre>{JSON.stringify(userData, null, 2)}</pre>
			{/if}
		</div>
	</section>

	<section class="popular-games">
		<h2>Popular games:</h2>
		<div class="images">
			<a href="/games/breath-of-the-wild">
				<img src="/images/hero/1.webp" alt="Breath of the Wild cover" />
			</a>
			<a href="/games/minecraft">
				<img src="/images/hero/2.webp" alt="Minecraft cover" />
			</a>
			<a href="/games/red-dead-redemption-2">
				<img
					src="/images/hero/3.webp"
					alt="Red Dead Redemption 2 cover"
				/>
			</a>
			<a href="/games/risk-of-rain-2">
				<img src="/images/hero/4.webp" alt="Risk of Rain 2 cover" />
			</a>
			<a href="/games/minecraft">
				<img src="/images/hero/2.webp" alt="Minecraft cover" />
			</a>
			<a href="/games/risk-of-rain-2">
				<img src="/images/hero/4.webp" alt="Risk of Rain 2 cover" />
			</a>
			<a href="/games/breath-of-the-wild">
				<img src="/images/hero/1.webp" alt="Breath of the Wild cover" />
			</a>
			<a href="/games/red-dead-redemption-2">
				<img
					src="/images/hero/3.webp"
					alt="Red Dead Redemption 2 cover"
				/>
			</a>
		</div>
	</section>
</section>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: var(--spacing-xl) 0;
	}

	.hero p {
		text-align: center;
		max-width: 800px;
	}

	.popular-games {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xl);
		margin: var(--spacing-2xl) 0;
	}

	.images {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-xl);
	}

	.images img {
		width: 150px;
		object-fit: cover;
	}
</style>
