<script>
  import Routes from '$lib/components/Routes/Routes.svelte';
	import SideNav from '$lib/components/SideNav/SideNav.svelte';
	import { topBarHeight } from '$lib/store';
	import { rootRoute } from './routes';
	import {
		beforeUpdate,
		afterUpdate,
		onMount
	} from 'svelte';
  let sideBarWidth = 200;
	onMount(()=>{

		window.addEventListener('resize', changeSizeBarWidth);
		return () => {
			window.removeEventListener('resize',changeSizeBarWidth)
		}
	});

	function changeSizeBarWidth(){
		console.log(window.outerWidth)
		if (window.outerWidth < 800) {
			sideBarWidth = 50;
		}
		else
		sideBarWidth = 200;
	}
	beforeUpdate(() => {
		changeSizeBarWidth()
	});
</script>


<!-- <SideNav {sideBarWidth} /> -->
<Routes {rootRoute} />
<div id="content" style="top:{$topBarHeight}px; 
                          left:{sideBarWidth}px; 
                          width:calc(100vw - {sideBarWidth}px;
                          max-height: calc(100vh - {$topBarHeight}px);
                          ">
  <slot />
</div>

<style>

	#content {
		position: fixed;
		height: 100%;
		background-color: #96cdf5;
		border: 1px black solid;
		padding: 4px;
		overflow-y: scroll;
	}
</style>
