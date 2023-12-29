<script lang='ts'>
  import SubjectLayout from "$lib/components/Layout/SubjectLayout.svelte";
  import { subjectRoute } from "./subjectRoute";
</script>

<SubjectLayout subjectRoute={subjectRoute} >
  <slot />
</SubjectLayout>
