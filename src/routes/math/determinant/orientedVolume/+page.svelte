<script lang='ts'>

	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import Example2D from "./d3/Example2D.svelte";

</script>

<style>
  li {
    list-style-position: inside;
    text-indent: -1em;
    padding-left: 1em;
  }

</style>
<Title hLevel={1}>Determinant - Oriented Volume</Title>

<p>Given a square matrix size <Latex math={'n'} />: </p>
<Latex center
math={`
 M =  
 \\begin{bmatrix}
                   m_{11} & m_{12} & ... & m_{1n} \\\\
                   m_{21} & m_{22} & ... & m_{2n} \\\\
                  \\vdots & \\vdots & \\ddots & \\vdots \\\\ 
                  m_{n1} & m_{n2} & ... & m_{nn}  
  \\end{bmatrix}
                
                `}
/>

<p>its corresponding hyper-parallelepiped is formed by the set of vectors: </p>
<Latex center math={`( v_1,v_2,...,v_n )=\\left(
  \\begin{bmatrix}
                    m_{11}  \\\\
                    m_{21} \\\\
                   \\vdots  \\\\ 
                   m_{n1}  
   \\end{bmatrix} 
   ,  \\begin{bmatrix}
                    m_{12}  \\\\
                    m_{22} \\\\
                   \\vdots  \\\\ 
                   m_{n2}  
   \\end{bmatrix} 
   ,  \\begin{bmatrix}
                    m_{13}  \\\\
                    m_{23} \\\\
                   \\vdots  \\\\ 
                   m_{n3}  
   \\end{bmatrix} ,...,
   \\begin{bmatrix}
                    m_{1n}  \\\\
                    m_{2n} \\\\
                   \\vdots  \\\\ 
                   m_{nn}  
   \\end{bmatrix} 
                 
                \\right) `}
 />



<p>Examples:</p>
<li>2D:
  <br/>
  <span>
    <Latex math={`M_2 =  \\begin{bmatrix}
                    4 & -3 \\\\
                    1 & 2 \\\\
  
    \\end{bmatrix} `} />, 
<Latex math={`\\color{red}v_1 =  \\begin{bmatrix}
                    4 \\\\
                    1  \\\\
   \\end{bmatrix} `} />, 

   <Latex math={`\\color{blue}v_2 =  \\begin{bmatrix}
                    -3 \\\\
                    2  \\\\
   \\end{bmatrix} `} />, 
  </span>
  <br />
  <Example2D vectors={[ [4,1] ,[-3,2]]}/>
</li>


<li>3D:
  <br/>
  <span>
  <Latex math={`M_2 =  \\begin{bmatrix}
                   m_{11} & m_{12} & m_{13} \\\\
                   m_{21} & m_{22} & m_{23} \\\\
                   m_{31} & m_{32} & m_{33} \\\\
 
  \\end{bmatrix} `} /></span>
  
</li>
<p>for a square matrix, its oriented volume is the volume of the
   hyper-parallelepiped formed by the matrix multiply by the sign of how the volume is oriented.</p>
<p>So basically oriented means positive or negative.</p>

<p>The orientation is determined by the Right-Hand Rule.</p>
<p>Let's start with <Latex math={'2 \\times 2'} /> matrix:</p>