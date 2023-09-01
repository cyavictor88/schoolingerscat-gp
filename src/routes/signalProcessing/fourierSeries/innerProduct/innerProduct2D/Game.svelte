<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import Katex from '$lib/components/Katex/Katex.svelte';
	import { GameObj } from './GameObj';
	import Arrow from './Arrow.svelte';
	import { setUpCircle } from './circle';
	import { SITE_COLOR } from '$lib/theme/colors';
	let game = new GameObj();
	let axisFontSize = 20;
	let circleRef_veca: SVGCircleElement;
	let circleRef_vecb: SVGCircleElement;
	let snap2Grid: boolean = false;
	let fixedRadius: boolean = false;
	// Declare the x (horizontal position) scale.
	$: xScale = game.xScale; //d3.scaleLinear().domain(game.xDomain).range([game.marginLeft, game.width - game.marginRight]);
	$: yScale = game.yScale; //d3.scaleLinear().domain(game.yDomain).range([game.height - game.marginBottom, game.marginTop]);
	$: drawLine = d3
		.line<{ x: number; y: number }>()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y));
	$: drawCurve = (context: d3.Path) => {
		context.moveTo(
			xScale(game.curveThetaRadius * Math.cos(game.theta_a)),
			yScale(game.curveThetaRadius * Math.sin(game.theta_a))
		); // move current point to ⟨10,10⟩
		context.quadraticCurveTo(
			xScale(1.2 * game.curveThetaRadius * Math.cos(game.theta_ab)),
			yScale(1.2 * game.curveThetaRadius * Math.sin(game.theta_ab)),
			xScale(game.curveThetaRadius * Math.cos(game.theta_b)),
			yScale(game.curveThetaRadius * Math.sin(game.theta_b))
		); // draw an arc, the turtle ends up at ⟨194.4,108.5⟩
		return context; // not mandatory, but will make it easier to chain operations
	};
	// $: d3.select(circleRef_veca).call(   (element:any)=>{dragC(element,game)});
	onMount(() => {
		// game = setUpCircle(d3.select(circleRef_veca) as any, game);
		function dragStart(this: SVGCircleElement, event: d3.D3DragEvent<SVGCircleElement, any, any>) {
			d3.select(this).raise().classed('active', true);
		}

		function dragging(this: SVGCircleElement, event: d3.D3DragEvent<SVGCircleElement, any, any>) {

			let svgx = event.x;
			let svgy = event.y;
			if(svgx===0 && svgy===0){
					svgx=0.0001
					svgy=0.0001
				}
			// const snapGrid = d3.select(this).attr('data-snap2grid');
			if(snap2Grid){
				let gridx = Math.round(game.xScale.invert(event.x));
				let gridy = Math.round(game.yScale.invert(event.y));
				if(gridx===0 && gridy===0){
					gridx=0.5
					gridy=0.5
				}
				svgx = game.xScale(gridx);
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

		d3.select(circleRef_veca).call(dragBehavior as any);
		d3.select(circleRef_vecb).call(dragBehavior as any);
	});
	let circleMouseOver = function (ref: any) {
		d3.select(ref).transition().duration(499).attr('r', 15);
	};
	let circleMouseLeave = function (ref: any) {
		d3.select(ref).transition().duration(499).attr('r', 10);
	};
	$: realTheta = (game.calcAngleBetween(game.veca,game.vecb)*180/Math.PI).toFixed(3);

	$: if(fixedRadius){
		game.xDomain=[-2,2];
		game.yDomain=[-2,2];
		game.fixedRadius(fixedRadius);
 	} else {
		game.xDomain=[-6,6];
		game.yDomain=[-6,6];
		game.fixedRadius(fixedRadius);
	}
	$: if(snap2Grid) {

		let gridx = Math.round(game.xScale.invert(parseFloat(d3.select(circleRef_veca).attr('cx'))));
		let svgx = game.xScale(gridx);
		let gridy = Math.round(game.yScale.invert(parseFloat(d3.select(circleRef_veca).attr('cy'))));
		let svgy = game.yScale(gridy);
		d3.select(circleRef_veca).attr('cx', svgx).attr('cy', svgy);
		game.veca = { x: game.xScale.invert(svgx), y: game.yScale.invert(svgy) };

		gridx = Math.round(game.xScale.invert(parseFloat(d3.select(circleRef_vecb).attr('cx'))));
		svgx = game.xScale(gridx);
		gridy = Math.round(game.yScale.invert(parseFloat(d3.select(circleRef_vecb).attr('cy'))));
		svgy = game.yScale(gridy);
		d3.select(circleRef_vecb).attr('cx', svgx).attr('cy', svgy);
		game.vecb = { x: game.xScale.invert(svgx), y: game.yScale.invert(svgy) };
		game.calc_thetas();



	};
</script>
<div style='background: {SITE_COLOR.CompRouteDefaultBG}; width:{game.width+game.marginLeft}px;'>
<h4>Interactive Demo:  (drag the vectors' arrow head around)</h4>
<svg width={game.width} height={game.height}  overflow="visible">


	<polygon points={game.trianglePathString} fill='brown' fill-opacity='0.2' />

	<foreignObject
		x=10
		y=0
		width="200"
		height="1"
		overflow="visible"
		style="font-size: 14px;"
	>
	<div>
		<p><Katex math={`\\color{red} \\|\\vec{a}\\|=${game.vecMag(game.veca).toFixed(2)}`}/></p>
		<p><Katex math={`\\color{blue} \\|\\vec{b}\\|=${game.vecMag(game.vecb).toFixed(2)}`}/></p>
		<p><Katex math={`<\\vec{a},\\vec{b}>=${game.calcInnerProduct().toFixed(2)}`}/></p>
		<p><Katex math={`\\frac{< \\vec{a},\\vec{b}>}{  \\| \\vec{a}  \\| \\|\\vec{b}\\|} = \\color{green}${(game.calcInnerProduct()/(game.vecMag(game.veca))/(game.vecMag(game.vecb))).toFixed(3)}`}/></p>
		<p><Katex math={`cos(\\theta)=\\color{green}${Math.cos(game.calcAngleBetween(game.veca,game.vecb)).toFixed(3)}`}/></p>
		<p><Katex math={'\\theta'}/>= {(game.calcAngleBetween(game.veca,game.vecb)*180/Math.PI).toFixed(3)}</p>
		<label><input type="checkbox" bind:checked={snap2Grid} disabled={false}>Snap to Grid</label>
		<br />
		<label><input type="checkbox" bind:checked={fixedRadius} disabled={false}>Fixed Radius = 1</label>
	</div>

	</foreignObject>


	<foreignObject
		x={game.veca.x >= 0? xScale(game.veca.x) : xScale(game.veca.x)}
		y={yScale(game.veca.y)}
		width="100"
		height="1"
		overflow="visible"
		style="font-size: 12px;"
	>
	<div>
		<p><Katex math={`\\color{red}${game.vecStr(game.veca)}`}/></p>
	</div>

	</foreignObject>

	<foreignObject
		x={game.vecb.x >= 0? xScale(game.vecb.x) : xScale(game.vecb.x)}
		y={yScale(game.vecb.y)}
		width="100"
		height="1"
		overflow="visible"
		style="font-size: 12px;"
	>
	<div>
		<p><Katex math={`\\color{blue}${game.vecStr(game.vecb)}`}/></p>
	</div>

	</foreignObject>



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
		x={xScale(1.3 * game.curveThetaRadius * Math.cos(1 * game.theta_ab)).toString()}
		y={yScale(1.3 * game.curveThetaRadius * Math.sin(1 * game.theta_ab)).toString()}
		width="100"
		height="1"
		overflow="visible"
		style="font-size: 12px;"
	>
		<div style="transform: translateY(-50%);"><Katex math={`\\theta=${realTheta}`} /></div>
	</foreignObject>

	<path stroke="black" fill="none" d={drawCurve(d3.path()).toString()} />
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<circle
		class="movingDot"
		bind:this={circleRef_veca}
		cx={xScale(game.veca.x)}
		cy={yScale(game.veca.y)}
		r="10"
		d="veca"
		style="cursor:pointer;"
		fill='red'
		fill-opacity='0.2'
		data-snap2grid={snap2Grid}
		on:mouseover={() => circleMouseOver(circleRef_veca)}
		on:mouseleave={() => circleMouseLeave(circleRef_veca)}
	/>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<circle
		class="movingDot2"
		bind:this={circleRef_vecb}
		cx={xScale(game.vecb.x)}
		cy={yScale(game.vecb.y)}
		r="10"
		d="vecb"
		style="cursor:pointer;"
		fill='blue'
		fill-opacity='0.2'
		data-snap2grid={snap2Grid}
		on:mouseover={() => circleMouseOver(circleRef_vecb)}
		on:mouseleave={() => circleMouseLeave(circleRef_vecb)}
	/>

</svg>
</div>

<style>
</style>
