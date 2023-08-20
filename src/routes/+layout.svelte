<script>
	import TopNav from '$lib/components/TopNav/TopNav.svelte';
	import { topBarHeight } from '$lib/store';
  let sideBarWidth = 0;
</script>

<TopNav />
<!-- <SideNav {topBarHeight} {sideBarWidth} /> -->
<div id="content" style="top:{$topBarHeight}px; 
                          left:{sideBarWidth}px; 
                          width:calc(100vw - {sideBarWidth}px;
                          max-height: calc(100vh - {$topBarHeight}px);
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
		background-color: rgb(222, 207, 207);
		padding: 2px;
		overflow-y: scroll;
		z-index: 0;
	}
</style>
