<script lang="ts">
	import Card from "$lib/components/atoms/Card.svelte";
	import Formfield from "$lib/components/atoms/Formfield.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import { toast } from "svelte-sonner";
	import { goto, invalidateAll } from "$app/navigation";

	let email = $state("");
	let password = $state("");

	async function login(event: Event) {
		event.preventDefault();
		await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/auth/login`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then(async () => {
				toast.success("Login successful");
				await invalidateAll();
				await goto("/");
			})
			.catch(() => {
				toast.error("Login failed");
			});
	}
</script>

<section class="login">
	<Card title="Login">
		<form action="" onsubmit={login}>
			<Formfield label="Email">
				<Input placeholder="Email" type="email" onInput={(e) => email = (e.target as HTMLInputElement).value || ""} />
			</Formfield>
			<Formfield label="Password">
				<Input placeholder="Password" type="password" onInput={(e) => password = (e.target as HTMLInputElement).value || ""} />
			</Formfield>
			<Button color="primary" width="fit-content">Login</Button>
		</form>
	</Card>
</section>

<style lang="scss">
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60vh;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
</style>
