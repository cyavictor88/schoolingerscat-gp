<script lang="ts">
	import { onMount } from 'svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
  import { Universe } from './Universe';

	let divUniverse: HTMLDivElement;
	let universe: Universe;
  export let veca:[number,number,number] = [-4,4,-5];
  export let vecb:[number,number,number] = [4,3,5];
  export let vecc:[number,number,number] = [-1,2,3];
	export let zoomIn: boolean = false;

    // this.veca = new Vector(-1,2,3,0x008800);
    // this.vecb = new Vector(4,3,5,0x0000ff);
    // this.vecv = new Vector(-4,4,-5,0xff0000);
	onMount(() => {
		universe = new Universe(divUniverse,veca,vecb,vecc,zoomIn);
		universe.start();
		universe.eventBroker.emit('setMathMeshes');
		universe.eventBroker.emit('setRightHand');
		return () => {
			universe.eventBroker.removeAllListeners();
			if (divUniverse.firstChild) divUniverse.removeChild(divUniverse.firstChild);
		};
	});

</script>

<div bind:this={divUniverse} />