<script lang='ts'>

	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import Example2D from "./d3/Example2D.svelte";
	import Example3D from "./threejs/example3D/Example3D.svelte";

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

<p>this matrix has a corresponding hyper-parallelepiped is formed by the set of vectors: </p>
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


<hr/>
<hr/>

<p><b>Examples:</b></p>
<li><b>2D:</b>
  <br/>
  <br/>
  <span>
    <Latex math={`M_2 =  \\begin{bmatrix}
                    4 & -3 \\\\
                    1 & 2 \\\\
  
    \\end{bmatrix} \\Rightarrow`} /> 
<Latex math={`\\color{red}v_1 =  \\begin{bmatrix}
                    4 \\\\
                    1  \\\\
   \\end{bmatrix} `} />, 

   <Latex math={`\\color{blue}v_2 =  \\begin{bmatrix}
                    -3 \\\\
                    2  \\\\
   \\end{bmatrix} `} />, the white shade is the hyper-parallelepiped form by this <Latex math={`M_2`}/>.
  </span>
  <br />
  <Example2D vectors={[ [4,1] ,[-3,2]]}/>
</li>

<hr/>

<li><b>3D:</b>
  <br />
  <br/>
  <span>
  <Latex math={`M_3 =  \\begin{bmatrix}
                   -4 & 4 & -1 \\\\
                   4 & 3 & 2 \\\\
                   5 & 5 & 3 \\\\
 
  \\end{bmatrix}\\Rightarrow `} />
<Latex math={`\\color{red}v_1 =  \\begin{bmatrix}
-4 \\\\
4  \\\\
5  \\\\
\\end{bmatrix} `} />, 

<Latex math={`\\color{blue}v_2 =  \\begin{bmatrix}
4 \\\\
3  \\\\
5  \\\\
\\end{bmatrix} `} />,   

<Latex math={`\\color{green}v_3 =  \\begin{bmatrix}
-1 \\\\
2  \\\\
3  \\\\
\\end{bmatrix} `} />, the white shade is the hyper-parallelepiped form by this <Latex math={`M_3`}/>.
</span>
  <br/>
  <Example3D />
</li>
<p>So now we know each square matrix has a corresponding hyper-parallelepiped, which has a volume.</p>

<hr/>
<hr/>

<p>Now we will explain what 'Oriented' means in Oriented Volume:</p>

<p>The orientation of the volume is just a positive or negative sign that indicates the orientation of how the hyper-parallelepiped is formed: 
</p>
<p style='text-indent:30px'>If it goes along with the Right-Hand Rule, then <Latex math={`\\text{orientation}=1`} />,
   else <Latex math={`\\text{orientation}=-1`}/>.
  <Latex center math={`\\text{oriented volume} = \\text{orientation} \\times \\text{volume of the hyper-parallelepiped} `}/>
</p>

<b>Right-Hand Rule:</b>

<p>for a square matrix, its oriented volume is the volume of the
   hyper-parallelepiped formed by the matrix multiply by the sign of how the volume is oriented.</p>
<p>So basically oriented means positive or negative.</p>

<p>The orientation is determined by the Right-Hand Rule.</p>
<p>Let's start with <Latex math={'2 \\times 2'} /> matrix:</p>