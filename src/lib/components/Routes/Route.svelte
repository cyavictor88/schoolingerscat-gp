<script lang='ts'>
	import type { Route } from "./routes";
  export let label: string | null = null;
  export let path: string | null = null;  
  export let subRoutes: Route[] = [];
  export let indent = 0;
  export let open = true;
  function toggleOpen() {
		open = !open;
	}
</script>

{#if label}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <h3 style="padding-left: {indent}px" on:click={toggleOpen} >
    {#if path}
    <a href={path}>a:{label}</a>
    {:else}
    <!-- svelte-ignore a11y-invalid-attribute -->
      {#if !open}
        <a href="javascript:;">p:{label}&blacktriangledown;</a>
      {:else}
        <a href="javascript:;">p:{label}&blacktriangle;</a>
      {/if}
    {/if}
  </h3>
{/if}
  

{#if open}
	{#each subRoutes as child}
		<svelte:self {...child} indent={indent + 24} open={false}/>
	{/each}
{/if}


<style>
  h3 {
    background-color: aqua;
  }
</style>