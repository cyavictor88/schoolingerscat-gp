<script lang='ts'>
  import Part1 from "./Part1.svelte";
  import Part2 from "./Part2.svelte";
	import type { IRoute } from '$lib/components/Route/route';
  import { onMount } from 'svelte';
  import { pageRoute } from './pageRoute';
  import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
  import Title from "$lib/components/PageComp/Title.svelte";
  import Katex from "$lib/components/Katex/Katex.svelte";

  const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');

  onMount(()=>{ (async()=>{

    innerPageRoute.set(pageRoute);

  })();

  })

	import InnerProduct2D from './InnerProduct2D.svelte';
	import { pissy } from "./pixi/figure1";

</script>


<Title hLevel={1} id={'innerProduct'}>
  Inner Product
</Title>
<p>What is inner product? The inner product of 2 vectors indicates how closely aligned the 2 vectors are to each other. </p>
<p> In this page, We will start with explaining inner product of vectors in <Katex math={'\\mathbb{R}^2'}/>
, and end with explaining inner product of functions.</p>

<div> 
<Title hLevel={2} id={'innerProduct2D'} backgroudColor={'#00000011'}>
  Inner Product in <Katex math={'\\mathbb{R}^2'} />:
</Title>
<InnerProduct2D />
</div>


<Part1 />
<Part2 />