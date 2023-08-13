<script lang='ts'>
	import type { IRoute } from "../Route/route";
  import Route from '$lib/components/Route/Route.svelte'
	import { onMount } from "svelte";
  export let route : IRoute | null = null;
  export let routeBgColor : string = '#b08968';
  $: if(route) route.open = true; 

</script>
<div style="background-color: {routeBgColor};">
  {#if route}
  <!-- <Route route={route} indent={0} bgColor={routeBgColor ?? undefined} on:mouseenter={()=>{setMouseIsOverDropdown(true)}} on:mouseleave={()=>{setMouseIsOverDropdown(false)}}/> -->
    <Route route={route} indent={0} bgColor={routeBgColor ?? undefined} />
  {/if}
</div>

<style>
  div{
    border-radius: 5%;
    margin: 2px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }

</style>

