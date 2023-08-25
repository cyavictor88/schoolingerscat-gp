<script lang='ts'>
	import { onMount } from "svelte";
	import { svgF1,svg2,svg3 } from "./svgs";

  let div1: HTMLDivElement;
  let div2: HTMLDivElement;
  let div3 : HTMLDivElement;
  onMount(()=>{
    div1.append(svgF1()!);
    div2.append(svg2()!);
    div2.append(svg3()!);
  })

</script>

<div bind:this={div1} />
<div bind:this={div2} />
<div bind:this={div3} />

<svg width="300" height="200">
  <defs>
    <marker
      id="arrow2"
      markerUnits="strokeWidth"
      markerWidth="12"
      markerHeight="12"
      viewBox="0 0 12 12"
      refX="6"
      refY="6"
      orient="auto">
      <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #f00;"></path>
    </marker>
  </defs>

  </svg>