<script lang="ts">
	import type { IRoute } from './route';
	import { base } from '$app/paths';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { mixin } from 'lodash';
	import KatexMix from '../Katex/KatexMix.svelte';
	import url from './url';
	export let route: IRoute | null = null;
	export let indent = 0;
	export let toggleMenu: any = () => {console.log('doing nothing')};
	export let bgColor: string = 'lightblue';
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
		console.log('navigating to ', window.location.pathname);
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
			<li style="padding-left: {indent}px" style:--bgColor={bgColor} on:click={toggleOpenSubRoute}>
				{#if route.path}
					<a
						href={base + route.path}
						on:click={toggleMenu}
					>
						<span style:--bg-1={route.path === currentPath || route.path === currentHash
							? '#e6ccb2'
							: ''}>
							{#if route.katexMix}
								<KatexMix mixedString={route.katexMix} />
							{:else}
								{route.label}
							{/if}
						</span>
					</a>
				{:else}
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="javascript:;"> <span> {route.label}{route.open ? upTriangle : downTriangle}</span> </a>
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
		background-color: #ede0d4;
		border-left: 4px maroon solid;
		/* border-bottom: 4px maroon solid; */
		/* text-decoration: underline; */
		/* border-radius: 4px; */
	}

	a {
		flex-grow: 1;
		white-space: nowrap;
		text-decoration: none;
		border-radius: 4px;
		color: #3F2E3E;
		font-family: Georgia, serif;
	}

  span {
		border-radius: 2px;
    background: var(--bg-1);
		padding: 2px 4px;
  }
</style>
