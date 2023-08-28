<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import Katex from '$lib/components/Katex/Katex.svelte';
	import { GameObj } from './GameObj';
	import Arrow from './Arrow.svelte';
	import { setUpCircle } from './circle';
	let game = new GameObj();
	let axisFontSize = 20;
	let circleRef: SVGCircleElement;
	let circleRef2: SVGCircleElement;

	// Declare the x (horizontal position) scale.
	$: xScale = game.xScale; //d3.scaleLinear().domain(game.xDomain).range([game.marginLeft, game.width - game.marginRight]);
	$: yScale = game.yScale; //d3.scaleLinear().domain(game.yDomain).range([game.height - game.marginBottom, game.marginTop]);
	$: drawLine = d3
		.line<{ x: number; y: number }>()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y));
	$: drawCurve = (context: d3.Path) => {
		context.moveTo(
			xScale(game.radius * Math.cos(game.theta_a)),
			yScale(game.radius * Math.sin(game.theta_a))
		); // move current point to ⟨10,10⟩
		context.quadraticCurveTo(
			xScale(1.2 * game.radius * Math.cos(game.theta_ab)),
			yScale(1.2 * game.radius * Math.sin(game.theta_ab)),
			xScale(game.radius * Math.cos(game.theta_b)),
			yScale(game.radius * Math.sin(game.theta_b))
		); // draw an arc, the turtle ends up at ⟨194.4,108.5⟩
		return context; // not mandatory, but will make it easier to chain operations
	};
	// $: d3.select(circleRef).call(   (element:any)=>{dragC(element,game)});
	onMount(() => {
		// game = setUpCircle(d3.select(circleRef) as any, game);
		function dragStart(this: SVGCircleElement, event: d3.D3DragEvent<SVGCircleElement, any, any>) {
			d3.select(this).raise().classed('active', true);
		}

		function dragging(this: SVGCircleElement, event: d3.D3DragEvent<SVGCircleElement, any, any>) {

			let svgx = event.x;
			let svgy = event.y;
			const snapGrid = d3.select(this).attr('data-snap2grid');
			if(snapGrid){
				const gridx = Math.round(game.xScale.invert(event.x));
			 	svgx = game.xScale(gridx);
				const gridy = Math.round(game.yScale.invert(event.y));
			 	svgy = game.yScale(gridy);
			}
			d3.select(this).attr('cx', svgx).attr('cy', svgy);
			if (d3.select(this).attr('d') === 'veca') game.veca = { x: game.xScale.invert(svgx), y: game.yScale.invert(svgy) };
			else game.vecb = { x: game.xScale.invert(svgx), y: game.yScale.invert(svgy) };
			game.calc_thetas();
		}

		function dragEnd(this: SVGCircleElement, event: d3.D3DragEvent<SVGCircleElement, any, any>) {
			d3.select(this).classed('active', false);
		}
		const dragBehavior = d3
			.drag<SVGCircleElement, any>()
			.on('start', dragStart)
			.on('drag', dragging)
			.on('end', dragEnd);

		d3.select(circleRef).call(dragBehavior as any);
		d3.select(circleRef2).call(dragBehavior as any);
	});
	let circleMouseOver = function (ref: any) {
		d3.select(ref).transition().duration(499).attr('r', 10);
	};
	let circleMouseLeave = function (ref: any) {
		d3.select(ref).transition().duration(499).attr('r', 5);
	};
</script>

<svg width={game.width} height={game.height} style="border: 1px black solid">
	<Arrow color={'red'} />
	<Arrow color={'blue'} />
	{#each Array(game.xTicks.length - 2) as _, index (index)}
		<path
			stroke="grey"
			d={drawLine([
				{ x: game.xTicks[index + 1], y: game.yTicks[0] },
				{ x: game.xTicks[index + 1], y: game.yTicks[game.yTicks.length - 1] }
			])}
		/>
	{/each}
	{#each Array(game.yTicks.length - 2) as _, index (index)}
		<path
			stroke="grey"
			d={drawLine([
				{ x: game.xTicks[0], y: game.yTicks[index + 1] },
				{ x: game.xTicks[game.xTicks.length - 1], y: game.yTicks[index + 1] }
			])}
		/>
	{/each}
	<path
		stroke="black"
		d={drawLine([
			{ x: game.xDomain[0], y: 0 },
			{ x: game.xDomain[1], y: 0 }
		])}
	/>
	<path
		stroke="black"
		d={drawLine([
			{ y: game.yDomain[0], x: 0 },
			{ y: game.yDomain[1], x: 0 }
		])}
	/>
	<text
		text-anchor="start"
		x={xScale(game.xDomain[1])}
		y={yScale(0)}
		dy={yScale.invert(axisFontSize / 2)}
		style="font-size:{axisFontSize}px;">X</text
	>
	<text
		text-anchor="middle"
		x={xScale(0)}
		y={yScale(game.yDomain[1] + 0.1)}
		style="font-size:{axisFontSize}px;">Y</text
	>

	<path stroke="red" d={drawLine([game.vec0, game.veca])} marker-end="url(#arrowred)" />
	<path stroke="blue" d={drawLine([game.vec0, game.vecb])} marker-end="url(#arrowblue)" />

	<foreignObject
		x={xScale(1.3 * game.radius * Math.cos(1 * game.theta_ab)).toString()}
		y={yScale(1.3 * game.radius * Math.sin(1 * game.theta_ab)).toString()}
		width="1"
		height="1"
		overflow="visible"
		style="font-size: 12px;"
	>
		<div style="transform: translateY(-50%);"><Katex math={'\\theta'} /></div>
	</foreignObject>

	<path stroke="black" fill="none" d={drawCurve(d3.path()).toString()} />
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<circle
		class="movingDot"
		bind:this={circleRef}
		cx={xScale(2)}
		cy={yScale(4)}
		r="5"
		d="veca"
		style="cursor:pointer;"
		fill='red'
		fill-opacity='0.2'
		data-snap2grid={true}

		on:mouseover={() => circleMouseOver(circleRef)}
		on:mouseleave={() => circleMouseLeave(circleRef)}
	/>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<circle
		class="movingDot2"
		bind:this={circleRef2}
		cx={xScale(5)}
		cy={yScale(2)}
		r="5"
		d="vecb"
		style="cursor:pointer;"
		fill='blue'
		fill-opacity='0.2'
		data-snap2grid={true}
		on:mouseover={() => circleMouseOver(circleRef2)}
		on:mouseleave={() => circleMouseLeave(circleRef2)}
	/>


</svg>
<p>{Math.cos(game.theta_ab*2).toFixed(2)}</p>
<p>{180*(game.theta_ab*2)/Math.PI}</p>
<style>
</style>
