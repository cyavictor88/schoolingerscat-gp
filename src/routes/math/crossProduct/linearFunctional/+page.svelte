<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';
	import RowsVec from '../common/latex/RowsVec.svelte';
	import { getCircleNum } from '$lib/unicode';
	onMount(() => {

	});
</script>

<Title hLevel={1}>Cross Product - Linear Functional</Title>
<p>In this section, we will show that</p>
<dl>
  <dt><b>{getCircleNum(1)}:</b></dt>
  <dd>If we fix <Latex math={`\\vec{a} = [a_1,a_2,a_3]`} />
		and
		<Latex math={`\\vec{b} = [b_1,b_2,b_3]`} /> as constants, and make <Latex
			math={`\\vec{v} =[v_1,v_2,v_3]`}
		/> as a variable vector. we then can create a linear functional
		<Latex center math={`\\phi ( \\vec{v} ):= \\det \\begin{bmatrix}
		v_{1}  & v_{2} &  v_{3} \\\\
	 a_{1} & a_{2} & a_{3} \\\\
		b_{1} & b_{2} & b_{3} \\\\
		\\end{bmatrix}`} />
		
	</dd>
  <dt><b>{getCircleNum(2)}:</b></dt>
  <dd>Then we can show that there is a unique vector, <Latex math={`\\vec{p}`} />, such that <Latex
		math={`\\vec{p} \\cdot  \\vec{v} = \\phi( \\vec{v})`} />
	</dd>
</dl>


<hr />


<dl>
  <dt><b>Proof for {getCircleNum(1)}:</b></dt>
  <dd>
		First, a linear functional is defined as a linear function that maps a vector to a scalar value. So by definition,
		we can see that  <Latex math={'\\phi ( \\vec{v} ):= \\det'} /><RowsVec cols={['v', 'a', 'b']} dim={3} /> is a linear functional
		if <Latex math={'a_i'} /> and <Latex math={'b_i'}/> are constant. Because we know determinant of this matrix can be calculated by 
		multiplying a series of <Latex math={'det(E)'} />s, and with <Latex math={'\\vec{a}'} />  and <Latex math={'\\vec{b}'} /> being constants,
		the final product will be linear combination of <Latex math={'v_1,v_2,v_3'} />. Which gives   <br /> 
		  <Latex math={' \\det'} /><RowsVec cols={['v', 'a', 'b']} dim={3} /> 
		<Latex math={' =  p_1 v_1 + p_2 v_2 + p_3 v_3 \\text{ ,where } p_i \\in \\mathbb{R} '} />
		<Latex center math={'\\Rightarrow \\phi ( \\vec{v} )=  p_1 v_1 + p_2 v_2 + p_3 v_3  \\text{ ,where } p_i \\in \\mathbb{R}'} />
	</dd>
	<dt><b>Proof for {getCircleNum(2)}:</b></dt>
  <dd>
		From the fact that <Latex math={'\\phi ( \\vec{v} )=  p_1 v_1 + p_2 v_2 + p_3 v_3  \\text{ where } p_i \\in \\mathbb{R}'} />:
		<li>
			By using the formula of inner product:
			<Latex center math={'\\phi ( \\vec{v} ) = p_1 v_1 + p_2 v_2 + p_3 v_3 = \\vec{p} \\cdot \\vec{v} \\text{ where } \\vec{p} = [p_1,p_2,p_3] ' }/> 
			<Latex center math={`\\Rightarrow \\phi ( \\vec{v} ) = 
			               det \\begin{bmatrix}
              v_{1}  & v_{2} &  v_{3} \\\\
             a_{1} & a_{2} & a_{3} \\\\
              b_{1} & b_{2} & b_{3} \\\\
              \\end{bmatrix} =
			\\vec{p} \\cdot \\vec{v}\\text{ ,where } \\vec{v}= [v_1,v_2,v_3]` }/> 

		</li>

	</dd>
</dl>
