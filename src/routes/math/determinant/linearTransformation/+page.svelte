<script lang="ts">
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../../crossProduct/common/latex/ColsVec.svelte';
  import { onMount } from 'svelte';
  import { FabricLinTrans } from './fabric/FabricLinTrans';
	import SpaceShuttle  from './d3/SpaceShuttle.svelte';
  let fabricInstance: FabricLinTrans;
  let fabricCanvas: HTMLCanvasElement;
  onMount(() => {
    fabricInstance = new FabricLinTrans(fabricCanvas);

    return ()=>{
      fabricInstance?.clearCanvas();
    }
  });


</script>

<style>
  canvas {
    border: 1px black solid; 
  }
</style>

<Title hLevel={1}>Determinant - Linear Transformation</Title>
<p>
	In this section, we will go over what linear transformation is and how it can be represented as
	a matrix.
</p>
<hr/>

<p>
	<b>Linear Transformation</b> is a function that maps(transforms) a point from a <Latex
		math={'v'}
	/>-dimensional vector space to another point in a <Latex math={'w'} />-dimensional vector space.
</p>
<p>It can be written as: <Latex math={`T: V \\rightarrow W`}/></p>
<p>The picture below shows graphical representation of linear transformation.</p>
<canvas bind:this={fabricCanvas} />
<p>Ok, so how do we express a linear transformation in mathematical terms?</p>


<p>The answer is <b>matrix multiplication,</b></p>
<p>Let's break it down:</p>
<li>
	A point in <Latex math={'v'} />-dimensional space can be written as a column vector <Latex
		math={`
  \\vec{p} = \\begin{bmatrix} p_1  \\\\ \\vdots \\\\ p_v  \\end{bmatrix}`}
	/>
</li>
<li>
	A point in <Latex math={'w'} />-dimensional space can be written as a column vector <Latex
		math={`
  \\vec{q} = \\begin{bmatrix} q_1  \\\\ \\vdots \\\\ q_w  \\end{bmatrix}`}
	/>
</li>
<li>
	A function that transforms a point in <Latex math={'v'} />-dimensional space to another point in <Latex math={'w'} />-dimensional space
  can be written as a <Latex math={'w \\times v'} />  matrix :
   <Latex center
		math={`
   M =  
   \\begin{bmatrix} m_{11} & m_{12} & ... & m_{1v} \\\\
                     m_{21} & m_{22} & ... & m_{2v} \\\\
                   \\vdots & \\vdots & \\ddots & \\vdots \\\\ 
                    m_{w1} & m_{w2} & ... & m_{wv}  \\end{bmatrix}`}
	/>
</li>

<li>
  So mapping a point <Latex math={'\\vec{p}'} /> to point <Latex math={'\\vec{q}'} /> using the matrix  <Latex math={'M'} /> can be written as:
  <Latex center
  math={`
  
  \\vec{q} = A\\vec{p}=  
 \\begin{bmatrix}
                   m_{11} & m_{12} & ... & m_{1v} \\\\
                   m_{21} & m_{22} & ... & m_{2v} \\\\
                  \\vdots & \\vdots & \\ddots & \\vdots \\\\ 
                  m_{w1} & m_{w2} & ... & m_{wv}  
  \\end{bmatrix}
  \\begin{bmatrix} p_1   \\\\ \\vdots \\\\ p_v  \\end{bmatrix}
    =
    \\begin{bmatrix} q_1   \\\\ \\vdots \\\\ q_w  \\end{bmatrix}       
                  `}
/>

</li>

<p>Looking at all these symbols can be a little overwhelming, let's use a space shuttle example to clarify things:</p>

<br />

<b>Space Shuttle:</b>

<p>Let say we have a space shuttle looking like the image below. </p>

<SpaceShuttle />