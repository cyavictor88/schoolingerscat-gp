<script lang='ts'>
  import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import { FourierSeries } from './exampleFunc/FourierSeries';

  export let data = [{x:-1.5,y:2},{x:-.5,y:4},{x:0.5,y:-2},{x:1.5,y:9}];
  export let oriData = [{x:-1.5,y:2},{x:-.5,y:4},{x:0.5,y:-2},{x:1.5,y:9}];
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 30;
  export let marginLeft = 40;

  let gx: SVGGElement;
  let gy: SVGGElement;


  onMount(()=>{
    const fs = new FourierSeries((x)=>12*Math.cos(2*x)*Math.sin(x) +16,2*Math.PI,30);
    data = fs.getFSFunc(-4,4,100);
    oriData = fs.getOriginalFunc(-4,4,100);
  });

  $: x = d3.scaleLinear([Math.min(...data.map(d=>d.x)), Math.max(...data.map(d=>d.x))], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear([Math.min(...data.map(d=>d.y)), Math.max(...data.map(d=>d.y))], [height - marginBottom, marginTop]);
  $: line = d3.line<{x:number,y:number}>((d, i) => x(d.x), (d)=>y(d.y));
  $: d3.select(gy).call(d3.axisLeft(y));
  $: d3.select(gx).call(d3.axisBottom(x));
</script>
<svg width={width} height={height}>
  <g bind:this={gx} transform="translate(0,{height - marginBottom})" />
  <g bind:this={gy} transform="translate({marginLeft},0)" />
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} color='red' />
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(oriData)} color='blue' />
  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle name={i.toString()} cx={x(d.x)} cy={y(d.y)} r="2.5"  color='red'/>
    {/each}

  </g>
</svg>