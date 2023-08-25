<script>
	import TopNav from '$lib/components/TopNav/TopNav.svelte';
	import { topBarHeight } from '$lib/store';
	import { SITE_COLOR } from '$lib/theme/colors';
  let sideBarWidth = 0;
</script>

<TopNav />
<div id="content" style="top:{$topBarHeight}px; 
                          left:{sideBarWidth}px; 
                          width:calc(100vw - {sideBarWidth}px;
                          max-height: calc(100vh - {$topBarHeight}px);
													--bg: {SITE_COLOR.SiteLayoutContentBG}
                          ">
  <slot />
</div>

<style>
	:global(body) { /* this will apply to <body> */
		margin: 0; 
		padding: 0; 
		font-family: Arial, Helvetica, sans-serif; 


	}
	#content {
		position: fixed;
		height: 100%;
		background-color: var(--bg);
		padding: 2px;
		overflow-y: scroll;
		z-index: 0;
	}
</style>
