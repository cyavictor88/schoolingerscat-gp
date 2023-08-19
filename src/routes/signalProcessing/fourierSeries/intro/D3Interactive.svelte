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
  let d3Svg: Element;


  onMount(()=>{
    const fs = new FourierSeries((x)=>12*Math.cos(2*x)*Math.sin(x) +16,2*Math.PI,30);
    data = fs.getFSFunc(-4,4,100);
    oriData = fs.getOriginalFunc(-4,4,100);
  });
  const zoomBehavior = d3.zoom()
      .scaleExtent([0, 10])
      .on('zoom', zoomed);
  function zoomed(event: d3.D3ZoomEvent<Element,any>) {
    // console.log(event.transform.rescaleX(xScale))
    const new_xScale = event.transform.rescaleX(xScale);
    // const new_xScale = d3.zoomTransform(d3Svg).rescaleX(xScale);
    // const orixScale = xScale;
    // xScale = d3.zoomTransform(d3Svg).rescaleX(xScale);
    xAxis.scale(new_xScale);
    d3.select(gx).call(xAxis);
    d3.selectAll('.line').datum<{ x: number; y: number }[]>(data.filter(d=>d.x >= new_xScale.domain()[0] && d.x<=new_xScale.domain()[1] )).attr('d', line.x(d => new_xScale(d.x)));
  }
  $: xScale = d3.scaleLinear([Math.min(...data.map(d=>d.x)), Math.max(...data.map(d=>d.x))], [marginLeft, width - marginRight]).clamp(true);
  $: yScale = d3.scaleLinear([Math.min(...data.map(d=>d.y)), Math.max(...data.map(d=>d.y))], [height - marginBottom, marginTop]).clamp(true);
  $: line = d3.line<{x:number,y:number}>((d, i) => xScale(d.x), (d)=>yScale(d.y));
  // $: yAxis = d3.axisLeft(yScale);
  $: xAxis = d3.axisBottom(xScale);
  $: d3.select(gy).call(d3.axisLeft(yScale));
  $: d3.select(gx).call(d3.axisBottom(xScale));
  $: d3.select(d3Svg).call(zoomBehavior);
</script>
<svg bind:this={d3Svg} width={width} height={height} >
  <g bind:this={gx} transform="translate(0,{height - marginBottom})" />
  <g bind:this={gy} transform="translate({marginLeft},0)" />

  <path class ='line' fill="none" stroke="currentColor" stroke-width="3.5" d={line(data)} color='red' />
  <path class ='line' fill="none" stroke="currentColor" stroke-width="1.5" d={line(oriData)} color='blue' />

  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle name={i.toString()} cx={xScale(d.x)} cy={yScale(d.y)} r="2.5"  color='red'/>
    {/each}

  </g>
</svg>