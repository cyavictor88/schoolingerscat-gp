<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';
	import RowsVec from '../common/latex/RowsVec.svelte';
	import { Universe as Fig1 } from './threejs/fig1/Universe';

	import { sectionRoute } from '../store';

	let divFig1: HTMLDivElement;
	let universeFig1: Fig1;

	onMount(() => {
		universeFig1 = new Fig1(divFig1);
		universeFig1.start();
		universeFig1.eventBroker.emit('setMathMeshes');

		return () => {
			universeFig1.eventBroker.removeAllListeners();
			if (divFig1.firstChild) divFig1.removeChild(divFig1.firstChild);
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


<p>Step 1: Show Row Operation <Latex math={'r_m \\rightarrow r_m + c r_n'} /> does not change</p>
<p></p>