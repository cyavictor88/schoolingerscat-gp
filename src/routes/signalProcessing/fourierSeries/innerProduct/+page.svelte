<script lang='ts'>
  import Part1 from "./Part1.svelte";
  import Part2 from "./Part2.svelte";
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

<h1>inner product</h1>
<Part1 />
<Part2 />