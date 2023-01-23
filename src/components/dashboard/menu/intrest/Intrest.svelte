<script lang="ts">
	import type { IntrestType } from '$lib/intrestType';
	import { intrests } from '$lib/stores/intrestsStore';
	import { textfit } from 'svelte-textfit';
	import DeleteIcon from '../../../icons/DeleteIcon.svelte';
	import InPlaceEdit from '../../../tools/InPlaceEdit.svelte';

	export let intrest: IntrestType;

	let resize = false;

	const updataResize = () => {
		resize = !resize;
	};

	const patchIntrestName = async (e: any) => {
		if (e.details == intrest.intrest || !intrest.id) return;
		intrests.editIntrest({ ...intrest, intrest: e.detail });
	};

	const deleteIntrest = async () => {
		if (!intrest.id) return;
		intrests.deleteIntrest(intrest.id);
	};
</script>

<div class="intrest">
	<div class="intrest-color" style={`background-color: ${intrest.color}`} />
	<p
		class="intrest-name"
		use:textfit={{
			mode: 'single',
			width: 100,
			height: 27,
			autoResize: true,
			update: resize,
			forceSingleModeWidth: false
		}}
	>
		{#key resize}
			<InPlaceEdit
				bind:value={intrest.intrest}
				on:submit={patchIntrestName}
				on:submit={updataResize}
			/>
		{/key}
	</p>
	<button class="delete-button" on:click={deleteIntrest}>
		<DeleteIcon width="14px" height="14px" color="#717082" />
	</button>
</div>

<style lang="postcss">
	.intrest {
		display: grid;
		grid-template-columns: 14px 100px 14px;
		grid-template-areas: 'intrest-color intrest-name delete-button';
		align-items: center;
		gap: 18px;
	}

	.intrest-color {
		grid-area: intrest-color;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		margin-right: 7px;
	}

	.intrest-name {
		grid-area: intrest-name;
		display: flex;
		align-items: center;
		min-height: 27px;
		overflow: hidden;
		white-space: nowrap;
	}

	.delete-button {
		grid-area: delete-button;
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
		opacity: 0.3;
	}

	.delete-button:hover {
		opacity: 1;
	}
</style>
