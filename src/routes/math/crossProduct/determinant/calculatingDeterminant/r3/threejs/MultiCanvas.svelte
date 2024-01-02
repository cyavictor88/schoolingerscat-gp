<script lang="ts">
	import { onMount } from 'svelte';
	import { Universe } from './Universe';
	import { Universe2 } from './Universe2';
	import { Universe3 } from './Universe3';
	import { Multiverse } from './Multiverse';
	import * as mj from 'mathjs';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { RowSumArea as FigRowSumArea } from '../d3/RowSumArea';
	// import { Universe4 } from './Universe4';
	let grandDiv: HTMLDivElement;
	let canvasHeight: number = 0;

	let universe1Div: HTMLDivElement | HTMLSpanElement;
	let universe2Div: HTMLDivElement | HTMLSpanElement;
	let universe3Div: HTMLDivElement | HTMLSpanElement;
	// let universe4Div: HTMLDivElement|HTMLSpanElement;
	let universe3: Universe3;
	// let universe4:Universe4;
	let canvas: HTMLCanvasElement;

	let d3FigRowSumArea: FigRowSumArea;
	let figRowSumAreaD3: HTMLDivElement;
	onMount(() => {

		const vecv = [2, 3, -1];
		const veca = [-4, -1, -1];
		const vecb = [-3, -1, 3];

		const rowop = mj.add(mj.multiply(2, vecv), vecb) as number[];

		const universe = new Universe(universe1Div, vecv, veca, vecb);
		const universe2 = new Universe2(universe2Div, vecv, veca, rowop as number[]);
		universe3 = new Universe3(universe3Div, vecv, veca, vecb, rowop as number[]);
		universe3.vecv_vecb_plane.mesh.visible = true;
		// universe4 = new Universe4(universe4Div, vecv,  vecb, rowop as number[]);
		const multiverse = new Multiverse(canvas, [universe, universe2, universe3]);
		universe.eventBroker.emit('setMathMeshes');
		universe2.eventBroker.emit('setMathMeshes');
		universe3.eventBroker.emit('setMathMeshes');
		// universe4.eventBroker.emit('setMathMeshes');
		multiverse.start();
		d3FigRowSumArea = new FigRowSumArea(
			{ x: vecv[0], y: vecv[1] },
			{ x: vecb[0], y: vecb[1] },
			{ x: rowop[0], y: rowop[1] }
		);
		figRowSumAreaD3.append(d3FigRowSumArea.svgNode!);

		canvasHeight = grandDiv.clientHeight;

	});
</script>

<div bind:this={grandDiv}
	style="position: relative; width:1004px; display:flex; flex-flow: row wrap; border: 1px solid blue"
>
	<canvas id="c" bind:this={canvas} style='height: {canvasHeight}px;'/>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe1Div}
		>Figure 4.a: <Latex math={'M'} /></span
	>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe2Div}
		>Figure 4.b: <Latex math={`M'`} /></span
	>
	<div style="width:1000px;">
		<p>Let's prove those two parallelepipeds have the same volume.</p>
		<p><u><b>Step 2 Proof:</b></u></p>

		<p>
			In Figure 4.c, we place the two parallelepipeds together and the yellow plane is formed by <Latex
				math={'\\vec{v}'}
			/> and <Latex math={'\\vec{b}'} />, you can see that <Latex math={`\\vec{b'}`} /> is also on the
			same plane. This is because when you do row operations involving two vectors, you are only operating
			on the plane that is formed by this two vectors, so the result vector also resides on the same
			plane.
		</p>
		<p>
			With <Latex math={'\\vec{v}'} />, <Latex math={'\\vec{b}'} />, and <Latex
				math={`\\vec{b'}`}
			/> being coplanar. You can see that
			<!-- svelte-ignore a11y-invalid-attribute -->
			despite the base shapes of the parallelepipeds are different.
			<a
				href="#"
				on:click={() => {
					universe3.eventBroker.emit('toggleShowHeight');
				}}>Thse two parallelepipeds have the same height</a
			>.
		</p>
		<p>
			So if we can show that those two parallelepipeds have the same area, then we know they have
			the same volume, which then proves that row operations does not change the volume of a matrix
			from by 3 different vectors.
		</p>

		<p>
			To show the two parallelepipeds have the same area, we just need to show that the area formed
			by <Latex math={'\\vec{v}'} /> and <Latex math={'\\vec{b}'} /> is equal to the area formed by <Latex
				math={'\\vec{v}'}
			/> and <Latex math={`\\vec{b'}`} />
		</p>

		<p>
			To show this fact, first we know <Latex math={'\\vec{v}'} />, <Latex math={'\\vec{b}'} />, and <Latex
				math={`\\vec{b'}`}
			/> are coplanar, so we can just focus on the 2D plane they formed as shown in Figure 4.d. You can
			see that even though <Latex math={`\\vec{b}`} /> is stretched to become <Latex
				math={`\\vec{b'}`}
			/>
			, the height for the
			<a
				href="#"
				on:click={() => {
					d3FigRowSumArea.eventBroker.emit('toggleShowOldArea');
				}}
				>old area
			</a>

			and
			<a
				href="#"
				on:click={() => {
					d3FigRowSumArea.eventBroker.emit('toggleShowNewArea');
				}}
				>new area
			</a>

			are the same, which implies that they have the same area.
		</p>


	</div>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe3Div}
		>Figure 4.c</span
	>
	<!-- <span style="width:500px; height:400px; position:relative;" bind:this={universe4Div} >Figure 4.d</span> -->
	<div
		style="width:500px; height:400px; position:relative; display:flex; flex-flow: column nowrap;"
		bind:this={figRowSumAreaD3}
	>
		Figure 4.d
	</div>
	<p>
		Concluding Step 2 Proof, we first show that after a row operation, the base parallelogram of
		the parallelepiped is changed, but the height of the parallelepiped remains the same. Second, we show that the
		base parallelograms have the same areas. So with area and height being the same before and
		after a row operation, the volume of the parallelepiped also
		remains the same before and after a row operation.
	</p>
</div>

<style>
	#c {
		border: 1px solid yellow;
		position: absolute;
		width: 1000px;
		/* height: var(--post-height); */
		/* width:100%;  */
		/* height:100%; */
		/* z-index:0; */
	}
	p {
		position: relative;
	}
	span {
		border: 1px solid grey;
	}
</style>
