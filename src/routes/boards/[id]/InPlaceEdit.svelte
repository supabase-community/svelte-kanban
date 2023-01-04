<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let value;
	let klass = '';

	const dispatch = createEventDispatcher();
	let editing = false,
		original;

	onMount(() => {
		original = value;
	});

	function edit() {
		editing = true;
	}

	function submit() {
		if (value != original) {
			dispatch('submit', value);
		}
		editing = false;
	}

	function keydown(event) {
		if (event.key == 'Escape') {
			event.preventDefault();
			value = original;
			editing = false;
		}
	}

	function focus(element) {
		element.focus();
	}

	export { klass as class };
</script>

{#if editing}
	<form on:submit|preventDefault={submit} on:keydown={keydown}>
		<input bind:value on:blur={submit} required use:focus />
	</form>
{:else}
	<button on:click={edit} class={klass}>
		{value}
	</button>
{/if}

<style>
	button {
		font-size: 0.9rem;
	}
	input {
		border: none;
		background: none;
		font-size: inherit;
		color: inherit;
		font-weight: inherit;
		text-align: inherit;
		box-shadow: none;
		padding: 0.5rem 0;
	}
</style>
