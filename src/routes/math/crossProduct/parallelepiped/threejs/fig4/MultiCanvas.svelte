<script lang="ts">
	import { onMount } from 'svelte';
	import { Universe } from './Universe';
	import { Universe2 } from './Universe2';
	import { Universe3 } from './Universe3';
	import { Multiverse } from './Multiverse';
  import * as mj from 'mathjs';
	import Latex from '$lib/components/Latex/Latex.svelte';

	let universe1Div: HTMLDivElement|HTMLSpanElement;
	let universe2Div: HTMLDivElement|HTMLSpanElement;
	let universe3Div: HTMLDivElement|HTMLSpanElement;
	let universe3:Universe3;
	let canvas: HTMLCanvasElement;

	onMount(() => {
    const vecv = [2, 3, -1];
    const veca = [-4,-1,-1];
    const vecb = [-3,-1,3];

    const rowop = mj.add(mj.multiply(2,vecv), vecb);


		const universe = new Universe(universe1Div,  vecv,veca, vecb);
		const universe2 = new Universe2(universe2Div, vecv,veca,  rowop as number[]);
		universe3 = new Universe3(universe3Div, vecv,veca,  vecb, rowop as number[]);
		universe3.vecv_vecb_plane.mesh.visible=true;
		const multiverse = new Multiverse(canvas, [universe, universe2,universe3]);
		universe.eventBroker.emit('setMathMeshes');
		universe2.eventBroker.emit('setMathMeshes');
		universe3.eventBroker.emit('setMathMeshes');
		multiverse.start();
	});
</script>

<div
	style="position: relative; height: 400px;width:1004px; display:flex; flex-flow: row wrap"
>
	<canvas id="c" bind:this={canvas}  />
	<span style="width:500px; height:400px; position:relative;" bind:this={universe1Div} >Figure 4.a: <Latex math={'M'}/></span>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe2Div} >Figure 4.b: <Latex math={`M'`}/></span>
  <div style="width:1000px;">
    <p>Let's prove those two parallelepipeds have the same volume.</p>
    <p>If we put place the two parallelepipeds together and highlight the plane form by <Latex  math={'\\vec{v}'}/> and <Latex  math={'\\vec{b}'}/>,
		you can see that <Latex  math={`\\vec{b'}`}/> is also on the same plane. This is because when you do row operations involving two vectors, 
	you are basically doing adding/subtracting with these two vectors on the plane that is formed by this two vectors, so the result vector also resides on the same plane. </p>
<p>Since <Latex  math={'\\vec{v}'}/>, <Latex math={'\\vec{b}'} />, and <Latex  math={`\\vec{b'}`}/> are coplanar. You can see that 
<!-- svelte-ignore a11y-invalid-attribute -->
despite the shapes of the parallelepipeds are different. <a href='#' on:click={()=>{universe3.eventBroker.emit('toggleShowHeight')}}>They have the same height</a>.  </p>
<p>So if we can show that those two parallelepipeds have the same area, then we know they have the same volume, then it proves that 
	row operations does not change the volume of a matrix from by 3 different vectors.
</p>

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
p {
	position:relative;
}
  span {
    border: 1px solid grey;
  }
</style>
