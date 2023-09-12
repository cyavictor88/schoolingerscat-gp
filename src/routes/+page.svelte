<script lang="ts">
	import Route from '$lib/components/Route/Route.svelte';
	import { rootRoute, type IRoute, getSiteRootRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';

	let route: IRoute;
	import { browser } from '$app/environment';
	import { SITE_COLOR } from '$lib/theme/colors';
	import Latex from '$lib/components/Latex/Latex.svelte';
	if(browser){
		route = getSiteRootRoute(window.location.hostname === 'localhost');
	}
	let routeBgColor: string = SITE_COLOR.IndexPageRouteBG;
	$: if (route) route.open = true;
</script>

<div style="padding: 8px;">
	<img style="height: 150px;" src="/images/title.jpg" alt="" />
	<p>
		Hi, The goal of Schoolingers Cat is to help myself to have better understanding on various subjects by explaining the way I understand them.
	</p>
	<p>
		It is NOT a textbook, the mathmetical languages are not the most accurate. The core idea is to grasp the concept first, and if interested, can pursuit further in depth.
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
	<p>If you like to give me some feedback:  schoolingerscat <Latex math={'@'} /> <Latex math={' g\\Mu\\alpha\\iota \\lfloor'} /> <Latex math={'\\cdot \\subset \\varnothing \\Mu'} /></p>
</div>

<style>
</style>
