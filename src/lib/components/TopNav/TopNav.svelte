<!-- TopNavbar.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
	import Routes from '../Routes/Routes.svelte';
  export let topBarHeight = 60;
</script>

<div class="top-navbar" style="--height: {topBarHeight}px;">

	<div class="logo"><a href='{base}/'>Schoolinger's Cat</a></div>
	<Routes />
  <!-- <nav style="padding:4px;">
    <a href='{base}/hello'>hello</a>
    <a href='{base}/freeDraw'>threejs</a>
    <a href='{base}/pixi'>pixi</a>
	</nav> -->
	<!-- Add any additional content you want in the top navbar -->
</div>

<style>
	.top-navbar {
		border: 1px red solid;
		/* position: fixed; */

		height: var(--height);
		background-color: #b4f6a4;
		color: black;
		display: flex;
		align-items: center;
		padding: 0 10px;
		margin: 0;
		width: 100%;

	}
	.logo a {
			text-decoration: none;
		}

	.logo {
		font-size: 24px;
		font-weight: bold;
	}
</style>
