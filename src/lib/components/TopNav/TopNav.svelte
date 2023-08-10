<!-- TopNavbar.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
	import { topBarHeight } from '$lib/store';
	import Directory from './Directory.svelte';
</script>

<div class="top-navbar" style="--height: {$topBarHeight}px;">
	<Directory />
	<div class="logo"><a href='{base}/'>Schoolinger's Cat</a></div>
</div>

<style>
	.top-navbar {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		border: 1px SaddleBrown solid;
		/* position: fixed; */
		height: var(--height);
		background-color: SaddleBrown;
		color: black;
		display: flex;
		align-items: center;
		margin: 0;
		width: 100%;
	}
	.logo a {
			text-decoration: none;
			color: PeachPuff;
		}
	.logo {
		flex-grow: 1;
		font-size: 24px;
		font-weight: bold;
		display: flex;
		justify-content: center;
		
		
	}
</style>
