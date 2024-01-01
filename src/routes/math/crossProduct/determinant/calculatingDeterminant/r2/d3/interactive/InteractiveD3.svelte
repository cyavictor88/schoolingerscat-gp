<script lang="ts">
	import { onMount } from 'svelte';
	import { InteractiveD3, RowOp } from './InteractiveD3';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import * as mj from 'mathjs';


	let d3Div: HTMLDivElement;
	let d3Obj: InteractiveD3 | null = null;

	export let vectors: number[][] = [
		[3, 1],
		[-3, 2]
	];
	export let showOrientation: boolean = true;
	export let zoomIn: boolean = false;
	export let rowOp: RowOp = RowOp.Swap;

	let v1 = { x: vectors[0][0], y: vectors[0][1] };
	let v2 = { x: vectors[1][0], y: vectors[1][1] };

	let c1 :number | null = 1;
	let c2 :number | null = 1;
	let swapRow = false;
	let det = mj.det([vectors[0], vectors[1]]);
	let detString = '';
	let area = '';

	onMount(() => {

		d3Obj = new InteractiveD3(vectors, showOrientation, zoomIn, rowOp);

		d3Div.append(d3Obj.svgNode!);
		d3Obj.eventBroker.addListener('newCirclesLocation', (newVecs) => {
			v1 = {...newVecs[0]};
			v2 = {...newVecs[1]};
			det = mj.det([
				[v1.x, v1.y],
				[v2.x, v2.y]
			]);
			detString = det.toFixed(2);
			while (detString.length <= 4) {
				detString = '0' + detString;
			}
			area = Math.abs(det).toFixed(2);
			while (area.length <= 4) {
				area = '0' + area;
			}
		});
	});

	$: {
		if( c1 !== null && c2 !== null && d3Obj){
			d3Obj.eventBroker.emit('mult',c1,c2);
		}
	}
</script>

<div style="display:flex; flex-flow: row nowrap; gap:10px;">
	{#if d3Obj}
		<div>
			{#if !swapRow}
				<p>
					<Latex
						math={`M 
                     =
                     \\begin{bmatrix}
                    \\color{red} a_1 & \\color{red} a_2 \\\\
                    \\color{blue}b_1 & \\color{blue} b_2 \\\\
                    \\end{bmatrix} 
                      `}
					/>
				</p>
			{:else}
				<p>
					<Latex
						math={`M' 
                     =
                     \\begin{bmatrix}
                    \\color{blue}b_1 & \\color{blue} b_2 \\\\
                    \\color{red} a_1 & \\color{red} a_2 \\\\
                    \\end{bmatrix} 
                      `}
					/>
				</p>
			{/if}

			{#if rowOp === RowOp.Swap || rowOp === RowOp.All}
				<label
					><input
						type="checkbox"
						bind:checked={swapRow}
						on:change={() => {
							d3Obj?.eventBroker.emit('swapRow');
						}}
						disabled={false}
					/>Swap Row</label
				>
			{/if}
			{#if rowOp === RowOp.Mult || rowOp === RowOp.All}
				<label>
					Multiply <Latex math={'\\color{red}\\vec{a}'}/> by:
					<input
						style='width: 40px;'
						type="number"
						bind:value={c1}
						disabled={false}/>
				</label>
				<br />
				<label>
					Multiply <Latex math={'\\color{blue}\\vec{b}'}/> by:
					<input
						style='width: 40px;'
						type="number"
						bind:value={c2}
						disabled={false}/>
				</label>
				<button on:click={()=>{
					d3Obj?.eventBroker.emit('reset');
					c1 = 1;
					c2 = 1;
				}}>Reset Vectors</button>
			{/if}

		</div>
		<div>
			<!-- <p>{v0}</p> -->

      {#if !swapRow}
			<p style="width:200px">
				<Latex
					math={`\\color{red} \\vec{a}=[${v1.x.toFixed(2)},${v1.y.toFixed(2)}]`}
				/>
			</p>
			<p>
				<Latex
					math={`\\color{blue} \\vec{b}=[${v2.x.toFixed(2)},${v2.y.toFixed(2)}]`}
				/>
			</p>
      {:else}
			<p>
				<Latex
					math={`\\color{blue} \\vec{b}=[${v1.x.toFixed(2)},${v1.y.toFixed(2)}]`}
				/>
			</p>
      <p style="width:200px">
				<Latex
					math={`\\color{red} \\vec{a}=[${v2.x.toFixed(2)},${v2.y.toFixed(2)}]`}
				/>
			</p>
      {/if}
			<p>
				<Latex
					math={`\\text{orientation}=${
						det === 0 ? '0' : det > 0 ? '\\color{red}+1' : '\\color{black}-1'
					}`}
				/>
			</p>

			<p style={det === 0 ? 'color:black' : det > 0 ? 'color: red' : 'color: black'}>
				{det === 0 ? 'no volume/orientation ' : det > 0 ? '(counter-clockwise)' : '(clockwise)'}
			</p>
			<p>
				Determinant = <span
					style={det === 0 ? 'color:black' : det > 0 ? 'color: red' : 'color: black'}
					>{detString}</span
				>
			</p>
			<p>Volume(Area) = {area}</p>
			<label
				><input
					type="checkbox"
					bind:checked={d3Obj.snap2Grid}
					on:change={() => {
						d3Obj?.eventBroker.emit('toggleSnap2Grid');
					}}
					disabled={false}
				/>Snap to Grid</label
			>
		</div>
	{/if}
	<div bind:this={d3Div} />
</div>

<style>
	p {
		margin: 5px;
	}
</style>
