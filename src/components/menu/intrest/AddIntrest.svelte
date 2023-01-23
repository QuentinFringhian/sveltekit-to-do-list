<script lang="ts">
	import { intrests } from '$lib/stores/intrestsStore';
	import AddIntrestIcon from '../../icons/AddIntrestIcon.svelte';

	const addIntrest = async () => {
		intrests.createIntrest('test', '#fd99af');
	};
</script>

<button class="intrest-button" on:click={addIntrest}>
	<AddIntrestIcon width="14px" height="14px" color="#717082" />
	<p class="">Add intrest</p>
</button>

<style lang="postcss">
	.intrest-button {
		display: flex;
		align-items: center;
		gap: 18px;
		opacity: 0.3;
	}
	button {
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
	button:hover {
		opacity: 1;
	}
</style>
