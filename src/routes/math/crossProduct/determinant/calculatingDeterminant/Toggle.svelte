<script lang='ts'>
	import { slide } from 'svelte/transition';
	let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
  {!visible? 'expand' : 'close'}
</label>

{#if visible}
	<div transition:slide={{duration:500}}>
		<slot />
  </div>
{/if}
<p></p>
