<script lang='ts'>
	import type { IRoute } from "../Route/route";
  import Route from '$lib/components/Route/Route.svelte'
  export let route : IRoute | null = null;
  $: if(route) route.open = true; 
</script>
{#if route}
<Route route={route} indent={0}  />
{/if}