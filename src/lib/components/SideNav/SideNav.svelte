<script lang="ts">
  import { onMount } from 'svelte';
	import { topBarHeight } from '$lib/store';

  export let sideBarWidth = 200;

  interface Link {
    label: string;
    subLinks: Link[];
    showSubLinks?: boolean;
  }

  let links :Link[]  = [
    {
      label: 'Home',
      subLinks: [],
    },
    {
      label: 'About',
      subLinks: [
        { label: 'Mission', subLinks: [] } as Link,
        { label: 'Team', subLinks: [] } as Link,
      ],
    },
    
    {
      label: 'Contact',
      subLinks: [],
    },
  ];

  // Function to toggle the visibility of sub-links
  function toggleSubLinks(index: number) {
    links = links.map((link, i) => ({
      ...link,
      showSubLinks: i === index ? !link.showSubLinks : false,
    }));
  }

  onMount(() => {
    // Initialize showSubLinks property to false for all links
    links = links.map(link => ({ ...link, showSubLinks: false }));
    links = [...links,...links,...links];
    links = [...links,...links,...links];
  });
</script>

<style>
  .sidebar {
    position: fixed;
    background-color: #e18f8f;
    overflow-y: auto;
  }

  .link {
    cursor: pointer;
    margin: 2px 0;
    padding: 2px;
    border-radius: 4px;
  }

  .sub-link {
    margin-left: 16px;
  }
</style>

<div class="sidebar" style="top:{$topBarHeight}px;width:{sideBarWidth}px;height:calc(100vh - {topBarHeight}px);max-height:calc(100vh - {topBarHeight}px);">
  {#each links as link, index}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="link" on:click={() => toggleSubLinks(index)}>
      {link.label}
    </div>
    {#if link.subLinks && link.subLinks.length > 0 && link.showSubLinks}
      {#each link.subLinks as subLink}
        <div class="sub-link">{subLink.label}</div>
      {/each}
    {/if}
  {/each}
</div>
