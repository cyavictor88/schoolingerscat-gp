<script lang="ts">
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../../crossProduct/common/latex/ColsVec.svelte';
</script>

<Title hLevel={1}>Determinant - Linear Transformation</Title>

<p>
	In this section, we will go over what is a linear transformation and how it can be represented as
	a matrix.
</p>

<p>
	Linear Transformation is basically a function that maps(transforms) a point in <Latex
		math={'n'}
	/>-dimensional space to another point in <Latex math={'m'} />-dimensional space.
</p>

<p>Ok, so how do we express the above statement in mathematical terms?</p>


<p>Before giving out the answer, let's first look a little closer on matrix multiplication:</p>



<li>
	A point in <Latex math={'n'} />-dimensional space can be written as a column vector <Latex
		math={`
  \\vec{p_n} = \\begin{bmatrix} p_1  \\\\ \\vdots \\\\ p_n  \\end{bmatrix}`}
	/>
</li>
<li>
	A function that transforms a point in <Latex math={'n'} />-dimensional space to another point in <Latex math={'m'} />-dimensional space
  can be written as a <Latex math={'m \\times n'} />  matrix :
   <Latex center
		math={`
   A =  
   \\begin{bmatrix} a_{11} & a_{12} & ... & a_{1n} \\\\
                     a_{21} & a_{22} & ... & a_{2n} \\\\
                   \\vdots & \\vdots & \\ddots & \\vdots \\\\ 
                    a_{m1} & a_{m2} & ... & a_{mn}  \\end{bmatrix}`}
	/>
</li>

<li>
  So transforming a point <Latex math={'\\vec{p_n}'} /> to point <Latex math={'\\vec{q_m}'} /> using the function  <Latex math={'M'} /> can be written as:
  <Latex center
  math={`
  
  \\vec{q_m} = A\\vec{p_n}=  
 \\begin{bmatrix}
                   a_{11} & a_{12} & ... & a_{1n} \\\\
                   a_{21} & a_{22} & ... & a_{2n} \\\\
                  \\vdots & \\vdots & \\ddots & \\vdots \\\\ 
                  a_{m1} & a_{m2} & ... & a_{mn}  
  \\end{bmatrix}
  \\begin{bmatrix} p_1   \\\\ \\vdots \\\\ p_n  \\end{bmatrix}
    =
    \\begin{bmatrix} q_1   \\\\ \\vdots \\\\ q_m  \\end{bmatrix}       
                  `}
/>

</li>




