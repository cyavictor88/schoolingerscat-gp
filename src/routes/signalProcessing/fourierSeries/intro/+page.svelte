<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { pageRoute } from './pageRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Katex from '$lib/components/Katex/Katex.svelte';
  import Chart from 'chart.js/auto'
	import { data } from './chart/data';
	const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');
  let exmapleFunctionCanvas : HTMLCanvasElement;
	onMount(() => {
		innerPageRoute.set(pageRoute);
    new Chart(exmapleFunctionCanvas, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'f(x) = x^3 - 12x + 16',
        data: data(),
        borderWidth: 1,
        pointStyle: false,
        showLine: true,
        borderColor: 'red',
        backgroundColor: 'red'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,


    }
  });
	});
</script>

<h1>Fourier Series - Introduction</h1>
<p>
	Fourier Series is a method to decompose a given function <Katex math={'f(x)'} /> into a combination of <Katex math={'sin'} /> and <Katex math={'cos'}/> functions.
</p>
<p>Example:</p>
<Katex math={'f(x) = x^3 -12 x +16'} />
<div style='width:500px; height:200px;'>
<canvas bind:this={exmapleFunctionCanvas} />
</div>
<p>We can decompose <Katex math={'f(x)'} /> into </p>
<p>Say we have a function</p>
<p>
	To understand Fourier Series, we will first go over inner product. With inner product, we can
	define orthogonality. Using orthogonality, we will then can define basis and vector decomposition.
	And then finally, We will learn how to decompose a function into a fourier series.
</p>

<ul>
	<li><a href="/signalProcessing/fourierSeries/innerProduct">Inner Product</a></li>
	<li><a href="/signalProcessing/fourierSeries/basis">Basis</a></li>
</ul>
