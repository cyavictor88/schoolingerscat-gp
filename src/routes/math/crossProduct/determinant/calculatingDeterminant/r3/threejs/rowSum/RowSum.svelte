<script lang="ts">
	import { onMount } from 'svelte';
	import { Universe } from './Universe';
	import { Universe2 } from './Universe2';
	import { Universe3 } from './Universe3';
	import { Multiverse } from './Multiverse';
	import * as mj from 'mathjs';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { RowSumArea } from '../../d3/RowSumArea';
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

	let d3RowSumArea: RowSumArea;
	let rowSumAreaD3: HTMLDivElement;
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
		universe3.eventBroker.emit('setRightHand');
		// universe2.eventBroker.emit('setMathMeshes');
		multiverse.start();
		d3RowSumArea = new RowSumArea(
			{ x: vecv[0], y: vecv[1] },
			{ x: vecb[0], y: vecb[1] },
			{ x: rowop[0], y: rowop[1] }
		);
		rowSumAreaD3.append(d3RowSumArea.svgNode!);

		canvasHeight = grandDiv.clientHeight;

	});
</script>

<div bind:this={grandDiv}
	style="position: relative; width:1004px; display:flex; flex-flow: row wrap; border: 1px solid blue"
>
<canvas id="c" bind:this={canvas} style='height: {canvasHeight}px;'/>
<div> 
<p>Suppose we have 3 vectors, <Latex math={`\\vec{v}, \\vec{a}, \\vec{b}`} /> as shown in Figure 2.a, and we put them together to form a matrix:</p>
<Latex center math={`M = 
	\\begin{bmatrix} 
	v_1 & v_2 & v_3 \\\\ 
	a_1 & a_2 & a_3 \\\\ 
	b_1 & b_2 & b_3 \\end{bmatrix}
	`}/>
<p>Now let's see what will happen to the volume of the this matrix(parallelepiped) if I do <Latex math={`row_3 \\rightarrow row_3 + 2 \\times row_1`} />:</p>
<p>
	<Latex center math={`row_3 \\rightarrow row_3 + 2 \\times row_1`} />
</p>
<br />
<p>

	<Latex center math={`\\Rightarrow M'
	= \\begin{bmatrix} 
	v_1 & v_2 & v_3 \\\\ 
	a_1 & a_2 & a_3 \\\\ 
	b_1 + 2 v_1 & b_2 +2 v_2& b_3 + 2 v_3 \\end{bmatrix}
	=
		\\begin{bmatrix} 
		v_1 & v_2 & v_3 \\\\ 
		a_1 & a_2 & a_3 \\\\ 
		b_1' & b_2' & b_3' \\end{bmatrix}
	`} />
</p>

<p>The result is shown in Figure 2.b</p>
</div>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe1Div}
		>Figure 2.a: <Latex math={'M'} /></span
	>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe2Div}
		>Figure 2.b: <Latex math={`M'`} /></span
	>
	<div style="width:1000px;">
		<p>Let's prove those two parallelepipeds have the same volume, or in other words <Latex math={`det(M)=det(M')`} /></p>
		<p><u><b>Proof:</b></u></p>

		<p>
			In Figure 2.c, we place the two parallelepipeds together and the yellow plane is formed by <Latex
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
				}}>These two parallelepipeds have the same height</a
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
			/> are coplanar, so we can just focus on the 2D plane they formed as shown in Figure 2.d. You can
			see that even though <Latex math={`\\vec{b}`} /> is stretched to become <Latex
				math={`\\vec{b'}`}
			/>
			, the height for the
			<a
				href="#"
				on:click={() => {
					d3RowSumArea.eventBroker.emit('toggleShowOldArea');
				}}
				>old area
			</a>

			and
			<a
				href="#"
				on:click={() => {
					d3RowSumArea.eventBroker.emit('toggleShowNewArea');
				}}
				>new area
			</a>

			are the same, which implies that they have the same area.
		</p>
		<p>Orientation: the 			<a
			href="#"
			on:click={() => {
				universe3.eventBroker.emit('toggleRightHand');
			}}>orientation</a
		> also remains the same because <Latex math={`\\vec{b'}`} /> is always co-plane with <Latex math={`\\vec{b}`} /> on the yellow area. 
		 </p>


	</div>
	<span style="width:500px; height:400px; position:relative;" bind:this={universe3Div}
		>Figure 2.c</span
	>
	<!-- <span style="width:500px; height:400px; position:relative;" bind:this={universe4Div} >Figure 2.d</span> -->
	<div
		style="width:500px; height:400px; position:relative; display:flex; flex-flow: column nowrap;"
		bind:this={rowSumAreaD3}
	>
		Figure 2.d
	</div>
	<p>
		In conclusion, we first show that after a row operation, the base parallelogram of
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
