<!-- TopNavbar.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
	import Routes from '../Routes/Routes.svelte';
	import { topBarHeight } from '$lib/store';
  
</script>

<div class="top-navbar" style="--height: {$topBarHeight}px;">
	<Routes />
	<div class="logo"><a href='{base}/'>Schoolinger's Cat</a></div>
</div>

<style>
	.top-navbar {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		border: 1px red solid;
		/* position: fixed; */

		height: var(--height);
		background-color: #b4f6a4;
		color: black;
		display: flex;
		align-items: center;
		margin: 0;
		width: 100%;

	}
	.logo a {
			text-decoration: none;
		}

	.logo {
		flex-grow: 1;
		font-size: 24px;
		font-weight: bold;
		display: flex;
		justify-content: center;
	}
</style>
