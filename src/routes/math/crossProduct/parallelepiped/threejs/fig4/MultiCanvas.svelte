<script lang='ts'>
	import { onMount } from "svelte";
  import { Universe } from "./Universe";

  import { Multiverse } from './Multiverse';
	let spanElem: HTMLSpanElement;
	let divElem: HTMLDivElement;
	let canvas: HTMLCanvasElement;

  // $: if(divMultiScenes && canvasMultiScenes){
   
  // }
  onMount(()=>{
    const universe = new Universe(divElem);
    const universe2 = new Universe(spanElem);
    const multiverse = new Multiverse(canvas,[universe,universe2]);
    multiverse.start();
  })
</script>
<div style='position: relative; padding: 4px; border: 3px solid cyan; height: 400px;width:1000px; display:flex'>
<canvas id="c" bind:this={canvas} style='border: 3px solid yellow' ></canvas>

<span style="width:500px; height:400px; position:relative;  " bind:this={spanElem}></span>
<div style='width:500px; height:400px; position:relative;  ' bind:this={divElem}></div>

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
  background-color: green;
  width:1000px; 
  height: 400px; 
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
  border: 1px black solid;
  width:500px; 
  height: 400px; 
  /* position: absolute; */
  /* z-index:1; */
  position:relative;  

}
</style>