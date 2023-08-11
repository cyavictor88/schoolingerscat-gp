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
  onMount(()=>{
    innerPageRoute.set(pageRoute);
  })

	import InnerProduct2D from './InnerProduct2D.svelte';

</script>


<Title hLevel={1} id={'innerProduct'}>
  Inner Product
</Title>

<div> 
<Title hLevel={2} id={'innerProduct2D'}>
  Inner Product in <Katex math={'\\mathbb{R}^2'} />:
</Title>
<InnerProduct2D />
</div>


<Part1 />
<Part2 />