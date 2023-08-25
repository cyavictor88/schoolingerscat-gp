<script lang="ts">
	import Route from '$lib/components/Route/Route.svelte';
	import { rootRoute, type IRoute, getSiteRootRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';

	let route: IRoute = {label:'none'};
	import { browser } from '$app/environment';
	if(browser){
		route = getSiteRootRoute(window.location.hostname==='localhost');
	}
	let routeBgColor: string = 'lightgrey';
	$: if (route) route.open = true;
</script>

<div style="padding: 8px;">
	<img style="height: 150px;" src="/images/title.jpg" alt="" />
	<p>
		Hi, I use this site to share my notes on EE subjects. It is NOT a textbook, the goal is to help
		understand the core idea.
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
</div>

<style>
</style>
