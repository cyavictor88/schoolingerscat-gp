<script lang='ts'>
	import type { Route } from "./routes";
  import { base } from '$app/paths';
  // export let label: string | null = null;
  // export let path: string | null = null;  
  // export let subRoutes: Route[] = [];
  export let route: Route | null = null;
  export let indent = 0;
  // export let open = false;
  export let toggleMenu: any = ()=>{};
  function toggleOpen() {
    if(route){
      if(route.open) route.open = false;
      else route.open = true
    }
	}

  let downTriangle = '\u{25BE}';
	let upTriangle = '\u{25B4}';


</script>

{#if route}

  {#if route.label}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <h4 style="padding-left: {indent}px" on:click={toggleOpen} >
      {#if route.path}
        <a href={base+route.path} style:--bg-1={route.path === window.location.pathname ? 'lime' : ''} on:click={toggleMenu}>{route.label}</a>
      {:else}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="javascript:;">{route.label}{route.open? upTriangle : downTriangle} </a>
      {/if}
    </h4>
  {/if}
    
  {#if route.open && route.subRoutes }
      {#each route.subRoutes as child}
        <svelte:self route={child} indent={indent + 12} toggleMenu={toggleMenu}/>
      {/each}
  {/if}


{/if}

<style>
  h4 {
    background-color: aqua;
    margin: 0;
  }

  h4:hover {
    background-color:rgb(0, 224, 224);
  }

  a {
    background: var(--bg-1);
  }


</style>