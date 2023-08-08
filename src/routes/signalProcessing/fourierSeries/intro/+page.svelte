<script lang='ts'>
	import type { IRoute } from '$lib/components/Route/route';
  import { onMount } from 'svelte';
  import { pageRoute } from './pageRoute';
  import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
  const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');
  onMount(()=>{
    innerPageRoute.set(pageRoute);
  })
</script>

<h1>Fourier Series Notes - Intro</h1>
<p> Fourier Series is a method to decompose a function to a different representation.
 To understand Fourier Series, we will first go over inner product. With inner product, we can define orthogonality. Using orthogonality, we will then can define basis and vector decomposition. And then finally, We will learn how to decompose a function into a fourier series.
</p>

<ul>
  <li><a href="/signalProcessing/fourierSeries/innerProduct">Inner Product</a></li>
  <li><a href="/signalProcessing/fourierSeries/basis">Basis</a></li>
</ul>
