<script lang='ts'>
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { getCircleNum } from "$lib/unicode";
  import Title from "$lib/components/PageComp/Title.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
  import djangoSvg from "$lib/assets/fourierSeries/innerProduct/innderProductFn.svg";


  // const jq = window.$;


</script> 
<Title hLevel={2} backgroudColor={SITE_COLOR.TitleBG}>
  Inner Product for Functions:
</Title>
<p>Using the definition of Inner Product for complex vectors in n-dimensional space
  <Latex math={` ( \\langle\\vec{a},\\vec{b}\\rangle:=
  \\sum_{m=1}^{n} (a_m) (b_m^*) )
 `} />, 
  we can manufacture Inner Product for Functions. 
  Such function space can be refered as <a href='https://en.wikipedia.org/wiki/Hilbert_space'>Hilbert space</a>.</p>


<strong>Inner Product for Functions:</strong>

<Latex displayMode={true} math={`
    \\langle f(t) , g(t) \\rangle = \\int_{t_1}^{t_2} f(t) g^*(t) \\,dt
  `}
/>

<p style='text-align: center;'> ( * is complex conjugate)</p>

<p>Two Questions for the above formula: </p>
<ol>
  <li>Why is <Latex math={'\\sum_{}^{}'} /> replaced by <Latex math={'\\int_{}^{}'} />?</li>
  <li>What are the new variables  <Latex math={'t_1'} /> and <Latex math={'t_2'} /> doing here?</li>

</ol>

<p>Answer:</p>

<ol>
  <li>
    If you treat continuous functions as a infinite dimension vectors, then the inner product between two functions (or two infinite dimesion vectors)
    results in infinite sums, and since the functions are continuous, you can turn <Latex math={'\\sum_{}^{}'} /> into integral <Latex math={'\\int_{}^{}'} />.
  </li>
</ol>

<!-- svelte-ignore a11y-missing-attribute -->
<object id='svg1' width="100%" type="image/svg+xml" data={djangoSvg}>Boo your browser does not support SVGs</object>
    

<!-- 
<style>

/* #svg1 #g1752 { 
      stroke-width:0.2;
} */

</style> -->