<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';
	import { sectionRoute } from '../store';
	import RowsVec from '../common/latex/RowsVec.svelte';
	import { getCircleNum } from '$lib/unicode';
	onMount(() => {

	});
</script>

<Title hLevel={1}>Cross Product - Linear Functional</Title>
<p>In this section, we will show that</p>
<dl>
  <dt><b>{getCircleNum(1)}:</b></dt>
  <dd>If we fix <Latex math={`\\vec{a} =`} /><ColsVec cols={['a']} dim={3} />
		and
		<Latex math={`\\vec{b} =`} /><ColsVec cols={['b']} dim={3} /> as constants, and make <Latex
			math={`\\vec{v} =`}
		/><ColsVec cols={['v']} dim={3} /> as a variable vector. we then can create a linear functional
		<Latex math={'\\phi ( \\vec{v} ):= \\det'} />
		<RowsVec cols={['v', 'a', 'b']} dim={3} />
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
		if <Latex math={'a_i'} /> and <Latex math={'b_i'}/> are constants because
		then  <Latex math={' \\det'} /><RowsVec cols={['v', 'a', 'b']} dim={3} /> 
		<Latex math={' =  p_1 v_1 + p_2 v_2 + p_3 v_3 \\text{ ,where } p_i \\in \\mathbb{R} '} />
		<Latex center math={'\\Rightarrow \\phi ( \\vec{v} )=  p_1 v_1 + p_2 v_2 + p_3 v_3  \\text{ ,where } p_i \\in \\mathbb{R}'} />
	</dd>
	<dt><b>Proof for {getCircleNum(2)}:</b></dt>
  <dd>
		From the fact that <Latex math={'\\phi ( \\vec{v} )=  p_1 v_1 + p_2 v_2 + p_3 v_3  \\text{ where } p_i \\in \\mathbb{R}'} />:
		<li>
			By using the formula of inner product:
			<Latex center math={'\\phi ( \\vec{v} ) = p_1 v_1 + p_2 v_2 + p_3 v_3 = \\vec{p} \\cdot \\vec{v} \\text{ where } \\vec{p} = [p_1,p_2,p_3]^T ' }/> 
			<Latex center math={'\\Rightarrow \\phi ( \\vec{v} ) = \\vec{p} \\cdot \\vec{v}' }/> 

		</li>

	</dd>
</dl>
