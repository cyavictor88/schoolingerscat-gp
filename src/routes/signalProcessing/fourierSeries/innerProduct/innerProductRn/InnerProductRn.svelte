<script lang='ts'>
  import Katex from "$lib/components/Katex/Katex.svelte";
	import { getCircleNum } from "$lib/unicode";
	import Fig6 from "./fig6/Fig6.svelte";
</script> 

<p>So what about inner product in <Katex math={'\\mathrm{R}^n'}/> for <Katex math={'n>3'} />?</p>

<strong>Inner Product in <Katex math={'\\mathrm{R}^n'}/>:</strong> 

<Katex displayMode={true} math={`
  <\\vec{a},\\vec{b}>:= \\vec{a}^T \\vec{b} = 
  \\left[\\begin{array}{cccc}
  a_1 & a_2 & ... & a_n \\end{array}\\right]
  \\left[\\begin{array}{c}
  b_1 \\\\ b_2 \\\\ . \\\\ . \\\\ . \\\\ b_n \\end{array}\\right]
  =
  \\sum_{m=1}^{n} a_m b_m`} />

<p>How do we show that <Katex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> holds for <Katex math={'n>3'} />? </p>

<p>Well, basically using the same 2-step method for 2D and 3D. But since we can't draw dimension higher than 3, we will indirectly show how the 2-step method works in higher dimension:</p>
<hr />

<strong>Step 1. Use Law of Cosine:</strong>
<Katex
displayMode={true}
math={'\\color{brown}{d^2} \\color{black}{=} \\color{red}{\\| \\vec{a}  \\|^2} \\color{black}{+} \\color{blue}{\\| \\vec{b}  \\|^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } '}
/>

<p>Law of cosine holds for vectors in any dimesion because you can always form a triangle using the origin, <Katex math={'\\color{red}\\vec{a}'} /> and <Katex math={'\\color{blue}\\vec{b}'} />. </p>
<p>So with <Katex math={'\\color{red} \\| \\vec{a} \\|^2 = \\sum_{m=1}^{n} a_m^2'} /> and <Katex math={'\\color{blue} \\| \\vec{b} \\|^2 = \\sum_{m=1}^{n} b_m^2'} />, we have: </p>

<fieldset>
  <legend>{getCircleNum(5)}</legend>
  <Katex
    displayMode={true}
    math={'\\Rightarrow \\color{brown}{d^2} \\color{black}{=} \\color{red}{\\sum_{m=1}^{n} {a_m^2}} \\color{black}{+} \\color{blue}{\\sum_{m=1}^{n} b_m^2}\\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
  />
</fieldset>
<hr />
<strong>Step 2: Make a new Triangle:</strong>
<p>This step gets the value of  <Katex math={'\\color{brown}{d^2}'} /> by making a right triangle form by <Katex math={'\\color{red}\\vec{a}'}/> and <Katex math={'\\color{blue}\\vec{b}'}/>.</p>
<p>We can't draw a triangle in 4D or higher dimension world. So lets start with 2D, see what happens when we increase a dimesion to 3D. And then use the same pattern to predict what would happen if we go from 3D to higher dimension.</p>
<p>Say we have two 2D vectors <Katex math={'\\color{red}\\vec{a}'} /> and <Katex math={'\\color{blue}\\vec{b}'} /> drawn in 3D space by having  <Katex math={'\\color{red}{a_z}\\color{black}=\\color{blue}{\\vec{b_z}}\\color{black}=0'} />, as shown in Figure 6</p>


<Fig6 />