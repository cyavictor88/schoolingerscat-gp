<script lang='ts'>
  export let hLevel: number = 1;
</script>

{#if hLevel === 1}
	<h1><slot/></h1>
{:else if hLevel === 2}
  <h2><slot/></h2>
{:else if hLevel === 3}
  <h3><slot/></h3>
{:else if hLevel === 4}
  <h4><slot/></h4>
{:else if hLevel === 5}
  <h5><slot/></h5>
{:else}
	<p><slot /></p>
{/if}
