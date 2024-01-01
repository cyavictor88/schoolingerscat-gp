<script lang="ts">
	import { onMount } from 'svelte';
  import {SpaceShuttle} from './SpaceShuttle';
  let d3Div: HTMLDivElement;
  let d3Obj : SpaceShuttle;
  export let numEngineSet: number | null = null;
  onMount(()=>{
    d3Obj = new SpaceShuttle(numEngineSet);
    d3Div.append(d3Obj.svgNode!);
  })
</script>

<div bind:this={d3Div} />


