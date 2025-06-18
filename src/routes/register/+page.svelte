<script lang="ts">
	import Card from "$lib/components/atoms/Card.svelte";
	import Formfield from "$lib/components/atoms/Formfield.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import { toast } from "svelte-sonner";

	let username = $state("");
	let email = $state("");
	let password = $state("");

	function register(event: Event) {
		event.preventDefault();
		fetch(`${import.meta.env.VITE_KOHAI_API_URL}/auth/register`, {
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
			.then((response) => response.json())
			.then((data) => {
				console.log("user data: ", data);
				toast.success("User registered successfully");
			})
			.catch((error) => {
				console.error(error);
				toast.error("Failed to register user");
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
</style>
