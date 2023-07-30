<script>
	import SideNav from '../components/SideNav/SideNav.svelte';
	import TopNav from '../components/TopNav/TopNav.svelte';
  let topBarHeight = 40;
  let sideBarWidth = 200;

</script>


<TopNav {topBarHeight} />
<SideNav {topBarHeight} {sideBarWidth} />
<div id="content" style="top:{topBarHeight}px; 
                          left:{sideBarWidth}px; 
                          width:calc(100vw - {sideBarWidth}px;
                          max-height: calc(100vh - {topBarHeight}px);
                          ">
  <slot />
</div>

<style>

	#content {
		position: fixed;
		height: 100%;
		background-color: #96cdf5;
		border: 1px black solid;
		padding: 0px;
		overflow-y: scroll;
	}
</style>
