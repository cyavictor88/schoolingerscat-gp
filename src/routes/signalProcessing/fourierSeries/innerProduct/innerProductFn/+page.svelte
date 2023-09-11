<script lang='ts'>
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { getCircleNum } from "$lib/unicode";
  import Title from "$lib/components/PageComp/Title.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
</script> 
<Title hLevel={2} backgroudColor={SITE_COLOR.TitleBG}>
  Inner Product for Functions:
</Title>
<p>Using the definition of Inner Product for complex vectors in n-dimensional space, 
  we can manufacture Inner Product for Functions with complex number. 
  Such function space is refered as <a href='https://en.wikipedia.org/wiki/Hilbert_space'>Hilbert space</a>.</p>


<strong>Inner Product for Functions:</strong>

<Latex displayMode={true} math={`
    \\langle f(t) , g(t) \\rangle = \\int_{t_1}^{t_2} f(t) g^*(t) \\,dt
  `}
/>

<span> (Where * is complex conjugate)</span>

<p>Now let's explain two things: </p>
<ol>
  <li>Why is <Latex math={'\\sum_{}^{}'} /> replaced by <Latex math={'\\int_{}^{}'} />?</li>
  <li>What are the new variables  <Latex math={'t_1'} /> and <Latex math={'t_2'} /> doing here?</li>

</ol>