<script lang='ts'>
	import Title from '$lib/components/PageComp/Title.svelte';
  import Latex from '$lib/components/Latex/Latex.svelte';
	import RowSwap from './RowSwap.svelte';

</script>
<Title hLevel={2} >Calculating Determinant in <Latex math={'\\mathbb{R^2}'}/> </Title>
<hr />

<p>Given a <Latex math={'\\mathbb{R^2}'}/> matrix:</p>
<p>
    <Latex 
  math={`M_2 =  \\begin{bmatrix}
                \\vec{a} & \\vec{b} \\\\
                \\end{bmatrix} 
               
                `}
/>

</p>
<p>Let's see how row operations affects the determinant of <Latex math={'M_2'}/></p>
<p>Since row operations operate on rows, before doing anything, let's first transpose the matrix: </p>

<Latex 
math={`M_2^T =  \\begin{bmatrix}
              \\vec{a}^T & \\vec{b}^T \\\\
              \\end{bmatrix} 
             =
             \\begin{bmatrix}
              a_1 & a_2 \\\\
              b_1 & b_2 \\\\
              \\end{bmatrix} 
              `}
/>

<p>For convenience, I will refer  <Latex math={'M_2^T'}/> as  <Latex math={'M'}/> from now on.  </p>
<p><Latex 
  math={`M 
               =
               \\begin{bmatrix}
              a_1 & a_2 \\\\
              b_1 & b_2 \\\\
              \\end{bmatrix} 
                `}
  /></p>
  <hr />
  <b><u>Elementary Row Operation:</u></b>
  <ol>
    <li>
      <b>Row Swap:</b>
      <p>Swap any two rows</p>
      <RowSwap />
    </li>
    <li>
      <b>Scalar Multiplication:</b>
      <p>Multiply a row with a constant<Latex math={' c \\in \\mathbb{R}'}/> </p>
    </li>
    <li>
      <b>Row Sum:</b>
      <p>Add a multiple of one row to another row</p>
    </li>
  
  
  </ol>