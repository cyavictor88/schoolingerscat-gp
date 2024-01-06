<script lang='ts'>
	import Title from '$lib/components/PageComp/Title.svelte';
  import Latex from '$lib/components/Latex/Latex.svelte';
  import MultiBlankViewPort from './threejs/multiToggle/MultiBlankViewPort.svelte';
	import Toggle from '../Toggle.svelte';
  import RowSwap from './RowSwap.svelte';
	import ScalarMultiple from './ScalarMultiple.svelte';
	// import RowSum from './RowSum.svelte';

</script>
<Title hLevel={2} >Calculating Determinant in <Latex math={'\\mathbb{R^3}'}/> </Title>
<hr />

<p>Given a <Latex math={'\\mathbb{R^3}'}/> matrix:</p>


<p><Latex 
  math={`M = \\begin{bmatrix}
  \\color{red}\\vec{v_1} \\\\ \\color{blue}\\vec{v_2} \\\\ \\color{green}\\vec{v_3} \\end{bmatrix} 
               =
               \\begin{bmatrix}
              \\color{red}v_{11}  &\\color{red} v_{12} &  \\color{red}v_{13} \\\\
              \\color{blue}v_{21} &  \\color{blue}v_{22} &  \\color{blue}v_{23} \\\\
              \\color{green}v_{31} & \\color{green}v_{32} & \\color{green}v_{33} \\\\
              \\end{bmatrix} 
                `}
  /></p>
  <hr />
  <b><u>Elementary Row Operation:</u></b>
  <ol>

    <li>
      <b>Scalar Multiplication:</b>
      <p>Multiply a row with a constant<Latex math={' c \\in \\mathbb{R}'}/> </p>
      <ScalarMultiple />
    </li>
    <li>
      <b>Row Sum:</b>
      <p>Add a multiple of one row to another row</p>
      <!-- <RowSum /> -->
    </li>
    <Toggle>
      <MultiBlankViewPort />
    </Toggle>
    <li>
      <b>Row Swap:</b>
      <p>Swap any two rows</p>
      <RowSwap />
    </li>
  
  </ol>