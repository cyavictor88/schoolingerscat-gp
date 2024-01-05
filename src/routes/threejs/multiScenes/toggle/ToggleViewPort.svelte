<script lang='ts'>
	import { slide } from 'svelte/transition';
	export let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
  {!visible? 'expand' : 'close'}
</label>

{#if visible}
	<div transition:slide={{duration:500}}>
		<slot name='text'/>
  </div>
{/if}
<slot name='viewport'/>
<p></p>


