<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';
  import { page } from '$app/stores';
	import {VolumeAreaHeight} from './d3/VolumeAreaHeight';
		const vecv = [2, 3, -1];
		const veca = [-4, -1, -1];
		const vecb = [-3, -1, 3];
		// const rowop = mj.add(mj.multiply(2, vecv), vecb) as number[];
		// let d3 : VolumeAreaHeight = new VolumeAreaHeight();
	onMount(() => {

	});
</script>

<Title hLevel={1}>Cross Product - Proof</Title>

<p>From the previous <a href={$page.route.id+'/../linearFunctional'}>Linear Functional</a>, we know

</p>
<Latex center math={` \\phi ( \\vec{v} ) = 
			               det \\begin{bmatrix}
              v_{1}  & v_{2} &  v_{3} \\\\
             a_{1} & a_{2} & a_{3} \\\\
              b_{1} & b_{2} & b_{3} \\\\
              \\end{bmatrix} =
			\\vec{p} \\cdot \\vec{v}` }/> 
			<Latex center math={'\\text{ where } \\vec{p} \\text{ is unique,}  \\vec{v}= [v_1,v_2,v_3] \\text{ is variable vector}'} />
			<Latex center math={'\\text{and } \\vec{a}=[a_1,a_2,a_3], \\vec{b}=[b_1,b_2,b_3] \\text{ are two constant vectors}'} />

<p>We need to prove that 
</p>
<ul>
	<li><Latex math={'\\vec{p}'} /> is orthogonal to the Area formed by <Latex math={'\\vec{a}'} />, <Latex math={'\\vec{b}'} /> </li>
	<li><Latex math={'\\|\\vec{p}\\|=' } />  Area formed by <Latex math={'\\vec{a}'} />, <Latex math={'\\vec{b}'} /> </li>
</ul>
<hr />
<p><b>Proof:</b></p>

<Latex center math={`
			              \\left|\\left| det \\begin{bmatrix}
              v_{1}  & v_{2} &  v_{3} \\\\
             a_{1} & a_{2} & a_{3} \\\\
              b_{1} & b_{2} & b_{3} \\\\
              \\end{bmatrix} \\right| \\right| = Volume
			(\\vec{v},\\vec{a},\\vec{b}) = Area_{\\vec{a}\\vec{b}} * height` }/> 