<script lang='ts'>
  import TopicLayout from "$lib/components/Layout/TopicLayout.svelte";
  import { sectionRoute } from "./route";
</script>

<TopicLayout sectionRoute={sectionRoute} >
  <slot />
</TopicLayout>
