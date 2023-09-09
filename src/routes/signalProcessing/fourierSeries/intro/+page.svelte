<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { pageRoute } from './pageRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { makeChart as chart1 } from './chart/chart1';
	import { makeChart as chart2 } from './chart/chart2';
	const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');
	let exmapleFunctionCanvas1: HTMLCanvasElement;
	let exmapleFunctionCanvas2: HTMLCanvasElement;
	onMount(() => {
		innerPageRoute.set(pageRoute);
		chart1(exmapleFunctionCanvas1);
		chart2(exmapleFunctionCanvas2);
	});
</script>

<h1>Fourier Series - Introduction</h1>
<p>
	Fourier Series is a method to decompose a given periodic function <Latex math={'y(t)'} /> into sum
	of <Latex math={'sin'} /> and <Latex math={'cos'} /> functions. (periodic? we will elaborate on that
	later)
</p>
<p>Example:</p>
<Latex math={'\\color{green} y(t) = 12cos(2t)sin(t) + 16'} />
<div style="max-width: 500px; height:200px;">
	<canvas bind:this={exmapleFunctionCanvas1} />
</div>
<hr />
<p>
	For non-periodic function, Fourier Series can approximate a given non-periodic function with sum
	of <Latex math={'sin'} /> and <Latex math={'cos'} /> functions.
</p>
<p>Example:</p>
<Latex math={'\\color{red} y(t) = t^3 -12 t +16 \\; \\text{,} \\; t\\in [-5,5]'} />
<div style="max-width: 500px; height:200px;">
	<canvas bind:this={exmapleFunctionCanvas2} />
</div>
<hr />
<p>To understand Fourier Series, there are a few concepts we need to understand:</p>

<ol>
	<li><a href="/signalProcessing/fourierSeries/innerProduct">Inner Product</a></li>
	<p>With inner product, we can then define orthogonality, and using it, we then can understand:</p>
	<li><a href="/signalProcessing/fourierSeries/basis">Basis</a></li>
	<p>With basis, we can then understand how to decompose a vector/function and finally we can go over:</p>
	<li><a href="/signalProcessing/fourierSeries/basis">Fourier Series Proof</a></li>
</ol>

