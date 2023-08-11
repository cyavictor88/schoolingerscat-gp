<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import { topBarHeight } from '$lib/store';
	import { beforeUpdate, afterUpdate, onMount } from 'svelte';

	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import { rootRoute } from './route';
	let downTriangle = '▼';
	let upTriangle = '▲';
	let leftTriangle = '◀';
	let rightTriangle = '►';
	let cross = '❎';

	const wideSideBarWidth = 180;
	const narrowSideBarWidth = 30;
	let sideBarWidth = wideSideBarWidth;

	onMount(() => {
		changeSizeBarWidth();
		window.addEventListener('resize', changeSizeBarWidth);
		return () => {
			window.removeEventListener('resize', changeSizeBarWidth);
		};
	});

	function changeSizeBarWidth() {
		if (window.outerWidth < 800) sideBarWidth = narrowSideBarWidth;
		else sideBarWidth = wideSideBarWidth;
	}
	const innerPageRoute = writable(rootRoute);
	setContext('innerPageRoute', innerPageRoute);

	let showSide = false;
	let displayModeFullSide = true;

	$: {
		if (sideBarWidth > narrowSideBarWidth && showSide) {
			displayModeFullSide = false;
		}
		if (sideBarWidth > narrowSideBarWidth && !showSide) {
			displayModeFullSide = true;
		}
		if (sideBarWidth < wideSideBarWidth) {
			displayModeFullSide = false;
		}
	}

	let mouseIsOverDropdown = false;
	function closeIfMouseNotOver() {
		if (!mouseIsOverDropdown) {
			showSide = false;
		}
	}
	function setMouseIsOverDropdown(isOver: boolean) {
		mouseIsOverDropdown = isOver;
	}
	onMount(()=>{
		window.addEventListener('click', closeIfMouseNotOver);
		return () => {
			window.removeEventListener('click',closeIfMouseNotOver)
		}
	});
</script>

{#if showSide}
	<div
		style="position: fixed; background-color:lightgrey; z-index:2;box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;"
	>
		<div style="display:flex; flex-flow:row nowrap; justify-content: space-between;">
			<button
				on:click={() => {
					showSide = !showSide;
				}}>{showSide ? upTriangle : downTriangle}</button
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<p
				style="margin:0; cursor:pointer;"
				on:click={() => {
					showSide = false;
				}}
			>
				{cross}
			</p>
		</div>
		<SideBar route={rootRoute} />
		<p></p>
		<SideBar route={$innerPageRoute} routeBgColor={'cyan'} />
	</div>
{/if}

<div style="display:flex; flex-flow: row nowrap; ">
	{#if displayModeFullSide}
		<div>
			<button
				on:click={() => {
					sideBarWidth = narrowSideBarWidth;
				}}>{leftTriangle}</button
			>
			<SideBar route={rootRoute} />
			<p />
			<SideBar route={$innerPageRoute} routeBgColor={'cyan'} />
		</div>
	{:else if window.outerWidth < 800}
		<button
			on:click={() => {
				showSide = !showSide;
			}}
			on:mouseenter={() => {
				setMouseIsOverDropdown(true);
			}}
			on:mouseleave={() => {
				setMouseIsOverDropdown(false);
			}}
		>
			{showSide ? upTriangle : downTriangle}</button
		>
	{:else}
		<button
			on:click={() => {
				sideBarWidth = wideSideBarWidth;
			}}>{rightTriangle}</button
		>
	{/if}

	<!-- <SideNav {sideBarWidth} /> -->
	<div
		id="content"
		style="top:{$topBarHeight}px; 
                          max-height: calc(100vh - {$topBarHeight}px);
													height: calc(100vh - {$topBarHeight}px);
                          "
	>
		<slot />
	</div>
</div>

<style>
	#content {
		/* position: fixed; */
		background-color: LightSteelBlue;
		border: 1px black solid;
		padding: 0px 4px;
		overflow-y: scroll;
		flex-grow: 1;
	}

	button {
		background-color: #e1ecf4;
		border-radius: 3px;
		border: 1px solid #7aa7c7;
		box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
		box-sizing: border-box;
		color: #39739d;
		cursor: pointer;
		display: inline-block;
		font-family: -apple-system, system-ui, 'Segoe UI', 'Liberation Sans', sans-serif;
		font-size: 13px;
		font-weight: 400;
		line-height: 1.15385;
		margin: 0;
		outline: none;
		position: relative;
		text-align: center;
		text-decoration: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		vertical-align: baseline;
		white-space: nowrap;
		height:20px;
	}

	button:hover,
	button:focus {
		background-color: #b3d3ea;
		color: #2c5777;
	}

	button:focus {
		box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
	}

	button:active {
		background-color: #a0c7e4;
		box-shadow: none;
		color: #2c5777;
	}
</style>
