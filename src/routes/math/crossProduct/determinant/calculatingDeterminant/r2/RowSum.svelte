<script lang="ts">
	import Toggle from '../Toggle.svelte';
  import Latex from '$lib/components/Latex/Latex.svelte';
	import { RowOp } from './d3/interactive/InteractiveD3';
	import InteractiveD3 from './d3/interactive/InteractiveD3.svelte';
  import { RowSum } from './d3/RowSum';
	import { onMount } from 'svelte';
  import * as mj from 'mathjs';
	import RowSumNegativeCase from './RowSumNegativeCase.svelte';
	import RowSumPositiveCase from './RowSumPositiveCase.svelte';
</script>

<Toggle>
	<div style='padding: 4px; border: 1px black solid'>
		<p>
			Row sum operation on a matrix does not change its determinant. 
		</p>
    <p>
      If <Latex math={`M'`} /> is formed by adding a multiple of a row to another row <Latex math={'M'} />, then
      <Latex math={`det(M')=det(M)`} />
    </p>
    <p><u><b>Proof:</b></u></p>
    <p>We will use  <Latex math={`E=
      \\begin{bmatrix}
      1 & 0 \\\\
      0 & 1 \\\\
      \\end{bmatrix}_{r_2 \\rightarrow 2r_1 + r_2} = 
      \\begin{bmatrix}
      1 & 0 \\\\
      2 & 1 \\\\
      \\end{bmatrix}`}/> 
    </p>
    <p>and see how it will affect area(determinant) of 
      <Latex math={`M = \\begin{bmatrix}
      \\color{red}\\vec{a} \\\\
      \\color{blue}\\vec{b} \\\\
      \\end{bmatrix} =
        \\begin{bmatrix}
        2 & 3 \\\\
        -3 & -1 \\\\
        \\end{bmatrix}`} />
    </p>
    <p>
      <Latex math={`EM =\\begin{bmatrix}
      \\color{red}\\vec{a} \\\\
      \\color{purple}\\vec{b'} \\\\
      \\end{bmatrix} =
        \\begin{bmatrix}
        2 & 3 \\\\
        1 & 5 \\\\
        \\end{bmatrix}`} />

    </p>
    <p>The general formula for Area is:
    </p>
      <Latex center math={`  area  = base  \\times height`}/>
    <RowSumPositiveCase />
    <hr />
    <RowSumNegativeCase />
    <p><b>Orientation does not Change:</b></p>

<p>
  From the two parallel grey lines in both figures, you can see that 
   <Latex math={'\\color{red}\\vec{a}'} /> always rotates conuter-clockwise toward both <Latex math={`\\color{blue}\\vec{b}`} />
   and <Latex math={`\\color{purple}\\vec{b'}`} />, doesn't matter how close or far <Latex math={`\\color{blue}\\vec{b}`} /> is to be stretched to become  <Latex math={`\\color{purple}\\vec{b'}`} /> in either direction.
</p>
So overall: 
<br /><Latex math={`
  det(EM)=det(\\begin{bmatrix}
  \\color{red}\\vec{a} \\\\
\\color{purple}\\vec{b'} \\\\
  \\end{bmatrix})
  =det(
    \\begin{bmatrix}
    \\color{red}\\vec{a} \\\\
\\color{blue}\\vec{b} \\\\
  \\end{bmatrix})
  =det(M)`} />
    </div>
</Toggle>
