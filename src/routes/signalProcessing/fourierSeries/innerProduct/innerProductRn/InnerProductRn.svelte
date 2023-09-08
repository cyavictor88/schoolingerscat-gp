<script lang='ts'>
  import Katex from "$lib/components/Katex/Katex.svelte";
</script> 

<p>So what about inner product in <Katex math={'\\mathrm{R}^n'}/> for <Katex math={'n>3'} />?</p>

<strong>Inner Product in <Katex math={'\\mathrm{R}^n'}/>:</strong> 

<Katex displayMode={true} math={`<\\vec{a},\\vec{b}>:= \\vec{a}^T \\vec{b} = \\left[\\begin{array}{cc}
  a_1 & a_2 & ... & a_n \\end{array}\\right]
  \\left[\\begin{array}{c}
  b_1 \\\\ b_2 \\\\ . \\\\ . \\\\ . \\\\ b_n \\end{array}\\right]
  =
  \\sum_{m=1}^{n} a_m b_m`} />

<p>How do we show that <Katex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> holds for <Katex math={'n>3'} /> </p>

<p>Well, basically using the same method for 2D and 3D. But since we cant draw picture with dimension higher than 3, we will use the following figures to illustrate how it could be done in higher dimension.</p>
<p>Previously, the method shown to prove <Katex math={'cos(\\theta)=\\frac{<a,b>}{\\|a\\|\\|b\\|}'} /> for 2D and 3D is to have two ways to find the distance between the two vectors, (<Katex math={'\\color{brown}d'}/> ), and then equates them and simplify the result:</p>
<strong>Step 1:</strong>
<p>Use Law of Cosine: </p>
<Katex
displayMode={true}
math={'\\color{brown}{d^2} \\color{black}{=} \\color{red}{\\| \\vec{a}  \\|^2} \\color{black}{+} \\color{blue}{\\| \\vec{b}  \\|^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } '}
/>