<script lang='ts'>
  import SectionLayout from "$lib/components/Layout/SectionLayout.svelte";
  import { pageRoute } from "./pageRoute";
</script>

<SectionLayout pageRoute={pageRoute} >
  <slot />
</SectionLayout>
