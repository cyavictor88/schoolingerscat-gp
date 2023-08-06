<script>
  let cnt = 0;
  function increment() {
		cnt += 1;
	}
</script> 


<h1>Welcome to Schoolinger's Cat</h1>
<button on:click={increment}>add 1</button>
<h1>{cnt}</h1>

<style>
  h1 {
    color: green;
  }
</style>