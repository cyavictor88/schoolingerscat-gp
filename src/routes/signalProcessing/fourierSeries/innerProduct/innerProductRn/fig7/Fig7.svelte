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
<strong>3D Example:</strong>
<Col2>
	<div slot="col1" style='width: 400px;'>

		<p>Now we extend the vectors to 3D vectors by assign non-zero value to  <Latex math={'\\color{red}a_z'} /> and <Latex math={'\\color{blue}b_z'} />, as shown in Figure 7(use mouse to change the view around)</p>
		
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<p>Even though now we have 3D vectors, you can treat them as 2D and still form the <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showFocusTriangle'})}}>right triangle</span>
			and get the <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showHypotenuse'})}}> hypotenuse </span>  <Latex math={'=|a_y-b_y|'} />
			and <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg'})}}>leg</span> <Latex math={'=|a_x-b_x|'} />
		</p>


		<strong>BUT</strong>
		<!-- <p>With Pythagorean Theorem, we can have the equation: </p>
		<Latex
		displayMode={true}
		math={'\\Rightarrow \\color{brown}{d^2} \\color{black} = ( \\color{red}{a_x} \\color{black}- \\color{blue} b_x \\color{black})^2+( \\color{red}{a_y} \\color{black}- \\color{blue} b_y \\color{black})^2'} -->
	/>

	</div>

	<div slot="col2" style="border: 1px black solid">
		<p>Figure 7</p>
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