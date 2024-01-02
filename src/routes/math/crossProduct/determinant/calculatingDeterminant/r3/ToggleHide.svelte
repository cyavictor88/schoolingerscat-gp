<script lang='ts'>
	import { slide } from 'svelte/transition';
	export let visible = false;
</script>
<div style="width:500px; height:400px;" >
<label>
	<input type="checkbox" bind:checked={visible} />
  {!visible? 'expand' : 'close'}
</label>

<!-- {#if visible} -->
	<!-- <div transition:slide={{duration:500}} style={visible? 'width:500px; height:400px;': 'width:1px;height:1px;'}> -->
		<div transition:slide={{duration:500}} >
		<slot />
  </div>
<!-- {/if} -->
<p></p>
</div>
