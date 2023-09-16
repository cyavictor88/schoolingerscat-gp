<script lang="ts">
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { onMount } from 'svelte';
	import { Universe as Fig4 } from './fig4/Universe';
	import { Universe as Fig5 } from './fig5/Universe';
	import { getCircleNum } from '$lib/unicode';
	import Col2 from '$lib/components/PageComp/Col2.svelte';
	import * as THREE from 'three';
	import GameInnerProduct3D from './game/GameInnerProduct3D.svelte';


	let divFig4: HTMLDivElement;
	let divFig5: HTMLDivElement;
	let universeFig4: Fig4;
	let universeFig5: Fig5;

	onMount(() => {
			universeFig4 = new Fig4(divFig4);
			universeFig4.start();
			universeFig4.eventBroker.emit('setMathMeshes');

			universeFig5 = new Fig5(divFig5);
			universeFig5.start();
			universeFig5.dispatchEvent({type:'setMathMeshes',target:universeFig5})

			return ()=>{
				if (divFig4.firstChild) divFig4.removeChild(divFig4.firstChild);
				if (divFig5.firstChild) divFig5.removeChild(divFig5.firstChild);
			}
	});

  import Title from "$lib/components/PageComp/Title.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
</script> 
<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Inner Product in <Latex math={'\\mathbb{R}^3'} />:
</Title>
<p>
	Let's expand inner product for vectors in <Latex math={'\\mathbb{R}^2'} /> to <Latex
		math={'\\mathbb{R}^3'}
	/> and see if  <Latex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} />  still holds for 3D vectors:
</p>
<p>Inner product for 3D vectors is:</p>

<Latex
	displayMode={true}
	math={`<\\vec{a},\\vec{b}>:= 
\\left[\\begin{array}{ccc} a_x & a_y & a_z \\end{array}\\right]
\\left[\\begin{array}{c} b_x \\\\ b_y \\\\ b_z \\end{array}\\right]
= a_x\\,b_x+a_y\\,b_y+a_zb_z
`}
/>

<p>
	Figure 4 shows two <Latex math={'\\mathbb{R}^3'} /> vectors, <Latex math={'\\vec{a}'} /> and <Latex
		math={'\\vec{b}'}
	/>, with <Latex math={'d'} /> indicates the distance between two vectors.
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
	Now we will show <Latex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> still holds in 3D by solving for <Latex math={'d'} />
</p>
<hr style="border-top: 1px grey dotted" />
<b>Step 1. Use Law of Cosine:</b>

<p>
	Using <a href="https://en.wikipedia.org/wiki/Law_of_cosines"
		>Low of Cosines</a
	>
	on the <a href="#fig4" on:click={()=>{universeFig4.eventBroker.emit('showFig4Triangle')}}>triangle</a> in Figure 4, we can get the following equation for <Latex math={'d'} />:
</p>

<div style="margin: auto; margin-left:0;margin-right:0;">
	<Latex
		displayMode={true}
		math={'\\color{brown}{d^2} \\color{black}{=} \\color{red}{\\| \\vec{a}  \\|^2} \\color{black}{+} \\color{blue}{\\| \\vec{b}  \\|^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } '}
	/>
	<Latex
		displayMode={true}
		math={'\\mathrm{where} \\ \\color{red}{\\| \\vec{a}  \\|^2 = a_x^2+a_y^2+a_z^2} \\color{black}{\\quad \\mathrm{and \\quad }}  \\color{blue}{\\| \\vec{b}  \\|^2 = b_x^2+b_y^2+b_z^2}'}
	/>
	<fieldset>
		<legend>{getCircleNum(3)}</legend>
		<Latex
			displayMode={true}
			math={'\\Rightarrow \\color{brown}{d^2} \\color{black}{=} \\color{red}{a_x^2+a_y^2+a_z^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2+b_z^2}\\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
		/>
	</fieldset>
</div>


<hr style="border-top: 1px grey dotted" />
<b>Step 2. Make a Right Triangle:</b>

<p>
	We can use the x,y,z coordinates of <Latex math={'\\vec{a}'} /> and <Latex math={'\\vec{b}'} /> to construct
	the brown right triangle as shown in Figure 5, and use the brown trianlge to get <Latex
		math={'d'}
	/>:
</p>


<Col2>
	<div slot='col1'>
		<Latex
		displayMode={true}
		math={'\\color{brown}{d^2}  = ( |  \\color{brown}{a_x} - \\color{brown} b_x |^2+ | \\color{brown}{a_y} - \\color{brown} b_y  |^2 ) + | \\color{brown}{a_z} - \\color{brown} b_z  |^2'}
	/>
	<fieldset>
		<legend>{getCircleNum(4)}</legend>
		<Latex
			displayMode={true}
			math={'\\Rightarrow \\color{brown}{d^2}  = ( \\color{brown}{a_x} - \\color{brown} b_x )^2+( \\color{brown}{a_y} - \\color{brown} b_y )^2+( \\color{brown}{a_z} - \\color{brown} b_z )^2'}
		/>
	</fieldset>

	</div>
	<div slot='col2' style='border: 1px black solid;'>
		<p>Figure 5</p>
		<div style='cursor: pointer;'bind:this={divFig5} />
	</div>
</Col2>

<p>By equating {getCircleNum(4)} = {getCircleNum(3)}, we can have the following:</p>

<Latex displayMode={true} math={`
\\color{brown}{d^2=(a_x-b_x)^2+(a_y-b_y)^2+ (a_z-b_z)^2} \\color{black}{=} \\color{red}{a_x^2+a_y^2+a_z^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2+b_z^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } 
`} />
<Latex displayMode={true} math={`\\Rightarrow \\color{black}{ (a_x-b_x)^2+(a_y-b_y)^2+ (a_z-b_z)^2} \\color{black}{=} \\color{red}{a_x^2+a_y^2+a_z^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2+b_z^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } `} />
<Latex displayMode={true} math={`\\Rightarrow  a_x^2+b_x^2-2a_xb_x +a_y^2+b_y^2-2a_yb_y +a_z^2+b_z^2-2a_zb_z= \\color{red}{a_x^2+a_y^2+a_z^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2+b_z^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } `} />
<Latex displayMode={true} math={`\\Rightarrow \\cancel{a_x^2}+\\cancel{b_x^2}-2a_xb_x +\\cancel{a_y^2}+\\cancel{b_y^2}-2a_yb_y+\\cancel{a_z^2}+\\cancel{b_z^2}-2a_zb_z= \\color{red}{\\cancel{a_x^2}+\\cancel{a_y^2}+\\cancel{a_z^2}} \\color{black}{+} \\color{blue}{\\cancel{b_x^2}+\\cancel{b_y^2}+\\cancel{b_z^2}} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } `} />
<Latex displayMode={true} math={`\\Rightarrow -2a_xb_x-2a_yb_y -2a_zb_z= -2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) `} />
<Latex displayMode={true} math={`\\Rightarrow a_xb_x+a_yb_y+a_zb_z = < \\vec{a},\\vec{b}> = \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) `} />
<Latex displayMode={true} math={`\\Rightarrow cos(\\theta)   = \\frac{< \\vec{a},\\vec{b}>}{  \\| \\vec{a}  \\| \\|\\vec{b}\\| } `} />


<p>Voilà!, we show that <Latex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> holds for 3D vectors</p>

<GameInnerProduct3D />

<style>
	fieldset {
			border: 1px dashed #555555;
	}
</style>