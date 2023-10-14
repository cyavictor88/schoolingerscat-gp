<script lang="ts">
	import type { IRoute } from './route';
	import { base } from '$app/paths';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { mixin } from 'lodash';
	import url from './url';
	import { SITE_COLOR } from '$lib/theme/colors';
	import LatexMix from '../Latex/LatexMix.svelte';
	export let route: IRoute | null = null;
	export let indent = 0;
	export let toggleMenu: any = () => {console.log('doing nothing')};
	export let bgColor: string = SITE_COLOR.CompRouteDefaultBG;
	function toggleOpenSubRoute() {
		if (route) {
			if (route.open) route.open = false;
			else route.open = true;
		}
	}

	let downTriangle = '\u{25BE}';
	let upTriangle = '\u{25B4}';
	let currentPath = '';
	if (browser) {
		currentPath = window.location.pathname;
	}
	afterNavigate(() => {
		// console.log('navigating to ', window.location.pathname);
		currentPath = window.location.pathname;
	});

	let currentHash = '';
	$: if ($url && typeof $url !== 'string') {
		currentHash = ($url as URL).hash;
	}
</script>

<div>
	{#if route}
		{#if route.label}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li style="padding-left: {indent}px; --bgColor:{bgColor}; --hoverColor:{SITE_COLOR.CompRouteHoverBG}; --hoverBarColor:{SITE_COLOR.CompRouteHoverBar};" on:click={toggleOpenSubRoute}>
				{#if route.path}
					<a
						href={base + route.path}
						style="--aColor: {SITE_COLOR.CompRouteLinkColor};"
						on:click={toggleMenu}
					>
						<span style:--bgFocus={route.path === currentPath || route.path === currentHash
							? SITE_COLOR.CompRouteFocusBG
							: ''}>
							{#if route.katexMix}
								<LatexMix mixedString={route.katexMix} />
							{:else}
								{route.label}
							{/if}
						</span>
					</a>
				{:else}
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="javascript:;" style="--aColor: {SITE_COLOR.CompRouteLinkColor};"> <span> {route.label}{route.open ? upTriangle : downTriangle}</span> </a>
				{/if}
			</li>
		{/if}

		{#if route.open && route.subRoutes}
			{#each route.subRoutes as child}
				<svelte:self route={child} indent={indent + 12} {toggleMenu} {bgColor} />
			{/each}
		{/if}
	{/if}
</div>

<style>
	div {
		border-radius: 4px;
		font: 'Fira Sans', sans-serif;
	}

	li {
		background-color: var(--bgColor);
		margin: 0px 4px;
		padding: 3px 4px;
		display: flex;
	}

	li:hover {
		background-color: var(--hoverColor);
		border-left: 4px var(--hoverBarColor) solid;
		/* border-bottom: 4px maroon solid; */
		/* text-decoration: underline; */
		/* border-radius: 4px; */
	}

	a {
		flex-grow: 1;
		white-space: nowrap;
		text-decoration: none;
		border-radius: 4px;
		color: var(--aColor);
		font-family: Georgia, serif;
	}

  span {
		border-radius: 2px;
    background: var(--bgFocus);
		padding: 2px 4px;
  }
</style>
