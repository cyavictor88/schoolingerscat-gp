<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { pageRoute } from './pageRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Katex from '$lib/components/Katex/Katex.svelte';
	import { makeChart } from './chart/chart';
	import { Simpson } from './chart/Simpson';
	const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');
	let exmapleFunctionCanvas: HTMLCanvasElement;
	let res = 0;
	onMount(() => {
		innerPageRoute.set(pageRoute);
    const chart = makeChart(exmapleFunctionCanvas);
		


		// res = simp.integrate(-5,5,1);
	});
</script>

<h1>Fourier Series - Introduction</h1>
<p>
	Fourier Series is a method to decompose a given periodic function <Katex math={'y(t)'} /> into a combination
	of <Katex math={'sin'} /> and <Katex math={'cos'} /> functions. (periodic? we will elaborate on that later)
</p>
<p>Example:</p>
<Katex math={'y(t) = t^3 -12 t +16 \\; \\text{for} \\; -5\\le t \\le 5'}  />
<div style="max-width: 500px; height:200px;">
	<canvas bind:this={exmapleFunctionCanvas} />
</div>
<p>We can decompose <Katex math={'y(t)'} /> into</p>
<p>Say we have a function{res}</p>
<p>
	To understand Fourier Series, we will first go over inner product. With inner product, we can
	define orthogonality. Using orthogonality, we will then can define basis and vector decomposition.
	And then finally, We will learn how to decompose a function into a fourier series.
</p>

<ul>
	<li><a href="/signalProcessing/fourierSeries/innerProduct">Inner Product</a></li>
	<li><a href="/signalProcessing/fourierSeries/basis">Basis</a></li>
</ul>
