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
<strong>Extending 2D to 3D Example:</strong>
<Col2>
	<div slot="col1" style='width: 400px;'>

		<p>Now we extend the vectors to 3D vectors by assign non-zero value to  <Latex math={'\\color{red}a_z'} /> and <Latex math={'\\color{blue}b_z'} />, as shown in Figure 7(use mouse to pan the view around)</p>
		
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<p>Even though now we have 3D vectors, if you treat those 2 vectors as 2D and you can still form the
			 <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showFocusTriangle2D'})}}>Yellow right triangle</span>

			and get <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg2D_1'})}}> Yellow Leg1 </span>  <Latex math={'=|a_x-b_x|'} />
			and <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg2D_2'})}}>Yellow Leg2 </span> <Latex math={'=|a_y-b_y|'} />
		</p>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<p>But now if you use your mouse to pan the view around, you will see that the hypotenuse formed by 
			<span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg2D_1'})}}> Yellow Leg1 </span> 
			and
			<span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg2D_2'})}}>Yellow Leg2 </span>
			is not the <Latex math={'\\color{brown}d'} />, but a leg of the 
			<span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showFocusTriangle3D'})}}>Brown right triangle</span>
			. And the hypotenuse of this 
			<span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showFocusTriangle3D'})}}>Brown right triangle</span>
			is the <Latex math={'\\color{brown}d'} /> that we are looking for.
		 </p>


				<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<p>In this
	 <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showFocusTriangle3D'})}}>Brown right triangle</span>:
		</p>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<p>
		  <Latex math={'\\rightarrow'} /> <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg3D_1'})}}> Brown Leg1 </span>
			<Latex math={'= \\sqrt{({a_x} -  b_x )^2+( {a_y} -  b_y )^2}'} 		/>
		</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<p>
		 
			<Latex math={'\\rightarrow'} /> <span class='toggleFig' on:click={()=>{universe.dispatchEvent({type:'showLeg3D_2'})}}>Brown Leg2</span> 
		 <Latex math={'=| {a_z} -  b_z |'} />
	 </p>
	 <p>
		 
		 
		<Latex math={'\\rightarrow \\color{brown}d^2 \\color{black} = (a_x -  b_x )^2+( a_y -  b_y )^2 + (a_z-b_z)^2'} />
	</p>

		<!-- <p>With Pythagorean Theorem, we can have the equation: </p>
		<Latex
		displayMode={true}
		math={'\\Rightarrow \\color{brown}{d^2} \\color{black} = ( \\color{red}{a_x} \\color{black}- \\color{blue} b_x \\color{black})^2+( \\color{red}{a_y} \\color{black}- \\color{blue} b_y \\color{black})^2'} 
	/>-->

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