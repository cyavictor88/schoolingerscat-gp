<script lang='ts'>
  import SubjectLayout from "$lib/components/Layout/SubjectLayout.svelte";
  import { sectionRoute } from "./route";
</script>

<SubjectLayout sectionRoute={sectionRoute} >
  <slot />
</SubjectLayout>
