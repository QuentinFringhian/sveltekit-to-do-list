<script lang="ts">
	import { intrests } from '$lib/stores/intrestsStore';
	import { onMount } from 'svelte';
	import Menu from '../../components/dashboard/menu/Menu.svelte';

	onMount(async () => {
		intrests.init();
	});
</script>

<div class="layout">
	<div class="menu">
		<Menu intrests={$intrests} />
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	@import '../../styles/variables.postcss';

	.layout {
		display: flex;
		height: 100%;
		border-radius: 24px;
	}
	.layout > * {
		padding: 24px;
	}
	.menu {
		background-color: #fff;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
		width: 300px;
	}
	.content {
		flex: 1;
		background-color: $primary;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
	}
</style>
