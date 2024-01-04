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

  let uni1Div: HTMLDivElement;
  let map_offset = 0;
  afterUpdate(() => {
  map_offset = uni1Div.offsetTop;
});
</script>

<p>offsetHeight{offsetHeight},offsetWidth{offsetWidth},map_offset{map_offset},ch,{canvasHeight}</p>
{#if uni1Div}
<p>offsetHeight{uni1Div.clientHeight},offsetWidth{uni1Div.offsetWidth},top{uni1Div.offsetTop},left{uni1Div.offsetLeft}</p>
{/if}
<div bind:this={grandDiv} bind:clientHeight={canvasHeight}
	style="position: relative; width:1004px; display:flex; flex-flow: row wrap; border: 1px solid blue"
>
<canvas  />
<div style="position: relative;">
  <Toggle>
    <div  bind:offsetHeight={offsetHeight} bind:offsetWidth={offsetWidth}>{offsetHeight},{offsetWidth}</div>
    <p>hihi</p>
    <p>hihi</p>
    <p>hihi</p>
  </Toggle>
  <div bind:this={uni1Div}>
    <Toggle >
      <div>
        hello
      </div>
    </Toggle>
  </div>

</div>

</div>	
<style>
canvas {
  border: 4px solid yellow;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  /* width: 1000px; */
  /* height: var(--post-height); */
  width:100%; 
  height:100%;
  /* z-index:0; */
}
</style>