<script lang='ts'>
  import SectionLayout from "$lib/components/Layout/SectionLayout.svelte";
  import { sectionRoute } from "./sectionRoute";
</script>

<SectionLayout sectionRoute={sectionRoute} >
  <slot />
</SectionLayout>
