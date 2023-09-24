<script lang='ts'>
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { getCircleNum } from "$lib/unicode";
  import Title from "$lib/components/PageComp/Title.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
  import djangoSvg from "$lib/assets/fourierSeries/innerProduct/innderProductFn.svg";
	import { onMount } from "svelte";
  import jQuery from "jquery";
	import ActiveSpan from "$lib/components/PageComp/ActiveSpan.svelte";

  let show = false;
  $: toggle = ()=>{
      const t=document.querySelector("#svg1") as any;
      const htmlDocument= t.contentDocument.getElementById("g1752") as Document;
      const htmlDocumentMathText= t.contentDocument.getElementById("g11618") as Document;
      let jelMathText = jQuery(htmlDocumentMathText);

      let jel = jQuery(htmlDocument);
      if(!show){
      jelMathText.css('display','block');

      jel.children().css( "stroke-width", 0.1 );
      jel = jQuery(t.contentDocument.getElementById("g2672"));
      jel.children().css( "stroke-width", 0.2 );
      } else {
      jelMathText.css('display','none');
      jel.children().css( "stroke-width", 0.0 );
      jel = jQuery(t.contentDocument.getElementById("g2672"));
      jel.children().css( "stroke-width", 0.0 );
      }
      show=!show;

  }


</script> 
<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Inner Product for Functions:
</Title>
<p>Using the definition of Inner Product for complex vectors in n-dimensional space
  <Latex math={` ( \\langle\\vec{a},\\vec{b}\\rangle:=
  \\sum_{m=1}^{n} (a_m) (b_m^*) )
 `} />, 
  we can manufacture Inner Product for Functions. 
  Such function space can be referred as <a href='https://en.wikipedia.org/wiki/Hilbert_space'>Hilbert space</a>.</p>


<strong>Inner Product for Functions:</strong>

<Latex center={true} math={`
    \\langle f(t) , g(t) \\rangle = \\int_{T}^{} f(t) g^*(t) \\,dt
  `}
/>

<p style='text-align: center;'> ( * is complex conjugate)</p>

<b>Two Questions for the above formula: </b>
<ol>
  <li>Why is <Latex math={'\\sum_{}^{}'} /> replaced by <Latex math={'\\int_{}^{}'} />?</li>
  <li>What is the bound <Latex math={'T'} /> doing here?</li>

</ol>

<b>Answer:</b>

<ol>
  <li>
    If you treat continuous functions as a infinite dimension vectors, then the inner product between two functions (two infinite dimension vectors)
    results in infinite sums, and since the functions are continuous, you can turn <Latex math={'\\sum_{}^{}'} /> into integral <Latex math={'\\int_{}^{}'} />.
  </li>
  <li>
   The bound <Latex math={'T'} /> is the common period for both  <Latex math={'f(t)'} /> and  <Latex math={'g(t)'} />  .
  </li>
</ol>

<b>Example:</b>

<p>In Figure 8, you have two complex functions, <Latex math={'\\color{red}f(t)'} />, with period = 1.5, and <Latex math={'\\color{blue}g(t)'} />, with period = 2.</p>
<p>Let's say today we are interested in bounds between  <Latex math={'t_1=0'} /> and <Latex math={'t_2=6'} /> and we treat the functions to be 7-dimension vectors,</p>
<p>then we can pick any 7 points and construct the inner product of <Latex math={'\\color{red}f(t)'} /> and <Latex math={'\\color{blue}g(t)'} /> like 
  <ActiveSpan func={toggle}  txt={'this'}/>.</p> 
  <p>But of course you can see we are missing a lotttt of information by just taking 7 points from each function. This is why we take the integral over the whole interval <Latex math={"T"} />
    for getting the accurate inner product: <Latex math={` \\int_{T}^{} f(t) g^*(t) \\,dt 
   `} /> </p>

<p>This example also illustrate why having a periodic function making it nice work with inner product; The common period of  <Latex math={'f(t)'} /> and  <Latex math={'g(t)'} /> 
  is T=6. With T=6, you can see that the value inner product integral repeats every T=6, so we only need to one period to have enough information about this two functions regarding inner product.
</p>
<div style='border: 1px black solid; padding: 12px'>
<b>Figure 8:</b>
<!-- svelte-ignore a11y-missing-attribute -->
<object id='svg1' width="100%" type="image/svg+xml" data={djangoSvg}>Boo your browser does not support SVGs</object>
</div>
<hr />
<strong>The two most important takeaway:</strong>
<ol>
  <li>The Formula of Inner product for functions is <Latex math={` \\int_{T}^{} f(t) g^*(t) \\,dt 
  `} /> 
 <li>The Inner product of two orthogonal functions or two orthogonal vectors is <Latex math={`0`} /></li>
  
</ol>
<hr />

<p>Now we know about inner product, let's move on to the next topic: <a href='/signalProcessing/fourierSeries/basis'>Basis</a></p>


<!-- 
<style>

/* #svg1 #g1752 { 
      stroke-width:0.2;
} */

</style> -->