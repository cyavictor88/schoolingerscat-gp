<script lang='ts'>
	import type { Route } from "./routes";
  import { base } from '$app/paths';
  // export let label: string | null = null;
  // export let path: string | null = null;  
  // export let subRoutes: Route[] = [];
  export let route: Route | null = null;
  export let indent = 0;
  export let open = true;
  export let toggleMenu: any = ()=>{};
  let nextOpen = false;
  function toggleOpen() {
		open = !open;
	}
  function openRoute(opendPath: string | null){
    if(opendPath){
    }
  }
  let downTriangle = '\u{25BE}';
	let upTriangle = '\u{25B4}';


</script>

{#if route}

{#if route.label}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <h3 style="padding-left: {indent}px" on:click={toggleOpen} >
    {#if route.path}
      <a href={base+route.path} on:click={toggleMenu}>{route.label}</a>
    {:else}
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="javascript:;">{route.label}{open? upTriangle : downTriangle} </a>
    {/if}
  </h3>
{/if}
  

{#if open && route.subRoutes}
	{#each route.subRoutes as child}

		<svelte:self {route} indent={indent + 12} open={nextOpen} toggleMenu={toggleMenu}/>
	{/each}
{/if}


{/if}

<style>
  h3 {
    background-color: aqua;
    margin: 0;
  }

  h3:hover {
    background-color:rgb(0, 224, 224);
  }


</style>