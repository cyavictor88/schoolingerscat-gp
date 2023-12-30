<script lang='ts'>
  import SectionLayout from "$lib/components/Layout/SectionLayout.svelte";
  import { sectionRoute } from "./sectionRoute";
	import { afterUpdate } from "svelte";
	let topBox : HTMLDivElement;
  afterUpdate(()=> {topBox.scrollIntoView()})
</script>
<div bind:this={topBox}></div>
<SectionLayout sectionRoute={sectionRoute} >
  <slot />
</SectionLayout>
