<script lang='ts'>
	import type { IRoute } from "./route";
  import { base } from '$app/paths';
	import { beforeUpdate, afterUpdate } from "svelte";
  import { navigating } from '$app/stores';
  import { browser } from '$app/environment'
	import { afterNavigate } from "$app/navigation";
	import { mixin } from "lodash";
	import KatexMix from "../Katex/KatexMix.svelte";
  import url from './url';
  export let route: IRoute | null = null;
  export let indent = 0;
  export let toggleMenu: any = ()=>{};
  export let bgColor :string = 'lightblue'; 
  function toggleOpen() {
    if(route){
      if(route.open) route.open = false;
      else route.open = true
    }
	}

  let downTriangle = '\u{25BE}';
	let upTriangle = '\u{25B4}';
  let currentPath = '';
  if(browser){
    currentPath = window.location.pathname
  }
  afterNavigate(()=>{
    console.log('navigating to ',window.location.pathname)
    currentPath = window.location.pathname;
  })

  let currentHash = '';
  $: if($url && typeof $url !== 'string' ) {
    currentHash = ($url as URL).hash;
  }
  


</script>
{#if route}

  {#if route.label}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <h4 style="padding-left: {indent}px" style:--bgColor={bgColor} on:click={toggleOpen} >
      {#if route.path}
        <a href={base+route.path} style:--bg-1={route.path === currentPath || route.path===currentHash? 'LavenderBlush' : ''} on:click={toggleMenu}>
          {#if route.katexMix}
            <KatexMix mixedString={route.katexMix}/>
          {:else}
            {route.label}
          {/if}
        </a>
      {:else}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="javascript:;">{route.label}{route.open? upTriangle : downTriangle} </a>
      {/if}
    </h4>
  {/if}
    
  {#if route.open && route.subRoutes }
      {#each route.subRoutes as child}
        <svelte:self route={child} indent={indent + 12} toggleMenu={toggleMenu} bgColor={bgColor}/>
      {/each}
  {/if}


{/if}
<style>

  h4 {
    background-color: var(--bgColor);
    margin: 0;
    padding-right: 4px;
  }

  h4:hover {
    background-color:lightgoldenrodyellow;
  }

  a {
    background: var(--bg-1);
    white-space: nowrap;
  }


</style>