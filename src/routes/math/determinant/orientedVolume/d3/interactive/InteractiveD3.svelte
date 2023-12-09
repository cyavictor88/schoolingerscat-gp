<script lang="ts">
	import { onMount } from 'svelte';
  import {InteractiveD3} from './InteractiveD3';
	import Latex from '$lib/components/Latex/Latex.svelte';
  import * as mj from 'mathjs';

  let d3Div: HTMLDivElement;
  let d3Obj : InteractiveD3 | null = null;
  export let vectors : number[][] = [[1,1],[-3,2]];
  export let showOrientation : boolean = true;
  export let zoomIn : boolean = false;
  onMount(()=>{
    d3Obj = new InteractiveD3(vectors, showOrientation, zoomIn);
    d3Div.append(d3Obj.svgNode!);

  })
</script>

<div style='display:flex; flex-flow: row nowrap'> 
  {#if d3Obj}
    <div>
      <p><Latex math={`\\color{red} \\vec{v_1}=[${d3Obj.vectors[0].x.toFixed(2)},${d3Obj.vectors[0].y.toFixed(2)}]^{\\mathsf{T}}`}/></p>
      <p><Latex math={`\\color{blue} \\vec{v_2}=[${d3Obj.vectors[1].x.toFixed(2)},${d3Obj.vectors[1].y.toFixed(2)}]^{\\mathsf{T}}`}/></p>
      <p><Latex math={'\\text{orientation}='}/> { mj.det(vectors) === 0 ? '0' : mj.det(vectors) > 0 ? '1':'-1'}</p>
      <label><input type="checkbox" bind:checked={d3Obj.snap2Grid} on:change={()=>{d3Obj?.eventBroker.emit('toggleSnap2Grid')}} disabled={false}>Snap to Grid</label>
    </div>
  {/if}
  <div bind:this={d3Div} />

</div>


