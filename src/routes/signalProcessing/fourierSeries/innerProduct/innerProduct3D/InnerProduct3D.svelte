<script lang="ts">
	import Katex from '$lib/components/Katex/Katex.svelte';
	import { onMount } from 'svelte';
	import { Universe } from './fig4/Universe';
	import EventEmitter from 'eventemitter3';

	let divFig4: HTMLDivElement;
	let universe: Universe;

	let eventBroker = new EventEmitter();
	onMount(() => {
		(async function () {
			universe = new Universe(divFig4, eventBroker);
			universe.start();
			eventBroker.emit('hello', { data: 'meow' });
			await universe.addMathMesh();
		})();
		return () => {
			if (divFig4.firstChild) divFig4.removeChild(divFig4.firstChild);
		};
	});
</script>

<p>
	Let's expand inner product for vectors in <Katex math={'\\mathbb{R}^2'} /> to <Katex
		math={'\\mathbb{R}^3'}
	/> and see if the relation between the angle and inner product equation still holds in 3D:
</p>
<p>Inner product for 3D vectors is:</p>

<Katex
	displayMode={true}
	math={`<\\vec{a},\\vec{b}>:= 
\\left[\\begin{array}{ccc} a_x & a_y & a_z \\end{array}\\right]
\\left[\\begin{array}{c} b_x \\\\ b_y \\\\ b_z \\end{array}\\right]
= a_x\\,b_x+a_y\\,b_y+a_zb_z
`}
/>

<p>
	Figure 4 shows two <Katex math={'\\mathbb{R}^3'} /> vectors, <Katex math={'\\vec{a}'} /> and <Katex
		math={'\\vec{b}'}
	/>, with <Katex math={'d'} /> indicates the distance between two vectors.
</p>
<div bind:this={divFig4} />
