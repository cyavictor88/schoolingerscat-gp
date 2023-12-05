<script lang='ts'>

	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import Example2D from "./d3/Example2D.svelte";
	import Example3D from "./threejs/example3D/Example3D.svelte";
	import RightHand from "./threejs/rightHand/RightHand.svelte";

</script>

<style>
  li {
    list-style-position: inside;
    text-indent: -1em;
    padding-left: 1em;
  }

</style>
<Title hLevel={1}>Determinant - Oriented Volume</Title>


<p>Some definition first, a <strong>full rank</strong> square <Latex math={'n \\times n'} /> matrix has <Latex math={'n'} /> linear independent columns</p>
<hr/>

<p>Given a full rank square matrix size <Latex math={'n'} />: </p>
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

<p>this matrix has a corresponding hyper-parallelepiped formed by the set of vectors: </p>
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
<p>So now we know every full rank square matrix has a corresponding hyper-parallelepiped, which has a volume.</p>
<hr/>
<b>Case of Non Full Rank Matrix:</b>

<Latex math={`M_3 =  \\begin{bmatrix}
-4 & 4 & 0 \\\\
4 & 3 & 7 \\\\
5 & 5 & 0 \\\\

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
0 \\\\
7  \\\\
0  \\\\
\\end{bmatrix} `} />,  where <Latex math={'\\color{green}{v_3} \\color{black}=\\color{red}{v_1}\\color{black}{+}\\color{blue}{v_2}'} />
<Example3D vecc={[0,7,0]}/>

<p>If you drag around the figure, you can see that the suppose 3D hyper-parallelepiped is squashed to a 2D plane.</p>
<hr/>
<hr/>


<b>Orientation:</b>
<p>Now we will explain what 'Oriented' means in Oriented Volume:</p>

<p>The orientation of the volume is just a positive or negative sign that indicates the direction on how the hyper-parallelepiped is formed: 
</p>
<p style='text-indent:30px'>If it goes along with the Right-Hand Rule, then <Latex math={`\\text{orientation}=1`} />,
   or else <Latex math={`\\text{orientation}=-1`}/>.
  <Latex center math={`\\Rightarrow \\text{oriented volume} = \\text{orientation} \\times \\text{volume of the hyper-parallelepiped} `}/>
</p>
<hr/>
<b>Right-Hand Rule:</b>
<br />
<br />
<b>2D:</b>
<p>For a 2D square matrix   <Latex math={`M_2 =  \\begin{bmatrix}
  \\color{red}v_1 &
 \\color{blue} v_2 \\\\

\\end{bmatrix}`} />.
 if the <Latex math={`v_1`}/> goes to <Latex math={'v_2'}/> in counter-clockwise fashion(same direction as curling your right hand fingers into a fist), then its orientation is positive, or else is negative.

</p>
<p>Example:</p>
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
 \\end{bmatrix} `} />, here we see <Latex math={'\\color{red}v_1'} /> goes to <Latex math={'\\color{blue}v_2'} /> in counter-clockwise, so its orientation is 1.
</span>
<Example2D showOrientation vectors={[ [4,1] ,[-3,2]]}/>


<br />
<br />
<b>2D:</b>
<RightHand vecc={[0,7,0]}/>


