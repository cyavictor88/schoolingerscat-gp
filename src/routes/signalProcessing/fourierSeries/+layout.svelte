<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
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
	onMount(() => {
		window.addEventListener('click', closeIfMouseNotOver);
		return () => {
			window.removeEventListener('click', closeIfMouseNotOver);
		};
	});
</script>

{#if showSide}
	<div in:fly={{ y: 200, duration: 500 }} out:fade
		style="position: fixed; background-color: #6c584c; z-index:2;box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;"
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
		<p />
		<SideBar route={$innerPageRoute} routeBgColor={'#ddb892'} />
	</div>
{/if}

<div style="display:flex; flex-flow: row nowrap; ">
	{#if displayModeFullSide}
		<div in:fly={{ y: 200, duration: 1000 }} >
			<button
				on:click={() => {
					sideBarWidth = narrowSideBarWidth;
				}}>{leftTriangle}</button
			>
			<SideBar route={rootRoute} />
			<p />
			<SideBar route={$innerPageRoute} routeBgColor={'#ddb892'} />
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
		background-color: #e7d8c9;
		border: 1px black solid;
		padding: 0px 4px;
		overflow-y: scroll;
		flex-grow: 1;
	}

	button {
		background-color: #222;
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
		opacity: 0.75;
	}
</style>
