<script>
	import Title from "$lib/components/PageComp/Title.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
	import Latex from '$lib/components/Latex/Latex.svelte';

</script>
<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Vector Decomposition using Orthogonal Basis:
</Title>
<p>Given a orthogonal basis for a n-dimensional space: <Latex math={'\\{v_1, v_2,...,v_n\\}'} /></p>
 
<p>
 Say there is a vector, <Latex math={'u'} />, and we want to express <Latex math={'u'}/> 
 as a linear combination of <Latex math={'\\{v_1, v_2,...,v_n\\}'} /> such that:
</p>

<Latex displayMode={true}
math={`u = c_1 v_1 + c_2 v_2 + ... + c_n v_n = \\sum_{i=1}^{n} c_i v_i`} />

<p style='text-align: center;'> ( where <Latex math={'c_i'}/> are real numbers)</p>
<p>So how to get the coefficients <Latex math={'c_1,c_2,...,c_n'}/> ?</p>

<p>Using inner product, the solution is quite simple:</p>

<p>Suppose we are trying to find the inner product of <Latex math={'u'} /> and <Latex math={'v_i'} />, then we have:</p>

<Latex displayMode={true} math={`\\Rightarrow  \\langle u, v_i  \\rangle  = \\langle c_1 v_1 , v_i \\rangle + \\langle c_2 v_2,v_i \\rangle + ...+ \\langle c_i v_i , v_i  \\rangle +.... + \\langle c_n v_n,v_i \\rangle`} />
<Latex displayMode={true} math={`\\color{${SITE_COLOR.LayoutFSContentBG}}{\\Rightarrow  \\langle u, v_i  \\rangle} \\color{black} =  c_1\\langle v_1 , v_i \\rangle +  c_2\\langle v_2,v_i \\rangle + ...+  c_i\\langle v_i , v_i  \\rangle +.... +  c_n\\langle v_n,v_i \\rangle`} />

<p>By using the property of orthogonal basis:</p>
<Latex 
displayMode={true}
math={`
 \\langle v_i,v_j \\rangle =
    \\left\\{
        \\begin{array}{ll}
            0  & \\mathrm{,if} \\; i \\neq j \\\\
            \\| v_i  \\| ^2  & \\mathrm{,if} \\; i=j
        \\end{array}
    \\right. 
`}/>


<Latex displayMode={true} math={`\\Rightarrow  \\langle u, v_i  \\rangle =  c_1 \\cdot 0 +  c_2 \\cdot 0 ...+  c_i \\cdot \\| v_i  \\| ^2 +.... +  c_n \\cdot 0`} />
<Latex displayMode={true} math={`\\Rightarrow  \\langle u, v_i  \\rangle =   c_i \\| v_i  \\| ^2 `} />
<Latex displayMode={true} math={`\\Rightarrow  c_i  =  \\frac{ \\langle u, v_i  \\rangle}{ \\| v_i  \\| ^2} `} />

<p>Cool, by trying to find inner product of <Latex math={'u'} /> and <Latex math={'v_i'} />, we end up finding a general way to express <Latex math={'c_i'} />.</p>

<p> So now we can write <Latex math={'u'} /> as : </p>

<Latex displayMode={true} math={`\\Rightarrow u = \\sum_{i=1}^{n} c_i v_i`} />

<Latex displayMode={true} math={`\\Rightarrow  u = \\sum_{i=1}^{n} \\frac{ < u, v_i > }{ \\| v_i  \\| ^2 } v_i`} />

<p>Notice that each <Latex math={'c_i'} /> is expressed explicity as an unique value, that means there is only one set of linear combination of <Latex math={'\\{v_1, v_2,...,v_n\\}'} /> that gives <Latex math={'u'} /> .</p>