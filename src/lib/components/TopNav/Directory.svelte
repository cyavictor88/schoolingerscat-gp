<script lang="ts">
	import { rootRoute as siteRootRoute, getSiteRootRoute, setOpenedPath, type IRoute } from '../Route/route';
	import { onMount } from 'svelte';
	import Route from '../Route/Route.svelte';
	import { browser } from '$app/environment';
	import { SITE_COLOR } from '$lib/theme/colors';
	let rootRoute : IRoute = {label:'none'};
	if(browser){
		rootRoute = getSiteRootRoute(window.location.hostname==='localhost' || location.hostname.includes("127.0.0.1"));
	}
	let open = false;
	function toggleOpen() {
		open = !open;
	}

	let mouseIsOverDropdown = false;
	function setMouseIsOverDropdown(isOver:boolean) {
		mouseIsOverDropdown = isOver;
	}

	let downTriangle = '\u{25BE}';
	let upTriangle = '\u{25B4}';
	let cross = '\u{274E}';
	function closeIfMouseNotOver(){
		if(!mouseIsOverDropdown) {
			open = false;
		}
	}

	function setOpenedPathAndToogleOpen(){
		setOpenedPath(rootRoute, window.location.pathname);
		rootRoute.open = true;
		toggleOpen();
	}
	onMount(()=>{
		window.addEventListener('click', closeIfMouseNotOver);
		return () => {
			window.removeEventListener('click',closeIfMouseNotOver)
		}
	});



</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='dropdown'  tabindex="0" role="button" aria-pressed="false" style="--color: {SITE_COLOR.CompTopNavDirectory}"
 on:mouseenter={()=>{setMouseIsOverDropdown(true)}} on:mouseleave={()=>{setMouseIsOverDropdown(false)}}>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		
	<p on:click={setOpenedPathAndToogleOpen}>Directory{!open? downTriangle : upTriangle }</p>

	{#if open}
		<div class='dropdown-content' style="--color: {SITE_COLOR.CompTopNavDirectory}">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div id='close' on:click={toggleOpen}><p>{cross}</p></div>
			<Route route={rootRoute} indent={0} toggleMenu={toggleOpen} bgColor={'gold'}/>
		</div>
	{/if}
</div>

<style>
	p {
		margin: 0px;
	}
	.dropdown {
		background-color: var(--color);
		border-radius: 3px;
		cursor: pointer;
		padding: 0px;
		border: 1px var(--color) solid;
		margin-left: 5px;
	}
  .dropdown-content {
    display: block;
    position: absolute;
    background-color: var(--color);
    min-width: 160px;
		box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    z-index: 2;
}
	div:hover {
		box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	}

  #close:hover {
    border: none;
  }
  #close {
    width: 100%;
  }

  #close p {
    float: right;
  }
</style>
