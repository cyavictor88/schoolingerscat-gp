<script>
  let cnt = 0;
  function increment() {
		cnt += 1;
	}
</script> 


<h1>Welcome to SvelteKit b</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={increment}>add 1</button>
<h1>{cnt}</h1>

<style>
  h1 {
    color: green;
  }
</style>