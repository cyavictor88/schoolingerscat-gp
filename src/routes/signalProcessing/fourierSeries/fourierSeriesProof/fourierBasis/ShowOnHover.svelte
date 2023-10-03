<script lang='ts'>


  let isHovered = false;
  let mouseX = 0;
  let mouseY = 0;
  function handleMouseEnter(event: MouseEvent) {
    isHovered = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
    console.log('x,y',mouseX,mouseY)
  }

  function handleMouseLeave() {
    isHovered = false;
  }

  $: display = isHovered ? 'inline': 'none'
</script>

<style>

  .tooltip {
    position: fixed;
    left: calc( var(--mouseX) * 1px );
    top: calc( var(--mouseY) * 1px );
    display: var(--isHovered);
  }
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
  <slot name='label' />
</span>

<span class="tooltip" style='--isHovered:{display}; 
  --mouseX:{mouseX};
  --mouseY:{mouseY};
  background-color: cyan; 
  padding: 8px;
  z-index: 1;
   '><slot name='tooltip'/></span>
