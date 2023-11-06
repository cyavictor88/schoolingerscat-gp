<script lang="ts">
	import Route from '$lib/components/Route/Route.svelte';
	import { rootRoute, type IRoute, getSiteRootRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';

	let route: IRoute;
	import { browser } from '$app/environment';
	import { SITE_COLOR } from '$lib/theme/colors';
	import Latex from '$lib/components/Latex/Latex.svelte';
	if(browser){
		route = getSiteRootRoute(window.location.hostname === 'localhost' || location.hostname.includes("127.0.0.1"));
	}
	let routeBgColor: string = SITE_COLOR.IndexSectionRouteBG;
	$: if (route) route.open = true;

	import { Universe } from '$lib/components/Home/Universe';

	let divEmail: HTMLDivElement;
	let universe: Universe;

	onMount(() => {
		universe = new Universe(divEmail);
			universe.start();
			universe.dispatchEvent({type:'setMathMeshes',target:universe})

			return ()=>{
				if (divEmail.firstChild) divEmail.removeChild(divEmail.firstChild);
			}
	});

</script>

<div style="padding: 8px;">
	<img style="height: 150px;" src="/images/catSit.jpg" alt="" />
	<p>
		Meow, Schoolinger's Cat hope to help people(and myself) understand various subjects by explaining the way I understand them.
	</p>
	<p>
		It is NOT a textbook, the mathematical languages are not the most accurate. The core idea is to grasp the concept first, and if interested, can pursuit further in depth.
	</p>
	<span>Prerequisite: Calc 2 and basic Linear Algebra</span>
	<div style="background-color: lightgrey;">
		<hr />
		<h4>Site Map:</h4>

		{#if route}
			<!-- <Route route={route} indent={0} bgColor={routeBgColor ?? undefined} on:mouseenter={()=>{setMouseIsOverDropdown(true)}} on:mouseleave={()=>{setMouseIsOverDropdown(false)}}/> -->
			<Route {route} indent={0} bgColor={routeBgColor ?? undefined} />
		{/if}
		<hr />
	</div>
	<p>If you'd like to give me some feedback:</p>
	<div bind:this={divEmail} />
	<img style="height: 150px;" src="/images/catHit.jpg" alt="" />
</div>

<style>
</style>
