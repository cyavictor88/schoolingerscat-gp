<script lang="ts">
	import { onMount } from 'svelte';
  import { FabricLinTrans } from './FabricLinTrans';
  let fabricInstance: FabricLinTrans;
  let fabricCanvas: HTMLCanvasElement;
  onMount(() => {
    fabricInstance = new FabricLinTrans(fabricCanvas);
    return ()=>{
      fabricInstance?.clearCanvas();
    }
  });
</script>
<canvas bind:this={fabricCanvas} />
