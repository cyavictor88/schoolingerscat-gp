<script lang='ts'>
  import SubjectLayout from "$lib/components/Layout/SubjectLayout.svelte";
  import { subjectRoute } from "./subjectRoute";
	import { onMount } from "svelte";


	let topBox : HTMLDivElement;
  onMount(()=>{
    topBox.scrollIntoView();
    console.log('ley out scroll into view',topBox);
    console.log('onMount cross product');

  })

</script>
<div bind:this={topBox}></div>
	
<SubjectLayout subjectRoute={subjectRoute} >
  <slot />
</SubjectLayout>
