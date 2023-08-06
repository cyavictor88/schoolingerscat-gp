<script lang='ts'>
	import type { Route } from "./routes";
  import { base } from '$app/paths';
  export let label: string | null = null;
  export let path: string | null = null;  
  export let subRoutes: Route[] = [];
  export let indent = 0;
  export let open = true;
  export let toggleMenu: any = ()=>{};
  function toggleOpen() {
		open = !open;
	}
  let downTriangle = '\u{25BE}';
	let upTriangle = '\u{25B4}';
</script>

{#if label}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <h3 style="padding-left: {indent}px" on:click={toggleOpen} >
    {#if path}
      <a href={base+path} on:click={toggleMenu}>{label}</a>
    {:else}
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="javascript:;">{label}{open? upTriangle : downTriangle} </a>
    {/if}
  </h3>
{/if}
  

{#if open}
	{#each subRoutes as child}
		<svelte:self {...child} indent={indent + 12} open={false} toggleMenu={toggleMenu}/>
	{/each}
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