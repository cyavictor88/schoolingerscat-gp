<script>
	import Title from "$lib/components/PageComp/Title.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
	import Latex from '$lib/components/Latex/Latex.svelte';

</script>
<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Function Decomposition using Orthogonal Basis:
</Title>

<p>We can also decompose a function using orthogonal basis if you can find a basis, 
	<Latex math={'\\{g_1(t), g_2(t),...\\}'} />, such that for each function in that basis:</p>

<Latex 
displayMode={true}
math={`
 \\langle g_i(t),g_j(t) \\rangle =
    \\left\\{
        \\begin{array}{ll}
            0  & \\mathrm{,if} \\; i \\neq j \\\\
						\\langle g_i(t), g_i(t) \\rangle  & \\mathrm{,if} \\; i=j
        \\end{array}
    \\right. 
`}/>

<Latex displayMode={true}
math={'\\mathrm{where}'}/>

<Latex displayMode={true}
math={'\\langle g_i(t) , g_j(t) \\rangle = \\int_T g_i(t) g_j^*(t) \\,dt'} />



<p>Then given a function <Latex math={'f(t)'}/>, we can decompose that function into:</p>
<Latex displayMode={true} math={`\\Rightarrow f(t) = \\sum_{i=1}^{n} c_i g_i(t)`} />

<Latex displayMode={true} math={`\\Rightarrow  f(t) = \\sum_{i=1}^{n} \\frac{ \\langle f(t), g_i(t) \\rangle }{ \\langle g_i(t), g_i(t) \\rangle } v_i`} />
<Latex displayMode={true}
math={'\\mathrm{where \\; }n=\\infty'}/>

<p>And is there such basis? Yes! thats basically what fourier series is.</p>
