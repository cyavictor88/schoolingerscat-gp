<script lang='ts'>
  import Part1 from "./Part1.svelte";
  import Part2 from "./Part2.svelte";
	import type { IRoute } from '$lib/components/Route/route';
  import { onMount } from 'svelte';
  import { pageRoute } from './pageRoute';
  import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
  import Title from "$lib/components/PageComp/Title.svelte";
  const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');
  onMount(()=>{
    innerPageRoute.set(pageRoute);
  })
  import Katex from "$lib/components/Katex/Katex.svelte";

</script>


<Title hLevel={1}>
  Inner Product
</Title>

<Title hLevel={2}>
  Inner Product in <Katex math={'\\mathbb{R}^2'} />:
</Title>

<Part1 />
<Part2 />