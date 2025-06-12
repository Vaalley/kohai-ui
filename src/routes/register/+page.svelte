<script lang="ts">
	import Card from "$lib/components/atoms/Card.svelte";
	import Formfield from "$lib/components/atoms/Formfield.svelte";
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
</script>

<div>
	<Card title="Register">
		<Formfield label="Username">
			<Input placeholder="Username" />
		</Formfield>
		<Formfield label="Email">
			<Input placeholder="Email" />
		</Formfield>
		<Formfield label="Password">
			<Input placeholder="Password" type="password" />
		</Formfield>
		<Button>Register</Button>
	</Card>
</div>

<style lang="scss"></style>
