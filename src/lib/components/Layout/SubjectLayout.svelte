<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { getContext, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { topBarHeight } from '$lib/store';
	import { beforeUpdate, afterUpdate, onMount } from 'svelte';
	import { SITE_COLOR } from '$lib/theme/colors';
	import url from '$lib/components/Route/url';
	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import { navigating } from '$app/stores';
	// import { subjectRoute } from './route';
	import type { IRoute } from '../Route/route';
  export let subjectRoute:IRoute = {
	   label: 'place holder'
   };

	let downTriangle = '▼';
	let upTriangle = '▲';
	let leftTriangle = '◀';
	let rightTriangle = '►';
	let cross = '❎';

	const wideSideBarWidth = 180;
	const narrowSideBarWidth = 30;
	let sideBarWidth = wideSideBarWidth;
	let sideBarDivWidth : number;
	let topBox : HTMLDivElement;


	onMount(() => {
		changeSizeBarWidth();
		window.addEventListener('click', closeIfMouseNotOver);
		window.addEventListener('resize', changeSizeBarWidth);
		console.log('on mount subject layout')
		return () => {
			window.removeEventListener('resize', changeSizeBarWidth);
			window.removeEventListener('click', closeIfMouseNotOver);
		};
	});

	function changeSizeBarWidth() {
		if (window.outerWidth < 800) sideBarWidth = narrowSideBarWidth;
		else sideBarWidth = wideSideBarWidth;
	}
	const contextSectionRoute = writable(null);
	setContext('contextSectionRoute', contextSectionRoute);

	let mobileShowSide = false;
	let centerFullSide = true;

	$: {
		if (sideBarWidth > narrowSideBarWidth && mobileShowSide) {
			centerFullSide = false;
		}
		if (sideBarWidth > narrowSideBarWidth && !mobileShowSide) {
			centerFullSide = true;
		}
		if (sideBarWidth < wideSideBarWidth) {
			centerFullSide = false;
		}
	}

	let mouseIsOverDropdown = false;
	function closeIfMouseNotOver() {
		if (!mouseIsOverDropdown) {
			mobileShowSide = false;
		}
	}
	function setMouseIsOverDropdown(isOver: boolean) {
		mouseIsOverDropdown = isOver;
	}



	// force scroll to top on path change
	let prevPathname = 'init path';
	afterUpdate(()=>{
		const curPathname = $url ? ($url as URL).pathname : 'no path'
		if (curPathname !==prevPathname ) {
			// console.log('path change from', prevPathname ,'to', curPathname);
			prevPathname = curPathname;
			topBox.scrollIntoView();
		}
	})

	// for resetting section route in case where a page got no section route
	$: if($navigating) {
		const contextSectionRoute = getContext<Writable<IRoute|null>>('contextSectionRoute');
		let hideSectionRoute = true;
		$contextSectionRoute?.subRoutes?.forEach((route)=>{
			if(route.path === $navigating!.to?.route.id) hideSectionRoute = false;
		})
		const sectionRouteLabel = $contextSectionRoute?.label.toLowerCase().split(' ').join('');
		const navigateTo = $navigating.to?.route.id?.split('/').reverse()[0].toLowerCase();
		if( sectionRouteLabel === navigateTo) hideSectionRoute = false;
		if(hideSectionRoute) contextSectionRoute.set(null);
	};

</script>
<div bind:this={topBox}></div>
	

{#if mobileShowSide}
	<div in:fly={{ y: 200, duration: 500 }} out:fade
		style="position: fixed; background-color: {SITE_COLOR.LayoutFSMobileRouteBG}; z-index:2;box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;"
	>
		<div style="display:flex; flex-flow:row nowrap; justify-content: space-between;">
			<button
				on:click={() => {
					mobileShowSide = !mobileShowSide;
				}}>{mobileShowSide ? upTriangle : downTriangle}</button
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<p
				style="margin:0; cursor:pointer;"
				on:click={() => {
					mobileShowSide = false;
				}}
			>
				{cross}
			</p>
		</div>
		<p>Current Subject:</p>
		<SideBar route={subjectRoute} />
		{#if $contextSectionRoute}
			<p>Current Section:</p>
			<SideBar route={$contextSectionRoute} routeBgColor={SITE_COLOR.LayoutFSSectionRouteBG} />
		{/if}
	</div>
{/if}

<div style="display:flex; flex-flow: row nowrap; ">
	<div bind:clientWidth={sideBarDivWidth} style='position:fixed;'>
	{#if centerFullSide}
		<div in:fly={{ y: 200, duration: 1000 }} >
			<button
				on:click={() => {
					sideBarWidth = narrowSideBarWidth;
				}}>{leftTriangle}</button
			>
			<p>Current Subject:</p>
			<SideBar route={subjectRoute} />
			{#if $contextSectionRoute}
				<p>Current Section:</p>
				<SideBar route={$contextSectionRoute} routeBgColor={SITE_COLOR.LayoutFSSectionRouteBG} />
			{/if}
		</div>
	{:else if window.outerWidth < 800}
		<button
			on:click={() => {
				mobileShowSide = !mobileShowSide;
			}}
			on:mouseenter={() => {
				setMouseIsOverDropdown(true);
			}}
			on:mouseleave={() => {
				setMouseIsOverDropdown(false);
			}}
		>
			{mobileShowSide ? upTriangle : downTriangle}</button
		>
	{:else}
		<button
			on:click={() => {
				sideBarWidth = wideSideBarWidth;
			}}>{rightTriangle}</button
		>
	{/if}
</div>

	<div
		id="content"
		style="padding-left:{10+sideBarDivWidth}px; top:{$topBarHeight}px; 
                          max-height: 100%;
													height: 100%;
													min-height: calc( 100vh - {$topBarHeight+10}px);
													background-color: {SITE_COLOR.LayoutFSContentBG};
													border-bottom: 6px {SITE_COLOR.LayoutFSBorderBottom} solid;

                          "
	>
		<slot />
	</div>

</div>

<style>
	p {
		margin: 2px;
		margin-top: 10px;
	}
	#content {
		/* position: fixed; */
		
		padding: 0px 4px;
		overflow-y: scroll;
		flex-grow: 1;
	}

	button {
		background-color: #000;
		border-radius: 4px;
		border-style: none;
		box-sizing: border-box;
		color: #fff;
		cursor: pointer;
		display: inline-block;
		font-family: 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif;
		font-size: 12px;
		margin: 2px;
		height: 25px;
		width: 20px;
		padding:4px;
		outline: none;
		text-align: center;
		text-transform: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}

	button:hover,
	button:focus {
		opacity: 0.65;
	}
</style>
