<script lang='ts'>
  import * as d3 from 'd3';
	import { onMount } from 'svelte';
  import Katex from '$lib/components/Katex/Katex.svelte';
	import { GameObj } from './GameObj';
	import Arrow from './Arrow.svelte';
	import { dragC } from './circle';
  let game = new GameObj();
  let axisFontSize = 20;
  let circleRef :SVGCircleElement;


    // Declare the x (horizontal position) scale.
  $: xScale = d3.scaleLinear().domain(game.xDomain).range([game.marginLeft, game.width - game.marginRight]);
  $: yScale = d3.scaleLinear().domain(game.yDomain).range([game.height - game.marginBottom, game.marginTop]);
  $: drawLine = d3.line<{ x: number, y: number }>().x(d => xScale(d.x)).y(d => yScale(d.y))
  $: drawCurve = (context: d3.Path)=> {
    context.moveTo(xScale(game.radius * Math.cos(game.theta_a)), yScale(game.radius * Math.sin(game.theta_a))); // move current point to ⟨10,10⟩
    context.quadraticCurveTo(xScale(1.2 * game.radius * Math.cos(game.theta_ab)), yScale(1.2 * game.radius * Math.sin(game.theta_ab)), xScale(game.radius * Math.cos(game.theta_b)), yScale(game.radius* Math.sin(game.theta_b))); // draw an arc, the turtle ends up at ⟨194.4,108.5⟩
    return context; // not mandatory, but will make it easier to chain operations
  }
  $: d3.select(circleRef).call(dragC as any);
</script>
<svg width={game.width} height={game.height} style="border: 1px black solid">
  <Arrow color={'red'} />
  <Arrow color={'blue'} />
  {#each Array(game.xTicks.length-2) as _, index (index)}
    <path stroke='grey' d={drawLine([{ x: game.xTicks[index+1], y: game.yTicks[0] },{ x: game.xTicks[index+1], y: game.yTicks[game.yTicks.length - 1] }])}  />
  {/each}
  {#each Array(game.yTicks.length-2) as _, index (index)}
    <path stroke='grey' d={drawLine([{ x: game.xTicks[0], y: game.yTicks[index+1]},{  x: game.xTicks[game.xTicks.length-1], y: game.yTicks[index+1] }])}  />
  {/each}
  <path stroke ='black' d={drawLine([{x:game.xDomain[0],y:0},{x:game.xDomain[1],y:0}])} />
  <path stroke ='black' d={drawLine([{y:game.yDomain[0],x:0},{y:game.yDomain[1],x:0}])} />
  <text text-anchor='start' x={xScale(game.xDomain[1])} y={yScale(0)} dy={yScale.invert(axisFontSize/2)} style='font-size:{axisFontSize}px;'>X</text>
  <text text-anchor='middle' x={xScale(0)} y={yScale(game.yDomain[1]+0.1)} style='font-size:{axisFontSize}px;'>Y</text>

  <path stroke='red' d={drawLine([game.vec0,game.veca])} marker-end='url(#arrowred)'/>
  <path stroke='blue' d={drawLine([game.vec0,game.vecb])} marker-end='url(#arrowblue)'/>

  <foreignObject 
    x={xScale(1.3 * game.radius * Math.cos(1.*game.theta_ab)).toString()} 
    y={yScale(1.3 * game.radius * Math.sin(1.*game.theta_ab)).toString()}  
    width="1" height="1" overflow='visible'
    style='font-size: 12px;'
    >
    <div style='transform: translateY(-50%);'><Katex  math={'\\theta'} /></div>
  </foreignObject>

  <path stroke='black' fill='none' d={drawCurve(d3.path()).toString()} />
  <circle
    bind:this={circleRef}
    class="draggable-circle"
    cx="100"
    cy="100"
    r="5"
  />

  <!-- svg.append('path')
    .style("stroke", "black")
    .style("fill", "none")
    .attr("d", drawCurve(d3.path()).toString()) -->

</svg>
