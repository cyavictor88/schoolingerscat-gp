<script>
	import Title from "$lib/components/PageComp/Title.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
	import Latex from '$lib/components/Latex/Latex.svelte';

</script>
<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Orthogonal Basis:
</Title>

<p>Comparing with basis, orthogonal basis has one more condition:</p>
<ol>
	<li>The vectors in the set are linear independent</li>
	<li>The vectors in the set span the vector space</li>
  <b><li>The vectors in the set are orthogonal to each other</li></b>
</ol>

<p>With the help of inner product (if two vectors are orthogonal, their inner product = 0), we can rewrite <b>3.</b> as the following:</p>


<p>An orthogonal basis for a n-dimensional space can be expressed as <Latex math={'\\{v_1, v_2,...,v_n\\}'} /> where:</p>

<Latex 
center={true}
math={`
 \\langle v_i,v_j \\rangle =
    \\left\\{
        \\begin{array}{ll}
            0  & \\mathrm{,if} \\; i \\neq j \\\\
            \\| v_i  \\| ^2  & \\mathrm{,if} \\; i=j
        \\end{array}
    \\right. 
`}/>
