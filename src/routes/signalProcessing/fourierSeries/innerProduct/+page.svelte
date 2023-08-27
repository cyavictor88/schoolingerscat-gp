<script lang='ts'>
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

	import InnerProduct2D from './innerProduct2D/InnerProduct2D.svelte';
	import { SITE_COLOR } from "$lib/theme/colors";

</script>


<Title hLevel={1} id={'innerProduct'}>
  Inner Product
</Title>
<p>What is inner product? The inner product of 2 vectors indicates how closely aligned the 2 vectors are to each other. </p>
<p> In this page, We will start with explaining inner product of vectors in <Katex math={'\\mathbb{R}^2'}/>
, and end with explaining inner product of functions.</p>

<div> 
<Title hLevel={2} id={'innerProduct2D'} backgroudColor={SITE_COLOR.TitleBG}>
  Inner Product in <Katex math={'\\mathbb{R}^2'} />:
</Title>
<InnerProduct2D />
</div>


