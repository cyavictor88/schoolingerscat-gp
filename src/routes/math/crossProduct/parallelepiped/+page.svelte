<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';
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
We first show that when we put together three vectors,
<Latex math={`\\vec{r} =`} /><ColsVec cols={['r']} dim={3} />
,
<Latex math={`\\vec{a} =`} /><ColsVec cols={['a']} dim={3} />
and
<Latex math={`\\vec{b} =`} /><ColsVec cols={['b']} dim={3} />,
to create a 3 x 3 matrix = <ColsVec cols={['r','a','b']} dim={3} />,
the determinant of this matrix is equal to the volume of the parallelepiped formed by 
<Latex math={`\\vec{r},\\vec{a},\\vec{b}`} />, as shown in Figure 1.



<div bind:this={divFig1}/>