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