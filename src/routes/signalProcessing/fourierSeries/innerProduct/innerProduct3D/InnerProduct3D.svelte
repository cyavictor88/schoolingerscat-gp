<script lang="ts">
	import Katex from '$lib/components/Katex/Katex.svelte';
	import { onMount } from 'svelte';
	import { Universe as Fig4 } from './fig4/Universe';
	import { Universe as Fig5 } from './fig5/Universe';
	import { Universe as Fig6 } from './fig6/Universe';
	import { getCircleNum } from '$lib/unicode';
	import Col2 from '$lib/components/PageComp/Col2.svelte';

	let divFig4: HTMLDivElement;
	let divFig5: HTMLDivElement;
	let divFig6: HTMLDivElement;
	let universeFig4: Fig4;
	let universeFig5: Fig5;
	let universeFig6: Fig6;

	let veca_arr : [number,number,number] = [9,-4,8];
	let vecb_arr : [number,number,number] = [4,8,-5];
	onMount(() => {
			universeFig4 = new Fig4(divFig4);
			universeFig4.start();
			universeFig4.eventBroker.emit('setMathMeshes');

			universeFig5 = new Fig5(divFig5);
			universeFig5.start();
			universeFig5.dispatchEvent({type:'setMathMeshes',target:universeFig5})

			universeFig6 = new Fig6(divFig6);
			universeFig6.start();
			universeFig6.dispatchEvent({type:'setMathMeshes',target:universeFig6})


			return ()=>{
				if (divFig4.firstChild) divFig4.removeChild(divFig4.firstChild);
				if (divFig5.firstChild) divFig5.removeChild(divFig5.firstChild);
				if (divFig6.firstChild) divFig6.removeChild(divFig6.firstChild);
			}
	});


	function validVecInput(event: any){
			if (Math.abs(vecb_arr[0])<=10){
				console.log(vecb_arr[0])
			}
	}

	$: if(universeFig6) {
		console.log('veca delta',...veca_arr)
		// universeFig6.setVeca(...veca_arr)
		// universeFig6.setVecb(...vecb_arr)
	}
</script>

<p>
	Let's expand inner product for vectors in <Katex math={'\\mathbb{R}^2'} /> to <Katex
		math={'\\mathbb{R}^3'}
	/> and see if the relation between the angle and inner product equation still holds in 3D:
</p>
<p>Inner product for 3D vectors is:</p>

<Katex
	displayMode={true}
	math={`<\\vec{a},\\vec{b}>:= 
\\left[\\begin{array}{ccc} a_x & a_y & a_z \\end{array}\\right]
\\left[\\begin{array}{c} b_x \\\\ b_y \\\\ b_z \\end{array}\\right]
= a_x\\,b_x+a_y\\,b_y+a_zb_z
`}
/>

<p>
	Figure 4 shows two <Katex math={'\\mathbb{R}^3'} /> vectors, <Katex math={'\\vec{a}'} /> and <Katex
		math={'\\vec{b}'}
	/>, with <Katex math={'d'} /> indicates the distance between two vectors.
</p>

<div style="display: flex; flex-flow: column nowrap; align-items:start; justify-content: start; border: 1px black solid;width:500px">
	<p id='fig4'>Figure 4</p>
	<div style='cursor: pointer; position: relative; width:500px; height: 400px;'bind:this={divFig4}>
		<button style='position:absolute; height:30px; width:30px; left:0px; top:0px;' on:click={()=>{universeFig4.camera.position.setZ( universeFig4.camera.position.z-1)}}>{'↗'}</button>
		<button style='position:absolute; height:30px; width:30px; left:60px; top:0px;' on:click={()=>{universeFig4.camera.position.setZ( universeFig4.camera.position.z+1)}}>{'↙'}</button>
		<button style='position:absolute; height:30px; width:30px; left:60px; top:30px;' on:click={()=>{universeFig4.camera.position.setX( universeFig4.camera.position.x+1)}}>{'→'}</button>
		<button style='position:absolute; height:30px; width:30px; left:0px; top:30px;' on:click={()=>{universeFig4.camera.position.setX( universeFig4.camera.position.x-1)}}>{'←'}</button>
		<button style='position:absolute; height:30px; width:30px; left:30px; top:30px;' on:click={()=>{universeFig4.camera.position.setY( universeFig4.camera.position.y-1)}}>{'↓'}</button>
		<button style='position:absolute; height:30px; width:30px; left:30px; top:0px;' on:click={()=>{universeFig4.camera.position.setY( universeFig4.camera.position.y+1)}}>{'↑'}</button>
	</div>
</div>

<p>
	Now we will show <Katex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> still holds in 3D by solving for <Katex math={'d'} />
</p>
<hr style="border-top: 1px grey dotted" />
<b>Step 1. Using law of Cosine:</b>

<p>
	Using <a href="https://en.wikipedia.org/wiki/Law_of_cosines"
		>Low of Cosines</a
	>
	on the <a href="#fig4" on:click={()=>{universeFig4.eventBroker.emit('showFig4Triangle')}}>triangle</a> in Figure 4, we can get the following equation for <Katex math={'d'} />:
</p>

<div style="margin: auto; margin-left:0;margin-right:0;">
	<Katex
		displayMode={true}
		math={'\\color{brown}{d^2} \\color{black}{=} \\color{red}{\\| \\vec{a}  \\|^2} \\color{black}{+} \\color{blue}{\\| \\vec{b}  \\|^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } '}
	/>
	<Katex
		displayMode={true}
		math={'\\mathrm{where} \\ \\color{red}{\\| \\vec{a}  \\|^2 = a_x^2+a_y^2+a_z^2} \\color{black}{\\quad \\mathrm{and \\quad }}  \\color{blue}{\\| \\vec{b}  \\|^2 = b_x^2+b_y^2+b_z^2}'}
	/>
	<fieldset>
		<legend>{getCircleNum(3)}</legend>
		<Katex
			displayMode={true}
			math={'\\Rightarrow \\color{brown}{d^2} \\color{black}{=} \\color{red}{a_x^2+a_y^2+a_z^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2+b_z^2}\\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
		/>
	</fieldset>
</div>


<hr style="border-top: 1px grey dotted" />
<b>Step 2. Making a new Triangle:</b>

<p>
	We can use the x,y,z coordinates of <Katex math={'\\vec{a}'} /> and <Katex math={'\\vec{b}'} /> to construct
	the brown right triangle as shown in Figure 5, and use the brown trianlge to get <Katex
		math={'d'}
	/>:
</p>

<Col2>
	<div slot='col1'>
		<p>Figure 5</p>
		<div style='cursor: pointer;'bind:this={divFig5} />
	</div>
	<div slot='col2'>
		<Katex
			displayMode={true}
			math={'\\color{brown}{d^2}  = ( |  \\color{brown}{a_x} - \\color{brown} b_x |^2+ | \\color{brown}{a_z} - \\color{brown} b_z  |^2 ) + | \\color{brown}{a_y} - \\color{brown} b_y  |^2'}
		/>
		<fieldset>
			<legend>{getCircleNum(4)}</legend>
			<Katex
				displayMode={true}
				math={'\\Rightarrow \\color{brown}{d^2}  = ( \\color{brown}{a_x} - \\color{brown} b_x )^2+( \\color{brown}{a_y} - \\color{brown} b_y )^2+( \\color{brown}{a_z} - \\color{brown} b_z )^2'}
			/>
		</fieldset>
	</div>
</Col2>

<p>By equating {getCircleNum(4)} = {getCircleNum(3)}, we can have the following:</p>

<Katex displayMode={true} math={`
\\color{brown}{d^2=(a_x-b_x)^2+(a_y-b_y)^2+ (a_z-b_z)^2} \\color{black}{=} \\color{red}{a_x^2+a_y^2+a_z^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2+b_z^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } 
`} />
<Katex displayMode={true} math={`\\Rightarrow \\color{black}{ (a_x-b_x)^2+(a_y-b_y)^2+ (a_z-b_z)^2} \\color{black}{=} \\color{red}{a_x^2+a_y^2+a_z^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2+b_z^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } `} />
<Katex displayMode={true} math={`\\Rightarrow  a_x^2+b_x^2-2a_xb_x +a_y^2+b_y^2-2a_yb_y +a_z^2+b_z^2-2a_zb_z= \\color{red}{a_x^2+a_y^2+a_z^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2+b_z^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } `} />
<Katex displayMode={true} math={`\\Rightarrow \\cancel{a_x^2}+\\cancel{b_x^2}-2a_xb_x +\\cancel{a_y^2}+\\cancel{b_y^2}-2a_yb_y+\\cancel{a_z^2}+\\cancel{b_z^2}-2a_zb_z= \\color{red}{\\cancel{a_x^2}+\\cancel{a_y^2}+\\cancel{a_z^2}} \\color{black}{+} \\color{blue}{\\cancel{b_x^2}+\\cancel{b_y^2}+\\cancel{b_z^2}} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } `} />
<Katex displayMode={true} math={`\\Rightarrow -2a_xb_x-2a_yb_y -2a_zb_z= -2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) `} />
<Katex displayMode={true} math={`\\Rightarrow a_xb_x+a_yb_y+a_zb_z = < \\vec{a},\\vec{b}> = \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) `} />
<Katex displayMode={true} math={`\\Rightarrow cos(\\theta)   = \\frac{< \\vec{a},\\vec{b}>}{  \\| \\vec{a}  \\| \\|\\vec{b}\\| } `} />


<p>Voilà!, we show that <Katex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> holds for 3D vectors</p>
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

	<div style='cursor: pointer;'bind:this={divFig6} />


<style>
	fieldset {
			border: 1px dashed #555555;
	}
</style>