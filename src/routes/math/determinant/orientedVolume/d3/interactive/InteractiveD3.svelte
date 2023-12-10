<script lang="ts">
	import { onMount } from 'svelte';
  import {InteractiveD3} from './InteractiveD3';
	import Latex from '$lib/components/Latex/Latex.svelte';
  import * as mj from 'mathjs';

  let d3Div: HTMLDivElement;
  let d3Obj : InteractiveD3 | null = null;

  export let vectors : number[][] = [[3,1],[-3,2]];
  export let showOrientation : boolean = true;
  export let zoomIn : boolean = false;

  let v1 = {x:vectors[0][0],y:vectors[0][1]};
  let v2 = {x:vectors[1][0],y:vectors[1][1]};
  onMount(()=>{
    d3Obj =  new InteractiveD3(vectors, showOrientation, zoomIn);
    d3Div.append(d3Obj.svgNode!);
    d3Obj.eventBroker.addListener('newCirclesLocation',()=>{
      v1 = d3Obj?.vectors[0]!;
      v2 = d3Obj?.vectors[1]!;
    });

  })
  $: v0 = 1;
  $: vec0 = d3Obj?.vectors[0];
  $: vec1 = d3Obj?.vectors[1];
  $: if(d3Obj){
    // v1;
    v0 = d3Obj.vectors[0].x
  }
  $: f = v1

</script>

<div style='display:flex; flex-flow: row nowrap'> 
  {#if d3Obj}
    <div>
      <!-- <p>{v0}</p> -->
      <p><Latex math={`\\color{red} \\vec{v_1}=[${v1.x.toFixed(2)},${v1.y.toFixed(2)}]^{\\mathsf{T}}`}/></p>
      <p><Latex math={`\\color{blue} \\vec{v_2}=[${v2.x.toFixed(2)},${v2.y.toFixed(2)}]^{\\mathsf{T}}`}/></p>
      <p><Latex math={'\\text{orientation}='}/> { mj.det(vectors) === 0 ? '0' : mj.det(vectors) > 0 ? '1':'-1'}</p>
      <label><input type="checkbox" bind:checked={d3Obj.snap2Grid} on:change={()=>{d3Obj?.eventBroker.emit('toggleSnap2Grid')}} disabled={false}>Snap to Grid</label>
    </div>
  {/if}
  <div bind:this={d3Div} />

</div>


