<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { pageRoute } from './pageRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { makeChart as chart1 } from './chart/chart1';
	import { makeChart as chart2 } from './chart/chart2';
	import Title from '$lib/components/PageComp/Title.svelte';
	const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');
	let exampleFunctionCanvas1: HTMLCanvasElement;
	let exampleFunctionCanvas2: HTMLCanvasElement;
	onMount(() => {
		innerPageRoute.set(pageRoute);
		chart1(exampleFunctionCanvas1);
		chart2(exampleFunctionCanvas2);
	});
</script>

<Title hLevel={1}>Fourier Series - Introduction</Title>
<p>
	Fourier Series is a method to decompose a periodic function <Latex math={'y(t)'} /> into sum
	of <Latex math={'sin'} /> and <Latex math={'cos'} /> functions.
</p>
<p>Example:</p>
<Latex math={'\\color{green} y(t) = 12cos(2t)sin(t) + 16'} />
<div style="max-width: 500px; height:200px;">
	<canvas bind:this={exampleFunctionCanvas1} />
</div>
<hr />
<p>
	For non-periodic function, Fourier Series can approximate <b>an interval</b> of a given non-periodic function. Using that interval to be the period, we can manufacture a 
	periodic function for applying Fourier Series.
</p>
<p>Example:</p>
<Latex math={'\\color{red} y(t) = t^3 -12 t +16 \\; \\text{, for} \\; t\\in [-6,6]'} />
<div style="max-width: 500px; height:200px;">
	<canvas bind:this={exampleFunctionCanvas2} />
</div>
<hr />
<p>To understand Fourier Series, there are a few concepts we need to understand:</p>

<ol>
	<li><a href="/signalProcessing/fourierSeries/innerProduct">Inner Product</a></li>
	<p>With inner product, we can then define orthogonality, and using it, we then can understand Basis</p>
	<li><a href="/signalProcessing/fourierSeries/basis">Basis</a></li>
	<p>With basis, we can then understand how to decompose a vector/function and finally we can go over the proof for Fourier Series</p>
	<li><a href="/signalProcessing/fourierSeries/fourierSeriesProof">Fourier Series Proof</a></li>
	<p>With understanding of Fourier Series, then we can explain how to get the examples above. And finally show the exponential form of Fourier Series</p>
</ol>

