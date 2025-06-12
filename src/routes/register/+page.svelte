<script lang="ts">
	import Card from "$lib/components/atoms/Card.svelte";
	import Formfield from "$lib/components/atoms/Formfield.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";

	let username = $state("");
	let email = $state("");
	let password = $state("");

	function register() {
		console.log("Register");
	}
</script>

<section class="register">
	<Card title="Register">
		<Formfield label="Username">
			<Input placeholder="Username" />
		</Formfield>
		<Formfield label="Email">
			<Input placeholder="Email" type="email" />
		</Formfield>
		<Formfield label="Password">
			<Input placeholder="Password" type="password" />
		</Formfield>
		<Button color="primary" width="fit-content" clickAction={register}>Register</Button>
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
