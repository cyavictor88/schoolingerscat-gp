<script lang="ts">
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
  import FabricLinTrans from './fabric/FabricLinTrans.svelte';
	import SpaceShuttle  from './d3/SpaceShuttle.svelte';
  import { onMount } from 'svelte';
	import { SITE_COLOR } from '$lib/theme/colors';

</script>

<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Linear Transformation
</Title>
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
<FabricLinTrans />
<p>Ok, so how do we express a linear transformation in mathematical terms?</p>


<p>The answer is <b>matrix multiplication,</b></p>
<p>Let's break it down:</p>
<li>
	A point in <Latex math={'v'} />-dimensional space can be written as a column vector <Latex
		math={`
  \\vec{a} = \\begin{bmatrix} a_1  \\\\ \\vdots \\\\ a_v  \\end{bmatrix}`}
	/>
</li>
<li>
	A point in <Latex math={'w'} />-dimensional space can be written as a column vector <Latex
		math={`
  \\vec{p} = \\begin{bmatrix} p_1  \\\\ \\vdots \\\\ p_w  \\end{bmatrix}`}
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
  So mapping a point <Latex math={'\\vec{a}'} /> to point <Latex math={'\\vec{p}'} /> using the matrix  <Latex math={'M'} /> can be written as:
  <Latex center
  math={`
  
  \\vec{p} = M\\vec{a}=  
 \\begin{bmatrix}
                   m_{11} & m_{12} & ... & m_{1v} \\\\
                   m_{21} & m_{22} & ... & m_{2v} \\\\
                  \\vdots & \\vdots & \\ddots & \\vdots \\\\ 
                  m_{w1} & m_{w2} & ... & m_{wv}  
  \\end{bmatrix}
  \\begin{bmatrix} a_1   \\\\ \\vdots \\\\ a_v  \\end{bmatrix}
    =
    \\begin{bmatrix} p_1   \\\\ \\vdots \\\\ p_w  \\end{bmatrix}       
                  `}
/>

</li>

<p>Let's use a space shuttle example to better visualize <Latex math={'\\vec{a}'} />, <Latex math={'\\vec{p}'} />, and the matrix  <Latex math={'M'} />  :</p>

<br />

<b>Example Space Shuttle:</b>

<p>In this space shuttle:</p>
<li>Input: there are <Latex math={'v'} /> adjustment inputs: <Latex math={'a_1,...,a_v'} />  </li>
<li>Output: there are <Latex math={'w'} /> engines. Each engine output power is:  <Latex math={'p_1,...,p_w'} /> </li>
<li>Each engine is controlled by a dedicated micro-controller.  <Latex math={''} /></li>
<li>Each micro-controller contains <Latex math={'v'} /> coefficients.  <Latex math={''} /></li>
<li>The power of a engine is determined by its micro-controller's coefficients and the adjustment input:  <Latex math={'p_i = \\sum_{j=1}^{v}{m_{ij}a_{j}}'} /></li>

<p>The image below shows such space shuttle with <Latex math={'w=4'}/> engines and <Latex math={'v=2'}/> adjustment inputs:</p>


<SpaceShuttle />

<p>The above space engine control system can be matched with linear transformation, matrix and vector space:</p>

<li>The range of  adjustment inputs represent the <Latex math={'v'}/>-dimensional input vector space <Latex math={'V'}/></li>
<li>The range of the engine output powers represents the <Latex math={'w'}/>-dimensional output vector space <Latex math={'W'}/></li>
<li>The Mainframe computer represents the linear transformation <Latex math={'T'}/></li>
<li>vector <Latex math={'\\vec{a}'}/> represents a particular adjustment input  <Latex math={'[a_1,a_2]^{\\text{T}}'}/>
<li>vector <Latex math={'T(\\vec{a}) = \\vec{p}'}/> represents the corresponding engine out powers  <Latex math={'[p_1,p_2,p_3,p_4]^{\\text{T}}'}/>
<FabricLinTrans />

<li>The Mainframe Computer( linear transformation T) can be represented as a matrix:</li>
<Latex center
math={`
T := M =  \\begin{bmatrix}  \\text{micro-controller}_1  \\\\
                  \\text{micro-controller}_2  \\\\
                  \\text{micro-controller}_3  \\\\
                 \\text{micro-controller}_4 \\end{bmatrix} =
\\begin{bmatrix} m_{11} & m_{12}  \\\\
                 m_{21} & m_{22}  \\\\
                 m_{31} & m_{32}  \\\\
                m_{41} & m_{42} \\end{bmatrix}`}
/>

<li>so we can calculate the engine output powers using the following matrix multiplication: </li>
<Latex center
math={`

\\vec{p} = M\\vec{a}=    \\begin{bmatrix}  \\text{micro-controller}_1  \\\\
                  \\text{micro-controller}_2  \\\\
                  \\text{micro-controller}_3  \\\\
                 \\text{micro-controller}_4 \\end{bmatrix} \\begin{bmatrix} a_1   \\\\  a_2  \\end{bmatrix} =
\\begin{bmatrix} m_{11} & m_{12}  \\\\
                 m_{21} & m_{22}  \\\\
                 m_{31} & m_{32}  \\\\
                m_{41} & m_{42} \\end{bmatrix}
\\begin{bmatrix} a_1   \\\\  a_2  \\end{bmatrix}
  =
  \\begin{bmatrix} p_1   \\\\ p_2 \\\\ p_3 \\\\ p_4  \\end{bmatrix}       
                `} />

<SpaceShuttle />


<p>In the linear transformation Matrix<Latex math={'M'} />, looking at an entry  <Latex math={'m_{ij}'} />:</p>

<li>The  <Latex math={'i'} /> corresponds to the  <Latex math={'i^{th}'} /> engine(output)</li>
<li>The  <Latex math={'j'} /> corresponds to the  <Latex math={'j^{th}'} /> adjustment(input)</li>
 

<hr />

<p>
  Expanding on the space shuttle example, using the same matrix M, one can also have more than one adjustment panels, 
  but that means you will have another set of engines. The space shuttle with two set of engines will look like below.
</p>

<SpaceShuttle numEngineSet={2}/>

<p>Express them in mathematical terms look like:</p>
<Latex center
math={`

P = MA=  
\\begin{bmatrix} m_{11} & m_{12}  \\\\
                 m_{21} & m_{22}  \\\\
                 m_{31} & m_{32}  \\\\
                m_{41} & m_{42} \\end{bmatrix}
\\begin{bmatrix} a_{11}  & a_{12} \\\\ a_{21} & a_{22}  \\end{bmatrix}
  =
  \\begin{bmatrix} p_{11}  & p_{12} \\\\ p_{21} & p_{22} \\\\ p_{31} & p_{32} \\\\ p_{41} & p_{42}  \\end{bmatrix}       
                `} />

<p>In this case you can see it as using the linear transformation T to transforms two different vectors: 
  <Latex math={'\\begin{bmatrix} a_{11}   \\\\  a_{12}  \\end{bmatrix}'}/> to  
  <Latex math={'\\begin{bmatrix} p_{11}   \\\\  p_{21} \\\\ p_{31} \\\\ p_{41}  \\end{bmatrix}'}/> 
  and 
  <Latex math={'\\begin{bmatrix} a_{12}   \\\\  a_{22}  \\end{bmatrix}'}/> to
  <Latex math={'\\begin{bmatrix} p_{12}   \\\\  p_{22} \\\\ p_{32} \\\\ p_{42}  \\end{bmatrix}'}/>
</p>

<p>Takeaway: </p>
<ul>
  <li>A linear transformation that maps a <Latex math={'v'} />-dimensional input vector to a <Latex math={'w'} />-dimensional output vector can be written as a <Latex math={'w \\times v'} /> matrix.</li>
  <li>In a matrix <Latex math={'M'} />, its entry <Latex math={'m_{ij}'} /> is the coefficient for the <Latex math={'j^{th}'}/> input that is <Latex math={'j^{th}'}/> term of the partial sum <Latex math={'i^{th}'}/> output.</li>
</ul>
