<script lang="ts">
	import Route from '$lib/components/Route/Route.svelte';
	import { rootRoute, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	let route: IRoute = rootRoute;
	let routeBgColor: string = 'lightgrey';
	$: if (route) route.open = true;
</script>

<p>
  <img style="height: 150px;" src="/images/title.jpg" alt='' />
	Hi, this site is at its infancy, I plan to use this site to share my notes on various
	EE/math/physics subjects.
</p>
<div>
	<hr />
	{#if route}
		<!-- <Route route={route} indent={0} bgColor={routeBgColor ?? undefined} on:mouseenter={()=>{setMouseIsOverDropdown(true)}} on:mouseleave={()=>{setMouseIsOverDropdown(false)}}/> -->
		<Route {route} indent={0} bgColor={routeBgColor ?? undefined} />
	{/if}
	<hr />
</div>

<style>
</style>
