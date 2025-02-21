<script lang="ts">
	import { onMount } from "svelte";
	import Button from "../components/atoms/Button/Button.svelte";

	const baseUrl = "http://localhost:2501/";

	async function handleRegister() {
		const username =
			(
				document.getElementById(
					"registerUsername",
				) as HTMLInputElement
			)?.value ?? "";
		const email =
			(
				document.getElementById(
					"registerEmail",
				) as HTMLInputElement
			)?.value ?? "";
		const password =
			(
				document.getElementById(
					"registerPassword",
				) as HTMLInputElement
			)?.value ?? "";

		await fetch(baseUrl + "auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	async function handleLogin() {
		const email =
			(
				document.getElementById(
					"loginEmail",
				) as HTMLInputElement
			)?.value ?? "";
		const password =
			(
				document.getElementById(
					"loginPassword",
				) as HTMLInputElement
			)?.value ?? "";

		await fetch(baseUrl + "auth/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	async function handleLogout() {
		await fetch(baseUrl + "auth/logout", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	async function handleMe() {
		await fetch(baseUrl + "auth/me", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	onMount(async () => {
		await handleMe();
		console.log(document.cookie);
	});
</script>

<svelte:head>
	<title>User authentication tests</title>
</svelte:head>

<main>
	<h1>User authentication tests</h1>

	<section class="register form">
		<form
			style="border: 2px solid black; margin: 10px; padding: 10px;"
		>
			<h2>register</h2>
			<label for="registerUsername">username</label>
			<input
				type="text"
				name="registerUsername"
				id="registerUsername"
				maxlength="32"
				minlength="3"
			/>

			<label for="registerEmail">email</label>
			<input
				type="email"
				name="registerEmail"
				id="registerEmail"
			/>

			<label for="registerPassword">password</label>
			<input
				type="password"
				name="registerPassword"
				id="registerPassword"
				minlength="8"
			/>

			<button
				type="submit"
				on:click|preventDefault={handleRegister}
				>register</button
			>
		</form>
	</section>

	<section class="login form">
		<form
			style="border: 2px solid black; margin: 10px; padding: 10px;"
		>
			<h2>login</h2>
			<label for="loginEmail">email</label>
			<input type="email" name="loginEmail" id="loginEmail" />

			<label for="loginPassword">password</label>
			<input
				type="password"
				name="loginPassword"
				id="loginPassword"
				minlength="8"
			/>

			<button
				type="submit"
				on:click|preventDefault={handleLogin}
				>login</button
			>
		</form>
	</section>

	<section class="logout form">
		<form
			style="border: 2px solid black; margin: 10px; padding: 10px;"
		>
			<h2>logout</h2>
			<button
				type="submit"
				on:click|preventDefault={handleLogout}
				>logout</button
			>
		</form>
	</section>

	<section class="me">
		<form
			style="border: 2px solid black; margin: 10px; padding: 10px;"
		>
			<h2>me</h2>
			<button type="submit" on:click|preventDefault={handleMe}
				>me</button
			>
		</form>
	</section>

	<section class="css-tests">
		<Button>Custom Content</Button>
	</section>
</main>
