<script lang="ts">
	import Toggle from '../Toggle.svelte';
  import Latex from '$lib/components/Latex/Latex.svelte';
	import { RowOp } from './d3/interactive/InteractiveD3';
	import InteractiveD3 from './d3/interactive/InteractiveD3.svelte';
  let reset = new Date();
</script>

<Toggle>
	<div style='padding: 4px; border: 1px black solid'>

    <p>
      If <Latex math={`M'`} /> is formed by multiplying one row by <Latex math={'c'} />, then
      <Latex math={`det(M')=c \\times det(M)`} />
    </p>
    <p>
      Given that the volume of the parallelepiped(area) is: <Latex math={`Area = base \\times height `} />, 
      when you multiply one row in <Latex math={'M'} /> by <Latex math={'c'} />,
      you are just multiplying the <Latex math={'base'} /> by <Latex math={'c'} />.
      So the resulting area is  <Latex math={`New Area = c \\times base \\times height `} />.
    </p>
    <InteractiveD3 rowOp={RowOp.Mult} />
	</div>
</Toggle>
