<script lang="ts">
	import Katex from '$lib/components/Katex/Katex.svelte';
	import { onMount } from 'svelte';
	import { Universe as Fig6 } from './Universe';
	import Col2 from '$lib/components/PageComp/Col2.svelte';


	let divFig6: HTMLDivElement;
	let universeFig6: Fig6;

	let veca_arr : [number,number,number] = [9,-4,8];
	let vecb_arr : [number,number,number] = [4,8,-5];
	onMount(() => {

			universeFig6 = new Fig6(divFig6);
			universeFig6.start();
			universeFig6.dispatchEvent({type:'setMathMeshes',target:universeFig6})


			return ()=>{
				if (divFig6.firstChild) divFig6.removeChild(divFig6.firstChild);
			}
	});


	function validVecInput(event: any){
			if (Math.abs(vecb_arr[0])<=10){
				console.log(vecb_arr[0])
			}
	}
  // $: theta = universeFig6?.theta.theta;


	$: if(universeFig6){// && universeFig6.dLine && universeFig6.fig6triangleLine1 && universeFig6.fig6triangleLine2 && universeFig6.fig6triangle && universeFig6.theta) {
		universeFig6.veca?.changeCoord(...veca_arr);
		universeFig6.vecb?.changeCoord(...vecb_arr);
		universeFig6.dLine?.changeCoord(...veca_arr,...vecb_arr);
		universeFig6.fig6triangle?.changeCoord(...veca_arr,...vecb_arr,universeFig6.fig6triangleLine1!,universeFig6.fig6triangleLine2!);
		universeFig6.theta?.changeCoord(...veca_arr,...vecb_arr);
		universeFig6.vecaMM?.changeCoordSimple(...veca_arr);
		universeFig6.vecbMM?.changeCoordSimple(...vecb_arr);
		if(universeFig6.azbzMM) universeFig6.changeBrownTriangleMathTextCoord(...veca_arr,...vecb_arr) 
		console.log('veca delta',...veca_arr)
	}
</script>
	<Col2>
		<div slot='col1'>
			<p>Interactive Demo:</p>
			<form>
				<Katex math={'\\color{red}\\vec{a_x}:'} />
				<input style='width: 40px;' type="number" id="ax" name="fname" bind:value={veca_arr[0]} />
				<Katex math={'\\color{red}\\vec{a_y}:'} />
				<input style='width: 40px;' type="number" id="ay" name="fname" bind:value={veca_arr[1]} />
				<Katex math={'\\color{red}\\vec{a_z}:'} />
				<input style='width: 40px;' type="number" id="az" name="fname" bind:value={veca_arr[2]}/>
			</form>
			<form>
				<Katex math={'\\color{blue}\\vec{b_x}:'} />
				<input style='width: 40px;' type="number" id="bx" name="fname"  bind:value={vecb_arr[0]} on:input={validVecInput} />
				<Katex math={'\\color{blue}\\vec{b_y}:'} />
				<input style='width: 40px;' type="number" id="by" name="fname"  bind:value={vecb_arr[1]} />
				<Katex math={'\\color{blue}\\vec{b_z}:'} />
				<input style='width: 40px;' type="number" id="bz" name="fname"  bind:value={vecb_arr[2]} />
			</form>
      <!-- <span><Katex math={'\\theta'} />:{theta}</span> -->
			<div style='cursor: pointer;'bind:this={divFig6} />
		</div>
		<div slot='col2'>
		</div>

	</Col2>

