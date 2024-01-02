<script lang='ts'>
	import Title from '$lib/components/PageComp/Title.svelte';
  import Latex from '$lib/components/Latex/Latex.svelte';
	import MultiCanvas from './threejs/MultiCanvas.svelte';
	// import RowSwap from './RowSwap.svelte';
	// import ScalarMultiple from './ScalarMultiple.svelte';
	// import RowSum from './RowSum.svelte';

</script>
<Title hLevel={2} >Calculating Determinant in <Latex math={'\\mathbb{R^3}'}/> </Title>
<hr />

<p>Given a <Latex math={'\\mathbb{R^3}'}/> matrix:</p>


<p><Latex 
  math={`M = \\begin{bmatrix}
  \\vec{a} \\\\ \\vec{b} \\\\ \\vec{c} \\end{bmatrix} 
               =
               \\begin{bmatrix}
              a_1 & a_2 & a_3 \\\\
              b_1 & b_2 & b_3 \\\\
              c_1 & c_2 & c_3 \\\\
              \\end{bmatrix} 
                `}
  /></p>
  <hr />
  <b><u>Elementary Row Operation:</u></b>
  <ol>
    <li>
      <b>Row Swap:</b>
      <p>Swap any two rows</p>
      <!-- <RowSwap /> -->
    </li>
    <li>
      <b>Scalar Multiplication:</b>
      <p>Multiply a row with a constant<Latex math={' c \\in \\mathbb{R}'}/> </p>
      <!-- <ScalarMultiple /> -->
    </li>
    <li>
      <b>Row Sum:</b>
      <p>Add a multiple of one row to another row</p>
      <!-- <RowSum /> -->
    </li>
    <MultiCanvas />
  
  
  </ol>