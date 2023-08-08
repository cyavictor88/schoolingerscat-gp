<script>
	import { writable } from 'svelte/store';
  import { setContext } from 'svelte';


	import { topBarHeight } from '$lib/store';
	import {
		beforeUpdate,
		afterUpdate,
		onMount
	} from 'svelte';

	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import { rootRoute } from './route';
  let sideBarWidth = 200;
	onMount(()=>{

		window.addEventListener('resize', changeSizeBarWidth);
		return () => {
			window.removeEventListener('resize',changeSizeBarWidth)
		}
	});

	function changeSizeBarWidth(){
		if (window.outerWidth < 800) {
			sideBarWidth = 50;
		}
		else
		sideBarWidth = 200;
	}
	beforeUpdate(() => {
		changeSizeBarWidth()
	});

	const innerPageRoute = writable(rootRoute);
  setContext('innerPageRoute', innerPageRoute);
	$: {console.log($innerPageRoute)}
</script>

<SideBar route={rootRoute}/>
<p></p>
<SideBar route={$innerPageRoute}/>
<!-- <SideNav {sideBarWidth} /> -->
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
