<script lang='ts'>
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { getCircleNum } from "$lib/unicode";
  import Title from "$lib/components/PageComp/Title.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
</script> 
<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Inner Product in <Latex math={'\\mathbb{C}^n'} />:
</Title>
<p>Inner Product also works with complex vectors in n-dimensional space</p>

<strong>Inner Product in <Latex math={'\\mathrm{C}^n'}/>:</strong> 
<Latex displayMode={true} math={`  <\\vec{a},\\vec{b}>:=\\vec{b}^* \\vec{a} =  \\left[\\begin{array}{cccc}
  b_1^* & b_2^* & ... & b_n^* \\end{array}\\right]
  \\left[\\begin{array}{c}
  a_1 \\\\ a_2 \\\\ . \\\\ . \\\\ . \\\\ a_n \\end{array}\\right]
  =
  \\sum_{m=1}^{n} (a_m) (b_m^*)
 `} />

<p style='text-align: center;'> ( * is complex conjugate)</p>


  <p>When I first saw this formula for complex numbers, I was like, why taking conjugate?</p>

  <p>My take is, since <strong>Inner Product of two same vector gives square of the magnitude of that vector (
    <Latex math={'< \\vec{a},\\vec{a}> =  \\| \\vec{a}  \\| ^2'} />),</strong> we take conjugate to maintain this property of inner product.
  </p>

  <p>For example:</p>
  <p>suppose  <Latex math={`\\vec{c} \\in \\mathbb{C}^1 \\; \\mathrm{and} \\; \\vec{c}= (g+if) \\; \\mathrm{where} \\; g,f \\in \\mathbb{R}`} />
  <Latex displayMode={true} math={`\\Rightarrow < \\vec{c} , \\vec{c} > =  \\| \\vec{c} \\| ^2`} />
  <Latex displayMode={true} math={`\\mathrm{where} \\; \\| \\vec{c} \\| ^2 = g^2 + f^2 = (g+fi) \\times (g-fi) = (\\vec{c})(\\vec{c}^*)`} />
  <Latex displayMode={true} math={`\\Rightarrow < \\vec{c} , \\vec{c} > =  \\| \\vec{c} \\| ^2 =  (\\vec{c})(\\vec{c}^*) `} />
    <Latex displayMode={true} math={`\\Rightarrow < \\vec{c} , \\vec{c} > = (\\vec{c})(\\vec{c}^*) `} />


</p>

<p>You might also ask why flip the order to <Latex math={'<\\vec{a},\\vec{b}> = \\vec{b}^* \\vec{a} '} /> instead of using <Latex math={'<\\vec{a},\\vec{b}> =\\vec{a}^* \\vec{b} '} />? </p>
  <p>That I am not sure, my guess is to keep the first vector, <Latex math={'\\vec{a}'} />
    , unmodified in the summation <Latex math={'\\sum_{m=1}^{n} (a_m) (b_m^*) '} />
   </p>
 
