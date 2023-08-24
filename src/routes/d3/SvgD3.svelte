<script lang='ts'>
	import { onMount } from "svelte";
	import { svg1,svg2,svg3 } from "./svgs";

  let div1: HTMLDivElement;
  let div2: HTMLDivElement;
  let div3 : HTMLDivElement;
  onMount(()=>{
    div1.append(svg1()!);
    div2.append(svg2()!);
    div2.append(svg3()!);
  })

</script>

<div bind:this={div1} />
<div bind:this={div2} />
<div bind:this={div3} />