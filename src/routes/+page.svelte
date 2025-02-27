<script lang="ts">
	import { onMount } from "svelte";
	import Button from "../components/atoms/Button/Button.svelte";
	import Input from "../components/atoms/Input/Input.svelte";
	import TestTubeDiagonal from "lucide-svelte/icons/test-tube-diagonal";
	import Mail from "lucide-svelte/icons/mail";
	import Lock from "lucide-svelte/icons/lock";
	import User from "lucide-svelte/icons/user";

	const baseUrl = "http://localhost:2501/";

	async function handleRegister() {
		const username = (
			document.getElementById(
				"registerUsername",
			)
		)?.value ?? "";
		const email = (
			document.getElementById(
				"registerEmail",
			)
		)?.value ?? "";
		const password = (
			document.getElementById(
				"registerPassword",
			)
		)?.value ?? "";

		await fetch(baseUrl + "auth/register", {
			method: "POST",
			headers: {
				"Content-Type":
					"application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	async function handleLogin() {
		const email = (
			document.getElementById(
				"loginEmail",
			)
		)?.value ?? "";
		const password = (
			document.getElementById(
				"loginPassword",
			)
		)?.value ?? "";

		await fetch(baseUrl + "auth/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type":
					"application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
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
				"Content-Type":
					"application/json",
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
				"Content-Type":
					"application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	onMount(async () => {
		await handleMe();
	});
</script>

<svelte:head>
	<title>User authentication tests</title>
</svelte:head>

<main>
	<h1>User authentication tests <TestTubeDiagonal /></h1>

	<section class="register form">
		<form
			style="border: 2px solid black; margin: 10px; padding: 10px"
		>
			<h2>register</h2>
			<label for="registerUsername">username</label>
			<Input
				type="text"
				name="registerUsername"
				id="registerUsername"
				maxlength="32"
				minlength="3"
			><User /></Input>

			<label for="registerEmail">email</label>
			<Input
				type="email"
				name="registerEmail"
				id="registerEmail"
			><Mail /></Input>

			<label for="registerPassword">password</label>
			<Input
				type="password"
				name="registerPassword"
				id="registerPassword"
				minlength="8"
			><Lock /></Input>

			<Button
				type="submit"
				onclick={handleRegister}
				size="sm"
			>
				register
			</Button>
		</form>
	</section>

	<section class="login form">
		<form
			style="border: 2px solid black; margin: 10px; padding: 10px"
		>
			<h2>login</h2>
			<label for="loginEmail">email</label>
			<Input
				type="email"
				name="loginEmail"
				id="loginEmail"
			><Mail /></Input>

			<label for="loginPassword">password</label>
			<Input
				type="password"
				name="loginPassword"
				id="loginPassword"
				minlength="8"
			><Lock /></Input>

			<Button
				type="submit"
				onclick={handleLogin}
				size="sm"
			>
				login
			</Button>
		</form>
	</section>

	<section class="logout form">
		<form
			style="border: 2px solid black; margin: 10px; padding: 10px"
		>
			<h2>logout</h2>
			<Button
				type="submit"
				onclick={handleLogout}
				size="sm"
			>
				logout
			</Button>
		</form>
	</section>

	<section class="me">
		<form
			style="border: 2px solid black; margin: 10px; padding: 10px"
		>
			<h2>me</h2>
			<Button
				type="submit"
				onclick={handleMe}
				size="sm"
			>me</Button>
		</form>
	</section>

	<section class="css-tests">
		<div style="display: flex; align-items: center; gap: 10px">
			<Button size="icon"><TestTubeDiagonal /></Button>
			<Button>Some text</Button>
			<Button variant="secondary" size="lg">Secondary</Button>
			<Button variant="destructive" size="xl"
			>Destructive</Button>
			<Button variant="outline" size="lg">Outline</Button>
			<Button variant="ghost">Ghost</Button>
		</div>
		<div style="display: flex; align-items: center; gap: 10px">
			<Input size="xl"><Mail /></Input>

			<Input type="password" size="sm"><Lock /></Input>
		</div>
	</section>
</main>
