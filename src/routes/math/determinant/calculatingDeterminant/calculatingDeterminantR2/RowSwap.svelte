<script lang="ts">
	import Toggle from '../Toggle.svelte';
  import Latex from '$lib/components/Latex/Latex.svelte';
	import { RowOp } from './d3/interactive/InteractiveD3';
	import InteractiveD3 from './d3/interactive/InteractiveD3.svelte';

</script>

<Toggle>
	<div style='padding: 4px; border: 1px black solid'>
		<p>
			Swapping row only changes the orientation of the parallelepiped:
		</p>
    <p>
      If <Latex math={`M'`} /> is formed by swapping two rows in <Latex math={'M'} />, then
      <Latex math={`det(M')=-det(M)`} />
    </p>
    <p>
      This result is pretty obvious for <Latex math={'\\mathbb{R^2}'} />, I will just show it using the interactive demo below. From the demo, you can see that when you swap rows,
      the orientation(clockwise/counter-clockwise) is simply flipped. And the volume of the parallelepiped(area) is the same.
    </p>
    <InteractiveD3 rowOp={RowOp.Swap}/>
	</div>
</Toggle>
