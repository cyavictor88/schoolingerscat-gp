<script lang='ts'>
	import { onMount } from "svelte";
  import { Universe } from "./Universe";
	let divUniverse: HTMLDivElement;
	let universe: Universe;

	onMount(() => {
			universe = new Universe(divUniverse);
			universe.start();
			universe.eventBroker.emit('setMathMeshes');


			return ()=>{
				if (divUniverse.firstChild) divUniverse.removeChild(divUniverse.firstChild);
			}
	});

</script>


<div bind:this={divUniverse} />

