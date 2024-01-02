<script lang='ts'>
	import { onMount, afterUpdate } from "svelte";
	import Toggle from "../../Toggle.svelte";

	let grandDiv: HTMLDivElement;
	let canvasHeight: number = 0;
  onMount(()=>{
    canvasHeight = grandDiv.clientHeight;

  })
  $: {
    console.log('canvasHeight',canvasHeight)
  }
  let offsetHeight = 0;
  let offsetWidth=0;
  let offsetLeft=0;
  let offsetTop=0;

  let mapContainer: HTMLDivElement;
  let map_offset = 0;
  afterUpdate(() => {
  map_offset = mapContainer.offsetTop;
});
</script>

<p>offsetHeight{offsetHeight},offsetWidth{offsetWidth},map_offset{map_offset}</p>
{#if mapContainer}
<p>offsetHeight{mapContainer.clientHeight},offsetWidth{mapContainer.offsetWidth},top{mapContainer.offsetTop},left{mapContainer.offsetLeft}</p>
{/if}
<div bind:this={grandDiv} bind:clientHeight={canvasHeight}
	style="position: relative; width:1004px; display:flex; flex-flow: row wrap; border: 1px solid blue"
>
<canvas  bind:clientHeight={canvasHeight} />
<div style="position: relative;">
  <Toggle>
    <div  bind:offsetHeight={offsetHeight} bind:offsetWidth={offsetWidth}>{offsetHeight},{offsetWidth}</div>
    <p>hihi</p>
    <p>hihi</p>
    <p>hihi</p>
  </Toggle>
  <div bind:this={mapContainer}>
    hello
  </div>
</div>

</div>	
<style>
canvas {
  border: 1px solid yellow;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  /* width: 1000px; */
  /* height: var(--post-height); */
  width:100%; 
  height:100%;
  /* z-index:0; */
}
</style>