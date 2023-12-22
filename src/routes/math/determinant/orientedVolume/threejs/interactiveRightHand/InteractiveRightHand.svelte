<script lang="ts">
	import { onMount } from 'svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
  import { VecEnum, Universe } from './Universe';
	import Col2 from '$lib/components/PageComp/Col2.svelte';
	import * as mj from 'mathjs';


	let divUniverse: HTMLDivElement;
	let universe: Universe;
  let veca:[number,number,number] = [-4,4,-5];
  let vecb:[number,number,number] = [4,3,5];
  let vecc:[number,number,number] = [-1,2,3];
	export let zoomIn: boolean = false;
	let fps = 0;

    // this.veca = new Vector(-1,2,3,0x008800);
    // this.vecb = new Vector(4,3,5,0x0000ff);
    // this.vecv = new Vector(-4,4,-5,0xff0000);
	onMount(() => {
		universe = new Universe(divUniverse,veca,vecb,vecc,zoomIn);
		universe.start();
		universe.eventBroker.emit('setMathMeshes');
		universe.eventBroker.emit('setRightHand');
		universe.eventBroker.addListener('fps',(data)=>{fps=data})
		return () => {
			universe.eventBroker.removeAllListeners();
			if (divUniverse.firstChild) divUniverse.removeChild(divUniverse.firstChild);
		};
	});

	let orientation = '0';
	let det = 0;
	$: {
		det = mj.det([veca,vecb,vecc]);
		orientation = det === 0 ? '0' : det > 0 ? "+1" : '-1';
	}

	$: {universe?.changeVec(VecEnum.V1,veca);}
	$: {universe?.changeVec(VecEnum.V2,vecb);}
	$: {universe?.changeVec(VecEnum.V3,vecc);}

</script>
<div style='border: 1px black solid;'>
	<Col2>
		<div slot='col1' style='width:300px'>
			<p>Interactive 3D Demo:</p>
			<form>
				<Latex math={'\\color{red}\\vec{v_1}: x:'} />
				<input style='width: 40px;' type="number" id="ax" name="fname" bind:value={veca[0]} />
				<Latex math={'\\color{red}y:'} />
				<input style='width: 40px;' type="number" id="ay" name="fname" bind:value={veca[1]} />
				<Latex math={'\\color{red}z:'} />
				<input style='width: 40px;' type="number" id="az" name="fname" bind:value={veca[2]}/>
			</form>
			<form>
				<Latex math={'\\color{blue}\\vec{v_2}: x:'} />
				<input style='width: 40px;' type="number" id="bx" name="fname"  bind:value={vecb[0]} on:input={()=>{}} />
				<Latex math={'\\color{blue}y:'} />
				<input style='width: 40px;' type="number" id="by" name="fname"  bind:value={vecb[1]} />
				<Latex math={'\\color{blue}z:'} />
				<input style='width: 40px;' type="number" id="bz" name="fname"  bind:value={vecb[2]} />
			</form>
			<form>
				<Latex math={'\\color{green}\\vec{v_3}:x:'} />
				<input style='width: 40px;' type="number" id="cx" name="fname"  bind:value={vecc[0]} on:input={()=>{}} />
				<Latex math={'\\color{green}y:'} />
				<input style='width: 40px;' type="number" id="cy" name="fname"  bind:value={vecc[1]} />
				<Latex math={'\\color{green}z:'} />
				<input style='width: 40px;' type="number" id="cz" name="fname"  bind:value={vecc[2]} />
			</form>
			<div style='display: flex; flex-flow: column nowrap; gap:2px;'>
				<Latex math={`orientation=${orientation}`}/>
				<Latex math={`determinant=${det}`}/>
			</div>
			<!--
			<div style='display: flex; flex-flow: row nowrap; gap:20px;'>
				<p><Latex math={'\\theta'} /> = {theta.toFixed(2)}</p>
				<p><Latex math={'cos(\\theta)'} /> = {Math.cos(theta/180*Math.PI).toFixed(2)}</p>
				<p><Latex math={'\\frac{< \\vec{a},\\vec{b}>}{  \\| \\vec{a}  \\| \\|\\vec{b}\\|}'} /> = {(innerProduct/(calculateMagnitude(veca_arr)*calculateMagnitude(vecb_arr))).toFixed(2)}</p>
			</div>
				<div style='cursor: pointer;'bind:this={divFunThreeJsGame} /> -->
		</div>
		<div slot='col2'>
			<div bind:this={divUniverse} />
		</div>

	</Col2>
</div>