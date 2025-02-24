<script lang="ts">
	import "../styles/reset.css";
	import "../styles/variables.css";
	import "../styles/global.css";
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
</nav>

{@render children()}
