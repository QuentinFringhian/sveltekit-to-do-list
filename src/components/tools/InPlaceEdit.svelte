<!--
    This is not my code. I found it on the Svelte website => https://svelte.dev/repl/29c1026dda3c47a187bd21afa0782df1?version=3.55.1
    Modified to use TypeScript.
-->
<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let value: string,
		required: boolean = true;

	const dispatch = createEventDispatcher();
	let editing: boolean = false;
	let original: string = value;

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

	function keydown(event: KeyboardEvent) {
		if (event.key == 'Escape') {
			event.preventDefault();
			value = original;
			editing = false;
		}
	}

	function focus(element: HTMLInputElement) {
		element.focus();
	}
</script>

{#if editing}
	<form on:submit|preventDefault={submit} on:keydown={keydown}>
		<input bind:value on:blur={submit} {required} use:focus />
	</form>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={edit}>
		{value}
	</div>
{/if}

<style>
	input {
		border: none;
		background: none;
		font-size: inherit;
		color: inherit;
		font-weight: inherit;
		text-align: inherit;
		box-shadow: none;
		outline: none;
		margin: 0;
		padding: 0;
		width: 100%;
	}
</style>
