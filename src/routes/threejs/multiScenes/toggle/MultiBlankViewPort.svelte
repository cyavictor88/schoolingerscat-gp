<script lang='ts'>
	import { onMount, afterUpdate } from "svelte";
  import ToggleViewPort from "./ToggleViewPort.svelte";
	import { Multiverse } from './Multiverse';
	import { Universe as Universe1 } from './Universe';
	import { Universe2 } from './Universe2';
	import * as mj from 'mathjs';

	let canvas: HTMLCanvasElement;

  let uni1Div: HTMLDivElement;
  let uni2Div: HTMLDivElement;
  let shows = [true, true];

  onMount(()=>{
    // grandDivH = grandDiv.clientHeight;
    const vecv = [2, 3, -1];
		const veca = [-4, -1, -1];
		const vecb = [-3, -1, 3];
		const rowop = mj.add(mj.multiply(2, vecv), vecb) as number[];

		const universe = new Universe1(uni1Div, vecv, veca, vecb);
		const universe2 = new Universe2(uni2Div, vecv, veca, vecb, rowop as number[]);
		const multiverse = new Multiverse(canvas, [universe,universe2], shows);
		universe.eventBroker.emit('setMathMeshes');
		universe2.eventBroker.emit('setMathMeshes');

		multiverse.start();

  })

</script>

<!-- need this div so the canvas is contained -->
<div style="position: relative;  border: 1px solid blue" >
  <canvas bind:this={canvas}/>
  <!-- nned this div so html elements are on top of canvas( so can click on toggles)-->
  <div style="position: relative;  display:flex; flex-flow: column wrap;">
    <ToggleViewPort bind:visible={shows[0]}>
      <div slot='text'>
        universe1
      </div>
      <div slot='viewport' bind:this={uni1Div} style={`width:200px;height:200px;${shows[0]? 'display:block' : 'display:none'}`}/>
    </ToggleViewPort>

    <ToggleViewPort bind:visible={shows[1]}>
      <div slot='text'>
        universe2
      </div>
      <div slot='viewport' bind:this={uni2Div} style={`width:200px;height:200px;${shows[1]? 'display:block' : 'display:none'}`}/>
    </ToggleViewPort>
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