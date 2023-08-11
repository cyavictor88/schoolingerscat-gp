<script lang='ts'>
	import type { IRoute } from "../Route/route";
  import Route from '$lib/components/Route/Route.svelte'
	import { onMount } from "svelte";
  export let route : IRoute | null = null;
  export let routeBgColor : string | null = null;
  $: if(route) route.open = true; 

</script>
{#if route}
<!-- <Route route={route} indent={0} bgColor={routeBgColor ?? undefined} on:mouseenter={()=>{setMouseIsOverDropdown(true)}} on:mouseleave={()=>{setMouseIsOverDropdown(false)}}/> -->
  <Route route={route} indent={0} bgColor={routeBgColor ?? undefined} />
{/if}

