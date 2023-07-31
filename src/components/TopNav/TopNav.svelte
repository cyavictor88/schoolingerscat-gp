<!-- TopNavbar.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  export let topBarHeight = 60;
</script>

<div class="top-navbar" style="--height: {topBarHeight}px;">

	<div class="logo">Schoolinger's Cat</div>
  <nav style="padding:4px;">
    <a href='{base}/'>home</a>
    <a href='{base}/hello'>hello</a>
    <a href='{base}/freeDraw'>freeDraw</a>
	</nav>
	<!-- Add any additional content you want in the top navbar -->
</div>

<style>
	.top-navbar {
		position: fixed;
		top: 0;
		height: var(--height);
		background-color: #b4f6a4;
		color: black;
		display: flex;
		align-items: center;
		padding: 0 20px;
		margin: 0;
		width: 100%;
	}

	.logo {
		font-size: 24px;
		font-weight: bold;
	}
</style>
