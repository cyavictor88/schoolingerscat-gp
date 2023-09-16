<script lang='ts'>
  export let hLevel: number = 1;
  export let id: string = 'null';
  export let backgroundColor : string = '';
  import { afterNavigate } from "$app/navigation";
  let showHighlight = false;
  afterNavigate(()=>{
    const path =  window.location.pathname.split('#');
    showHighlight = path[path.length-1] === id;
  })
</script>
<div class:highlight={showHighlight} style='background-color: {backgroundColor};'>
{#if hLevel === 1}
	<h1 id={id}><slot/></h1>
{:else if hLevel === 2}
  <h2 id={id}><slot/></h2>
{:else if hLevel === 3}
  <h3 id={id}><slot/></h3>
{:else if hLevel === 4}
  <h4 id={id}><slot/></h4>
{:else if hLevel === 5}
  <h5 id={id}><slot/></h5>
{:else}
	<p id={id}><slot /></p>
{/if}
</div>

<style>
  .highlight {
    background-color: green;
  }

</style>