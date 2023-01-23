<script lang="ts">
	import SettingIcon from '../icons/SettingIcon.svelte';
	import TodayIcon from '../icons/TodayIcon.svelte';
	import SchedulIcon from '../icons/SchedulIcon.svelte';
	import MenuItem from './MenuItem.svelte';
	import AddIntrest from '../intrest/AddIntrest.svelte';
	import type { IntrestType } from '$lib/intrestType';
	import Intrest from '../intrest/Intrest.svelte';

	export let intrests: IntrestType[];
</script>

<div class="menu">
	<div class="user">user presentation</div>
	<hr class="separator" />
	<div class="roots">
		<MenuItem title="Today tasks" icon={TodayIcon} active={true}>
			{#each intrests as intrest}
				<Intrest {intrest} />
			{/each}
			<AddIntrest />
		</MenuItem>
		<MenuItem title="Scheduled tasks" icon={SchedulIcon} active={false} />
		<MenuItem title="Settings" icon={SettingIcon} active={false} />
	</div>
</div>

<style lang="postcss">
	@import '../../styles/variables.postcss';

	.menu {
		height: 100%;
	}
	.separator {
		border: 2px solid $primary;
		border-radius: 3px;
		margin: 48px 16px 72px 16px;
	}
	.roots {
		margin-left: 6px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
</style>
