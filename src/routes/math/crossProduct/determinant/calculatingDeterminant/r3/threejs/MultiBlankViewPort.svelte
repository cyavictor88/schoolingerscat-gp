<script lang='ts'>
	import { onMount, afterUpdate } from "svelte";
	import Toggle from "../../Toggle.svelte";
	import { Multiverse } from './Multiverse';
	import { Universe as Universe1 } from './Universe';

	let grandDiv: HTMLDivElement;
	let grandDivH: number = 0;
  onMount(()=>{
    grandDivH = grandDiv.clientHeight;

  })
  $: {
    console.log('grandDivH',grandDivH)
  }
  let offsetHeight = 0;
  let offsetWidth=0;
  let offsetLeft=0;
  let offsetTop=0;
  let canvasH = 0;

  let uni1Div: HTMLDivElement;
  let uni1OffsetTop = 0;
  afterUpdate(() => {
    uni1OffsetTop = uni1Div.offsetTop;
  });
</script>

<p>offsetHeight{offsetHeight},offsetWidth{offsetWidth},uni1OffsetTop{uni1OffsetTop},gdh,{grandDivH},ch,{canvasH}</p>
{#if uni1Div}
<p>uni1Div: offsetHeight{uni1Div.clientHeight},offsetWidth{uni1Div.offsetWidth},top{uni1Div.offsetTop},left{uni1Div.offsetLeft}</p>
{/if}
<div bind:this={grandDiv} bind:clientHeight={grandDivH}
	style="position: relative; width:1004px; display:flex; flex-flow: row wrap; border: 1px solid blue"
>
<canvas bind:offsetHeight={canvasH} />
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