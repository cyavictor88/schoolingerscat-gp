<script lang="ts">
	import { onMount } from 'svelte';
	import { Universe } from './Universe';
	import { Multiverse } from './Multiverse';
  import * as mj from 'mathjs';
	import Latex from '$lib/components/Latex/Latex.svelte';

	let universe1Div: HTMLDivElement|HTMLSpanElement;
	let universe2Div: HTMLDivElement|HTMLSpanElement;
	let universe3Div: HTMLDivElement|HTMLSpanElement;
	let canvas: HTMLCanvasElement;

	onMount(() => {
    const vecv = [2, 3, -1];
    const veca = [-4,-1,-1];
    const vecb = [-3,-1,3];

    const rowop = mj.add(mj.multiply(2,vecv), vecb);


		const universe = new Universe(universe1Div,  vecv,veca, vecb);
		const universe2 = new Universe(universe2Div, vecv,veca,  rowop as number[]);
		const universe3 = new Universe(universe3Div, vecv,veca,  vecb);
		const multiverse = new Multiverse(canvas, [universe, universe2,universe3]);
		universe.eventBroker.emit('setMathMeshes');
		universe2.eventBroker.emit('setMathMeshes',true);
		universe3.eventBroker.emit('setMathMeshes',true);
		multiverse.start();
	});
</script>

<div
	style="position: relative; height: 400px;width:1004px; display:flex; flex-flow: row wrap"
>
	<canvas id="c" bind:this={canvas}  />
	<span style="width:500px; height:400px; position:relative;" bind:this={universe1Div} >Figure 4.a</span>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe2Div} >Figure 4.b</span>
  <div style="width:1000px;">
    <p>Let's prove those two parallelepipeds have the same volume.</p>
    <p>As shown in Figure 4.c, if we just focus on the plane form by <Latex  math={'\\vec{v}'}/> and <Latex  math={'\\vec{b}'}/></p>


  </div>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe3Div} >Figure 4.c</span>

</div>

<style>
	#c {
    border: 1px solid yellow;
		position: absolute;
		width: 1000px;
		height: 1400px;
    /* width:100%;  */
    /* height:100%; */
		/* z-index:0; */
	}

  span {
    border: 1px solid grey;
  }
</style>
