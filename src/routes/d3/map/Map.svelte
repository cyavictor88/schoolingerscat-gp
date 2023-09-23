<script lang="ts">
	import { onMount } from 'svelte';
	import { africa } from './map';

	onMount(() => {
		africa();
	});
</script>

<div id="content">
	<div class="info">Hover over a country</div>
	<svg width="100vw" height="100vh">
		<g class="map" />
		<g class="bounding-box"><rect /></g>
		<g class="centroid"><circle r="4" /></g>
	</svg>
</div>


<style>

  
  #content .info {
    height: 20px;
  }
  
  /* svg {
    background-image: url("/images/map.png");
    background-repeat: no-repeat;
    background-size: 1500px;
  } */
  
  #content .bounding-box rect {
    fill: none;
    stroke: #ff00ff;
    stroke-dasharray: 2,1;
  }
  
  #content .centroid {
    display: none;
  }
  
  #content .centroid circle {
    fill: red;
  }
  
  

</style>