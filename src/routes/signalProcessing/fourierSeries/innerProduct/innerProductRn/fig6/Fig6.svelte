<script lang="ts">
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { onMount } from 'svelte';
	import { Universe } from './Universe';
	import Col2 from '$lib/components/PageComp/Col2.svelte';
	let divUniverse: HTMLDivElement;
	let universe: Universe;

	onMount(() => {
		universe = new Universe(divUniverse);
		universe.start();
		universe.dispatchEvent({type:'setMathMeshes'});

		return () => {
			if (divUniverse.firstChild) divUniverse.removeChild(divUniverse.firstChild);
		};
	});
</script>
<hr />
<strong>2D Example:</strong>
<Col2>
	<div slot="col1" style='width: 400px; border: 1px black solid;'>

		<p>Say we have two 2D vectors <Latex math={'\\color{red}\\vec{a}'} /> and <Latex math={'\\color{blue}\\vec{b}'} /> drawn in 3D space by having  <Latex math={'\\color{red}{a_z}\\color{black}=\\color{blue}{\\vec{b_z}}\\color{black}=0'} />, as shown in Figure 6</p>
		
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<p>In Figure 6, you can form the <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showFocusTriangle'})}}>right triangle</span>
		 	and get the <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg1'})}}> Leg1 </span>  <Latex math={'=|a_x-b_x|'} />
			and <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg2'})}}>Leg2</span> <Latex math={'=|a_y-b_y|'} />
		</p>

		<p>With Pythagorean Theorem, we can 	have the equation: </p>
		<Latex
		center={true}
		math={'\\Rightarrow \\color{brown}{d^2} \\color{black} = ( \\color{red}{a_x} \\color{black}- \\color{blue} b_x \\color{black})^2+( \\color{red}{a_y} \\color{black}- \\color{blue} b_y \\color{black})^2'}
	/>

	</div>

	<div slot="col2" style="border: 1px black solid">
		<p>Figure 6</p>
		<div bind:this={divUniverse} />
	</div>
</Col2>



<style>
	.toggleFig {
		text-decoration: underline;
		color: blue;
		cursor: pointer;
	}

</style>