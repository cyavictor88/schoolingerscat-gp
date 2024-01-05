<script lang='ts'>
	import { onMount } from "svelte";
  import {try2} from './multiVerse/try2';

	let boxElem: HTMLSpanElement;
	let pyramidElem: HTMLSpanElement;
	let canvas: HTMLCanvasElement;

  // $: if(divMultiScenes && canvasMultiScenes){
   
  // }
  onMount(()=>{
    try2(canvas,boxElem,pyramidElem);
  })
</script>


<canvas id="c" bind:this={canvas}></canvas>
<p>
  <span id="box" class="diagram left" bind:this={boxElem}></span>
  I love boxes. Presents come in boxes.
  When I find a new box I'm always excited to find out what's inside.
</p>
<p>
  <span id="pyramid" class="diagram right" bind:this={pyramidElem}></span>
  When I was a kid I dreamed of going on an expedition inside a pyramid
  and finding a undiscovered tomb full of mummies and treasure.
</p>


<style>
  #c {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
  }
  .diagram {
    display: inline-block;
    width: 5em;
    height: 3em;
    border: 1px solid black;
  }
  .left {
    float: left;
    margin-right: .25em;
  }
  .right {
    float: right;
    margin-left: .25em;
  }

</style>