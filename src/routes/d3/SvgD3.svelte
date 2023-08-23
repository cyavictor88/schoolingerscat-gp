<script lang='ts'>
	import { onMount } from "svelte";
	import { svg1,svg2 } from "./svgs";

  let container: HTMLDivElement;
  let container2: HTMLDivElement;
  onMount(()=>{
    container.append(svg1()!);
    container2.append(svg2()!);
  })

</script>

<div bind:this={container} />
<div bind:this={container2} />