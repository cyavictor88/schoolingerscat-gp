
<script lang='ts'>
  import Katex from "$lib/components/Katex/Katex.svelte";
  import innerProduct2D from "$lib/assets/fourierSeries/innerProduct/innerProduct2D.svg";
</script>



<p>Given two <Katex math={'\\mathbb{R}^2'} /> vectors, <Katex math={'\\vec{a}=(a_x,a_y)'} /> and <Katex math={'\\vec{b}=(b_x,b_y)'} />, as shown in Figure 1, you can see that
<Katex math={'\\theta'} /> indicates how closely aligned <Katex math={'\\vec{a}'}/> and <Katex math={'\\vec{b}'}/> are.</p>

<div style='display: flex; flex-flow: column nowrap; align-items:center;'>
<p>Figure 1</p>
<object title='vectors in R^2' width="30%" type="image/svg+xml" data={innerProduct2D}>Boo your browser does not support SVGs</object>
</div>

<p>Next I will give you the inner product formula and show how inner product of <Katex math={'\\vec{a}'}/> and <Katex math={'\\vec{b}'}/> is related to <Katex math={'\\theta'} />. </p>
<strong>
Inner Product in <Katex math={'\\mathbb{R}^2'}/>: 
</strong>

<Katex displayMode={true} math={'\\mathrm{for} \\; \\vec{a}= \\left[\\begin{array}{c} a_x \\\\ a_y \\end{array} \\right] \\; \\mathrm{and} \\; \\vec{b}= \\left[\\begin{array}{c} b_x \\\\ b_y \\end{array}\\right],'} />
<Katex displayMode={true}
   math={"<\\vec{a},\\vec{b}>:= \\vec{a}^T \\vec{b} ="+
   " \\left[\\begin{array}{cc}a_x & a_y \\end{array}\\right]"+
   "\\left[\\begin{array}{c}b_x \\\\ b_y \\end{array}\\right]=a_x\\,b_x+a_y\\,b_y"}
/>

<p>Now, I will show you how <Katex math={'a_xb_x+a_yb_y'} /> is related to <Katex math={'\\theta'} />.</p>
<hr />
<p>Using law of Cosine:</p>

