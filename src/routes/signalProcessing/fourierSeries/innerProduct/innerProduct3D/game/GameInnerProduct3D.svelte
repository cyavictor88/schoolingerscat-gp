<script lang="ts">
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { onMount } from 'svelte';
	import { Universe as FunThreeJsGame } from './Universe';
	import Col2 from '$lib/components/PageComp/Col2.svelte';

	function calculateMagnitude(vector: [number,number,number]) {
  const squaredSum = vector.reduce((sumOfSquares, element) => sumOfSquares + element ** 2, 0);
  	return Math.sqrt(squaredSum);
	}
	let divFunThreeJsGame: HTMLDivElement;
	let universeFunThreeJsGame: FunThreeJsGame;

	let veca_arr : [number,number,number] = [9,-4,8];
	let vecb_arr : [number,number,number] = [4,8,-5];
	$: innerProduct = veca_arr.reduce((result, currentValue, index) => {
  	return result + (currentValue * vecb_arr[index]);
	}, 0);
	$: theta = Math.acos( innerProduct/(calculateMagnitude(veca_arr)*calculateMagnitude(vecb_arr)) ) *180/Math.PI;
	onMount(() => {

			universeFunThreeJsGame = new FunThreeJsGame(divFunThreeJsGame);
			universeFunThreeJsGame.start();
			universeFunThreeJsGame.dispatchEvent({type:'setMathMeshes',target:universeFunThreeJsGame})


			return ()=>{
				if (divFunThreeJsGame.firstChild) divFunThreeJsGame.removeChild(divFunThreeJsGame.firstChild);
			}
	});


	function validVecInput(event: any){
			if (Math.abs(vecb_arr[0])<=10){
				console.log(vecb_arr[0])
			}
	}
  // $: theta = universeFunThreeJsGame?.theta.theta;


	$: if(universeFunThreeJsGame){// && universeFunThreeJsGame.dLine && universeFunThreeJsGame.funThreeJsGametriangleLine1 && universeFunThreeJsGame.funThreeJsGametriangleLine2 && universeFunThreeJsGame.funThreeJsGametriangle && universeFunThreeJsGame.theta) {
		universeFunThreeJsGame.veca?.changeCoord(...veca_arr);
		universeFunThreeJsGame.vecb?.changeCoord(...vecb_arr);
		universeFunThreeJsGame.dLine?.changeCoord(...veca_arr,...vecb_arr);
		universeFunThreeJsGame.funGameTriangle?.changeCoord(...veca_arr,...vecb_arr,universeFunThreeJsGame.funGameTriangleLine1!,universeFunThreeJsGame.funGameTriangleLine2!);
		universeFunThreeJsGame.theta?.changeCoord(...veca_arr,...vecb_arr);
		universeFunThreeJsGame.vecaMM?.changeCoordSimple(...veca_arr);
		universeFunThreeJsGame.vecbMM?.changeCoordSimple(...vecb_arr);
		if(universeFunThreeJsGame.azbzMM) universeFunThreeJsGame.changeBrownTriangleMathTextCoord(...veca_arr,...vecb_arr) 
		console.log('veca delta',...veca_arr)
		// if(universeFunThreeJsGame?.theta) theta = universeFunThreeJsGame.theta.theta;
	}

</script>
	<Col2>
		<div slot='col1'>
			<p>Interactive Demo:</p>
			<form>
				<Latex math={'\\color{red}\\vec{a_x}:'} />
				<input style='width: 40px;' type="number" id="ax" name="fname" bind:value={veca_arr[0]} />
				<Latex math={'\\color{red}\\vec{a_y}:'} />
				<input style='width: 40px;' type="number" id="ay" name="fname" bind:value={veca_arr[1]} />
				<Latex math={'\\color{red}\\vec{a_z}:'} />
				<input style='width: 40px;' type="number" id="az" name="fname" bind:value={veca_arr[2]}/>
			</form>
			<form>
				<Latex math={'\\color{blue}\\vec{b_x}:'} />
				<input style='width: 40px;' type="number" id="bx" name="fname"  bind:value={vecb_arr[0]} on:input={validVecInput} />
				<Latex math={'\\color{blue}\\vec{b_y}:'} />
				<input style='width: 40px;' type="number" id="by" name="fname"  bind:value={vecb_arr[1]} />
				<Latex math={'\\color{blue}\\vec{b_z}:'} />
				<input style='width: 40px;' type="number" id="bz" name="fname"  bind:value={vecb_arr[2]} />
			</form>
			<div style='display: flex; flex-flow: row nowrap; gap:20px;'>
				<p><Latex math={`\\color{red}|\\vec{a}|=${calculateMagnitude(veca_arr).toFixed()}`}/> </p>
				<p><Latex math={`\\color{blue}|\\vec{b}|=${calculateMagnitude(vecb_arr).toFixed()}`}/> </p>
				<p><Latex math={'< \\vec{a},\\vec{b}>'} />={innerProduct.toFixed(2)}</p>
			</div>
			<div style='display: flex; flex-flow: row nowrap; gap:20px;'>
				<p><Latex math={'\\theta'} /> = {theta.toFixed(2)}</p>
				<p><Latex math={'cos(\\theta)'} /> = {Math.cos(theta/180*Math.PI).toFixed(2)}</p>
				<p><Latex math={'\\frac{< \\vec{a},\\vec{b}>}{  \\| \\vec{a}  \\| \\|\\vec{b}\\|}'} /> = {(innerProduct/(calculateMagnitude(veca_arr)*calculateMagnitude(vecb_arr))).toFixed(2)}</p>
			</div>
				<div style='cursor: pointer;'bind:this={divFunThreeJsGame} />
		</div>
		<div slot='col2'>
		</div>

	</Col2>

