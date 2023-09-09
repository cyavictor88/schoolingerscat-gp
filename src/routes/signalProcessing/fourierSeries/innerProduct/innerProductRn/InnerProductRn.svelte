<script lang='ts'>
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { getCircleNum } from "$lib/unicode";
	import Fig6 from "./fig6/Fig6.svelte";
	import Fig7 from "./fig7/Fig7.svelte";
</script> 

<p>So what about inner product in <Latex math={'\\mathrm{R}^n'}/> for <Latex math={'n>3'} />?</p>

<strong>Inner Product in <Latex math={'\\mathrm{R}^n'}/>:</strong> 

<Latex displayMode={true} math={`
  <\\vec{a},\\vec{b}>:= \\vec{a}^T \\vec{b} = 
  \\left[\\begin{array}{cccc}
  a_1 & a_2 & ... & a_n \\end{array}\\right]
  \\left[\\begin{array}{c}
  b_1 \\\\ b_2 \\\\ . \\\\ . \\\\ . \\\\ b_n \\end{array}\\right]
  =
  \\sum_{m=1}^{n} a_m b_m`} />

<p>How do we show that <Latex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> holds for <Latex math={'n>3'} />? </p>

<p>Well, basically using the same 2-step method for 2D and 3D. But since we can't draw dimension higher than 3, we will indirectly show how the 2-step method works in higher dimension:</p>
<hr />

<strong>Step 1. Use Law of Cosine:</strong>
<Latex
displayMode={true}
math={'\\color{brown}{d^2} \\color{black}{=} \\color{red}{\\| \\vec{a}  \\|^2} \\color{black}{+} \\color{blue}{\\| \\vec{b}  \\|^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } '}
/>

<p>Law of cosine holds for vectors in any dimesion because you can always form a triangle using the origin, <Latex math={'\\color{red}\\vec{a}'} /> and <Latex math={'\\color{blue}\\vec{b}'} />. </p>
<p>So with <Latex math={'\\color{red} \\| \\vec{a} \\|^2 = \\sum_{m=1}^{n} a_m^2'} /> and <Latex math={'\\color{blue} \\| \\vec{b} \\|^2 = \\sum_{m=1}^{n} b_m^2'} />, we have: </p>

<fieldset>
  <legend>{getCircleNum(5)}</legend>
  <Latex
    displayMode={true}
    math={'\\Rightarrow \\color{brown}{d^2} \\color{black}{=} \\color{red}{\\sum_{m=1}^{n} {a_m^2}} \\color{black}{+} \\color{blue}{\\sum_{m=1}^{n} b_m^2}\\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
  />
</fieldset>
<hr />
<strong>Step 2: Make a new Triangle:</strong>
<p>This step gets the value of  <Latex math={'\\color{brown}{d^2}'} /> by making a right triangle form by <Latex math={'\\color{red}\\vec{a}'}/> and <Latex math={'\\color{blue}\\vec{b}'}/>.</p>
<p>We can't draw a triangle in 4D or higher dimension world. So lets start with the 2D example, and then see what happens when we increase a dimesion in the 3D example. And then use the same pattern to predict what would happen if we go from 3D to higher dimension.</p>


<Fig6 />
<Fig7 />
<hr />
<strong>Generalizing finding <Latex math={'\\color{brown}d^2'} /> in higher dimension:</strong>:
<p>As you can see from the Extending 2D to 3D example, when we add a dimension, the lower dimension '<Latex math={'\\color{brown}d_{low}'} />' we have is just a leg of the right triangle that contains the 
  <Latex math={'\\color{brown}d'} /> in the higher dimension. And the other leg is the distance between the two vectors in that added dimension.</p>
  <p>So given two vectors in <Latex math={'\\mathrm{R}^n'} />, we can build up from <Latex math={'\\mathrm{R}^2'} /> and show that the square of the distance between those two vectors is:</p>

  <fieldset>
    <legend>{getCircleNum(6)}</legend>
    <Latex
      displayMode={true}
      math={'\\Rightarrow \\color{brown}{d^2} \\color{black}{=} \\sum_{m=1}^{n} (\\color{red}{a_m} \\color{black}- \\color{blue}{b_m} \\color{black} )^2 '}
    />
  </fieldset>


  <p>Now we can set  <Latex math={'\\color{brown}d^2'} /> = {getCircleNum(5)} = {getCircleNum(6)} :</p> 
    <Latex
      displayMode={true}
      math={`\\Rightarrow \\color{brown}{d^2} \\color{black}{=} \\color{red}{\\sum_{m=1}^{n} {a_m^2}} \\color{black}{+} \\color{blue}{\\sum_{m=1}^{n} b_m^2}\\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta)}
     
      \\color{black}{=} \\sum_{m=1}^{n} (\\color{red}{a_m} \\color{black}- \\color{blue}{b_m} \\color{black} )^2 `}
    />

    <Latex displayMode={true}
    math={`\\Rightarrow  - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) = 
    \\sum_{m=1}^{n} -2a_m b_m 
    `}
    />


    <Latex displayMode={true}
    math={`\\Rightarrow   cos(\\theta) = 
         \\frac{ \\sum_{m=1}^{n} a_m b_m } { \\| \\vec{a}  \\| \\|\\vec{b}\\|}  = \\frac{<\\vec{a},\\vec{b}>}  { \\| \\vec{a}  \\| \\|\\vec{b}\\|}
    `}
    />


    <p>Voilà!, we show that <Latex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> holds for <Latex math={'\\mathrm{R}^n'}/> vectors.</p>
