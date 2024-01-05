
<script lang='ts'>
	import { onMount } from "svelte";
  import {try3} from './multiVerse/try3';

	let boxElem: HTMLSpanElement;
	let pyramidElem: HTMLSpanElement;
	let canvas: HTMLCanvasElement;

  // $: if(divMultiScenes && canvasMultiScenes){
   
  // }
  onMount(()=>{
    try3(canvas,boxElem,pyramidElem);
  })
</script>
<div style='position: relative; padding: 4px; border: 3px solid cyan; height: 300px;width:300px;'>
<canvas id="c" bind:this={canvas} style='border: 3px solid yellow' ></canvas>
<span data-diagram="box" class="left" bind:this={boxElem} on:click={()=>console.log('hi')}></span>
<span data-diagram="pyramid" class="right" bind:this={pyramidElem}></span>

    <!-- <p>
      <span data-diagram="box" class="left" bind:this={boxElem} on:click={()=>console.log('hi')}></span>
      I love boxes. Presents come in boxes.
      When I find a new box I'm always excited to find out what's inside.
    </p>
    <p>
      <span data-diagram="pyramid" class="right" bind:this={pyramidElem}></span>
      When I was a kid I dreamed of going on an expedition inside a pyramid
      and finding a undiscovered tomb full of mummies and treasure.
    </p> -->
  </div>


<style>
  #c {
  position:absolute;
  /* left: 0; */
  /* top: 0; */
  /* width: 100%; */
  /* height: 100%; */
  /* display: block; */
  background-color: green;
  /* z-index:0; */
}
*[data-diagram] {
  display: inline-block;
  width: 5em;
  height: 3em;
}
.left {
  float: left;
  margin-right: .25em;
}
.right {
  float: right;
  margin-left: .25em;
}
p {
  margin: 1em auto;
  max-width: 500px;
  font-size: xx-large;
  /* position: relative; */
}

span {
  border: 1px black solid;
  /* width:100px; */
  /* height: 100px; */
  /* position: absolute; */
  /* z-index:1; */
  position:relative;  

}
</style>