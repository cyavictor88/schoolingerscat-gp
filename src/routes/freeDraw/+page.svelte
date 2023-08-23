<script>
	import { onMount } from 'svelte';
	import { World } from './world/World';
	import EventEmitter from 'eventemitter3';

	let eventBroker = new EventEmitter();
	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;

	const mouseMove = (/** @type {MouseEvent} */ eve) => {
		eventBroker.emit('mouseMove', eve);
	};

	/**
	 * @type {HTMLDivElement}
	 */
	let div;
	/**
	 * @type {World}
	 */
	let world;
	onMount(() => {
		(async function(){
			world = new World(div, eventBroker);
			world.start();
			eventBroker.emit('hello', { data: 'meow' });
			await world.addMathMesh();
		})()
		return () => {
			world.freeDrawLines.cleanupWindowEventListener();
			if (div.firstChild) div.removeChild(div.firstChild);
		};
	});

	let addmm = mathmesh();
	function mathmesh() {}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={div} on:mousemove={mouseMove} />
<canvas bind:this={canvas} width={600} height={800} />
<h1>free draw</h1>
{#await addmm}
	I'm the child and I loaded .
{/await}
