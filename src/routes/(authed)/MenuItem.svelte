<script lang="ts">
	export let title: string;
	export let icon: any;
	export let active: boolean = false;
</script>

<div class="menu-item">
	<div class="icon" style="opacity: {active ? 100 : 50}%;">
		<svelte:component this={icon} color={active ? '#ca8bfe' : '#717082'} />
	</div>
	<p class="title">
		{title}
	</p>
	{#if $$slots.default}
		<div class="content">
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	.content {
		grid-area: content;
	}
	.icon {
		grid-area: icon;
	}
	.title {
		grid-area: title;
	}
	.menu-item {
		display: grid;
		grid-template-columns: 72px 1fr;
		grid-template-areas:
			'icon title'
			'. content';
	}
</style>
