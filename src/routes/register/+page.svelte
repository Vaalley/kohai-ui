<script lang="ts">
	import Card from "$lib/components/atoms/Card.svelte";
	import Formfield from "$lib/components/atoms/Formfield.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import { toast } from "svelte-sonner";
	import { goto, invalidateAll } from "$app/navigation";

	let username = $state("");
	let email = $state("");
	let password = $state("");

	async function register(event: Event) {
		event.preventDefault();
		await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
		})
			.then(async (response) => {
				if (!response.ok) {
					const errorData = await response.json();
					console.error(errorData);
					if (errorData.issues && errorData.issues.length > 0) {
						errorData.issues.forEach((issue: { message: string }) => {
							toast.error(issue.message);
						});
					} else {
						toast.error(`Failed to register user: ${response.statusText}`);
					}
					return;
				}

				toast.success("User registered successfully");
				await invalidateAll();
				await goto("/");
			})
			.catch((error) => {
				console.error(error);
				toast.error(`Failed to register user: ${error}`);
			});
	}
</script>

<section class="register">
	<Card title="Register">
		<form action="" onsubmit={register}>
			<Formfield label="Username">
				<Input placeholder="Username" onInput={(e) => username = (e.target as HTMLInputElement).value || ""} />
			</Formfield>
			<Formfield label="Email">
				<Input placeholder="Email" type="email" onInput={(e) => email = (e.target as HTMLInputElement).value || ""} />
			</Formfield>
			<Formfield label="Password">
				<Input placeholder="Password" type="password" onInput={(e) => password = (e.target as HTMLInputElement).value || ""} />
			</Formfield>
			<Button color="primary" width="fit-content">Register</Button>
		</form>
	</Card>
</section>

<style lang="scss">
	.register {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60vh;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}
</style>
