<script lang="ts">
	import { onMount } from 'svelte';
  import {Example2D} from './Example2D';
  let d3Div: HTMLDivElement;
  let d3Obj : Example2D;
  export let vectors : number[][] = [[1,1],[-3,2]];
  onMount(()=>{
    d3Obj = new Example2D(vectors);
    d3Div.append(d3Obj.svgNode!);

  })
</script>

<div bind:this={d3Div} />


