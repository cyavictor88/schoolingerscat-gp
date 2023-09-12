<script lang='ts'>
  export let func: any = ()=>{};
  export let txt: any = '';
  export let color: string|number = 'blue'

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span style='color: {color}' on:click={func} on:mouseenter={func}>{txt}</span>


<style>
  	span {
		text-decoration: underline;
		cursor: pointer;
	}

</style>