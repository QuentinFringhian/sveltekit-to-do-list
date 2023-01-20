<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import SettingIcon from '../../components/icons/SettingIcon.svelte';
	import TodayIcon from '../../components/icons/TodayIcon.svelte';
	import SchedulIcon from '../../components/icons/SchedulIcon.svelte';
</script>

<div class="menu">
	<div class="user">user presentation</div>
	<hr class="separator" />
	<div class="roots">
		<MenuItem title="Today tasks" icon={TodayIcon} active={true}>
			<p>elem 1</p>
			<p>elem 2</p>
			<p>elem 3</p>
			<p>elem 4</p>
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
