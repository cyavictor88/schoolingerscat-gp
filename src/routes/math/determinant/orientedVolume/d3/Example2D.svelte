<script lang="ts">
	import { onMount } from 'svelte';
  import {Example2D} from './Example2D';
  let d3Div: HTMLDivElement;
  let d3Obj : Example2D;
  onMount(()=>{
    d3Obj = new Example2D();
    d3Div.append(d3Obj.svgNode!);

  })
</script>

<div bind:this={d3Div} />


