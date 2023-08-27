
<script lang='ts'>
  import * as d3 from 'd3';

  export let color = 'blue';
  $: arrowLine = d3.line<[number, number]>().x(d => (d[0])).y(d => (d[1]));

</script>

<defs >
  <marker id="arrow{color}" markerUnits="strokeWidth" viewBox='0 0 10 10'  refX='10' refY='5' markerHeight='10' markerWidth='10' orient='auto-start-reverse'>
    <path fill={color} d={ arrowLine([[0, 0], [10, 5], [0, 10], [5, 5]])}/>
  </marker>
</defs>