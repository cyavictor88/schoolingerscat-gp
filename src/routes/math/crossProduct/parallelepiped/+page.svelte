<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';
	import RowsVec from '../common/latex/RowsVec.svelte';
	import { Universe as Fig1 } from './threejs/fig1/Universe';
	import { Universe as Fig2 } from './threejs/fig2/Universe';

	import { sectionRoute } from '../store';

	let divFig1: HTMLDivElement;
	let universeFig1: Fig1;

	let divFig2: HTMLDivElement;
	let universeFig2: Fig2;

	onMount(() => {
		universeFig1 = new Fig1(divFig1);
		universeFig1.start();
		universeFig1.eventBroker.emit('setMathMeshes');

		universeFig2 = new Fig2(divFig2);
		universeFig2.start();
		universeFig2.eventBroker.emit('setMathMeshes');

		return () => {
			universeFig1.eventBroker.removeAllListeners();
			universeFig2.eventBroker.removeAllListeners();
			if (divFig1.firstChild) divFig1.removeChild(divFig1.firstChild);
			if (divFig2.firstChild) divFig2.removeChild(divFig2.firstChild);
		};
	});
</script>

<Title hLevel={1}>Cross Product - Parallelepiped</Title>
In this section, we will show that the determinant of a 3 x 3 matrix, <RowsVec cols={['v','a','b']} dim={3} />,
is equal to the parallelepiped volume formed by <Latex math={`\\vec{v} =`} /><ColsVec cols={['v']} dim={3} />
,
<Latex math={`\\vec{a} =`} /><ColsVec cols={['a']} dim={3} />
and
<Latex math={`\\vec{b} =`} /><ColsVec cols={['b']} dim={3} />, as shown in Figure 1.


<!-- 3js convex geometry, or   baby3-react http://localhost:5173/threefiber/crossproduct  src/components/threefiber/crossproduct/views/Step1a.jsx -->
<p><b>Figure 1</b></p>
<div bind:this={divFig1}/>


<p><u><b>Step 1:</b></u></p>
<p>If we are given a set of vectors with constraints such that:</p>

<div>
	
<p><Latex math={`\\vec{v} =`} /><ColsVec cols={['v']} dim={3} />, where <Latex math={`v_1 \\neq 0`}/> and <Latex math={`v_1 , v_2 , v_3 \\in \\mathbb{R}`}/></p>
<p><Latex math={`\\vec{a} = \\begin{bmatrix} 0 \\\\ a_2 \\\\ a_3 \\end{bmatrix}`} />, where<Latex math={`a_2 \\neq 0`}/> and <Latex math={` a_2 , a_3 \\in \\mathbb{R}`}/></p>
<p><Latex math={`\\vec{b} =  \\begin{bmatrix} 0 \\\\ 0 \\\\ b_3 \\end{bmatrix}`} />, where<Latex math={`b_3 \\neq 0`}/> and <Latex math={` b_3 \\in \\mathbb{R}`}/></p>

</div>

<p>
	Then the matrix formed by these 3 vectors, <Latex math={`M = 
		\\begin{bmatrix} 
		v_1 & v_2 & v_3 \\\\ 
		0 & a_2 & a_3 \\\\ 
		0 & 0 & b_3 \\end{bmatrix}
		`}/>, has the property <Latex math={`\\det(M) = v_1 * a_2 * b_3`}/>.	
</p>
<div  style='text-align:center'>
<p><b>Show that the volume of the parallelepiped formed by these 3 vectors
	is also equal to 	<Latex math={`v_1 * a_2 * b_3`}/>.</b></p>
</div>


<div bind:this={divFig2}/>

<p><u><b>Step 1 Proof:</b></u></p>

<p>The general formula for the volume of a parallelepiped is:
</p>
<Latex center math={`  volume  = (area)  \\times depth`}/>


<p>We first focus on getting the  <Latex math={`area`}/> by just looking at <Latex math={`\\vec{a} = \\begin{bmatrix} 0 \\\\ a_2 \\\\ a_3 \\end{bmatrix}`} />
and <Latex math={`\\vec{b} = \\begin{bmatrix} 0 \\\\ 0 \\\\ b_3 \\end{bmatrix}`} />.</p>

<p>Since both <Latex math={`\\vec{a}`} /> and <Latex math={`\\vec{b}`}/> have <Latex math={`0s`}/> for X-axis (<Latex math={`a_1=0,b_1=0`}/>), 
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href='javascript:;' on:click={()=>{universeFig2.eventBroker.emit('toggleYZPlane')}}><Latex math={`\\vec{a}`} /> and <Latex math={`\\vec{b}`}/>  are both on the YZ-plane</a></p>








<p>Step x: Show Row Operation <Latex math={'r_m \\rightarrow r_m + c r_n'} /> does not change</p>