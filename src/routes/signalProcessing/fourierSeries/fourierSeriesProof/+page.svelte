<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	// import { pageRoute } from './sectionRoute';

	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';
	import HiddenBlock from './HiddenBlock.svelte';

	// const contextSectionRoute = getContext<Writable<IRoute | null>>('contextSectionRoute');
	let showSet: Set<number> = new Set<number>();
	const toggleShow = (idx: number) => {
		const newSet = new Set<number>(showSet);
		if (showSet.has(idx)) newSet.delete(idx);
		else newSet.add(idx);
		showSet = newSet;
	};

	const showAll = () => {
		let newSet = new Set<number>();
		if (showSet.size === 0) for (let index = 1; index <=6 ; index++) newSet.add(index);
		showSet = newSet;
	};
	onMount(() => {
		// showAll();
		// (async () => {
		// 	contextSectionRoute.set(pageRoute);
		// })();
	});
</script>

<Title hLevel={1}>Fourier Series - Proof</Title>

<ol>
	<li>
		<a href='fourierSeriesProof/fourierBasis'>Fourier Basis</a>: We will first prove that a set of infinite <Latex math={'sin'} /> and <Latex math={'cos'} /> functions with period <Latex math={'T'} />
		is an orthogonal basis that can decompose any function that has period <Latex math={'T'} /> .
	</li>
	<li><a href='fourierSeriesProof/examples'>Examples from Intro</a>:  After that, we will show you how to make the graphs shown in the <a href='/signalProcessing/fourierSeries/introduction'>Introduction</a>.</li>
	<li><a href='fourierSeriesProof/exponentialForm'>Exponential Form</a>:  Finally, we will show you how to represent fourier series in exponential form.</li>

</ol>
