<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';
  import { page } from '$app/stores';
	import {VolumeAreaHeight} from './d3/VolumeAreaHeight';
	import RowsVec from '../common/latex/RowsVec.svelte';

		// const rowop = mj.add(mj.multiply(2, vecv), vecb) as number[];
	let d3 : VolumeAreaHeight ;
	let d3Div : HTMLDivElement;
	onMount(() => {
		d3 = new VolumeAreaHeight();
		d3Div.append(d3.svgNode!);

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

<p>We need to prove that <Latex math={'\\vec{p}= \\vec{a} \\times \\vec{b}'} /> by showing:
</p>
<ul>
	<li><Latex math={'\\|\\vec{p}\\|=' } />  Area formed by <Latex math={'\\vec{a}'} />, <Latex math={'\\vec{b}'} /> </li>
	<li><Latex math={'\\vec{p}'} /> is orthogonal to the plane of the Area formed by <Latex math={'\\vec{a}'} />, <Latex math={'\\vec{b}'} /> </li>
</ul>
<hr />
<p><b>Proof:</b></p>
<div style='display: flex; flex-flow: row nowrap; gap:20px'>
	<div>
	<Latex center math={`
	 \\| \\phi (\\vec{v})) \\| =	\\left|\\left| det \\begin{bmatrix}
v_{1}  & v_{2} &  v_{3} \\\\
a_{1} & a_{2} & a_{3} \\\\
b_{1} & b_{2} & b_{3} \\\\
\\end{bmatrix} \\right| \\right| = Volume
(\\vec{v},\\vec{a},\\vec{b}) ` }/> 
<Latex center math={`= \\color{orange}Area_{\\vec{a}\\vec{b}}\\color{black} * \\color{brown}height\\color{black} = \\color{orange}A\\color{black} * \\color{brown}(\\vec{v}\\cdot\\hat{u}) `} />
<Latex center math={` \\text{ ( where } A=Area_{\\vec{a}\\vec{b}}  \\text{ and } \\hat{u} \\text{ is unit vector that is orthogonal to A) } `} />
<Latex center math={`= A (\\hat{u}\\cdot\\vec{v})=A\\hat{u}\\cdot\\vec{v}`} />
<Latex center math={`= A \\hat{u}\\cdot\\vec{v} = \\|\\vec{p}\\cdot\\vec{v}\\|`} />
<hr />
<Latex math={`\\text{case 1: } A \\hat{u}\\cdot\\vec{v} = \\vec{p}\\cdot\\vec{v}`} />
<Latex center math={`\\rightarrow  A\\hat{u} =  \\vec{p} `} />
<Latex center math={`\\rightarrow  A\\hat{u} = \\|\\vec{p}\\|  \\frac{\\vec{p}}{ \\| \\vec{p} \\| } `} />
<Latex center math={`\\Rightarrow A = \\|\\vec{p}\\| \\text{ , } \\hat{u} =  \\frac{\\vec{p}}{ \\| \\vec{p} \\| }`} />
<hr />
<Latex math={`\\text{case 2: } A \\hat{u}\\cdot\\vec{v} = -(\\vec{p}\\cdot\\vec{v})`} />
<Latex center math={`\\rightarrow  A\\hat{u} =  -\\vec{p} `} />
<Latex center math={`\\rightarrow  A\\hat{u} = \\|\\vec{p}\\|  \\frac{-\\vec{p}}{ \\| \\vec{p} \\| } `} />
<Latex center math={`\\Rightarrow A = \\|\\vec{p}\\| \\text{ , } \\hat{u} =  \\frac{-\\vec{p}}{ \\| \\vec{p} \\| }`} />
<hr />
<p>We have shown that</p>
<ul>
	<li><Latex math={'\\|\\vec{p}\\|=' } />  Area formed by <Latex math={'\\vec{a}'} />, <Latex math={'\\vec{b}'} /> </li>
	<li><Latex math={'\\vec{p}'} /> is orthogonal to the Area formed by <Latex math={'\\vec{a}'} />, <Latex math={'\\vec{b}'} /> </li>
</ul>
</div>
<div style="width:500px; height:400px; position:relative; display:flex; flex-flow: column nowrap;" bind:this={d3Div} />
</div>
<hr />
<p><b>Final Cross Product Proof:</b></p>
<p>Now we know that <Latex math={` \\phi( \\vec{v}) = \\vec{p} \\cdot  \\vec{v} = \\det`} /><RowsVec
			cols={['v', 'a', 'b']}
			dim={3}
		/>, where <Latex math={`\\vec{p}`} /> is orthogonal to the  plane of <Latex math={` \\text{ Area formed by } \\vec{a} \\text{ , } \\vec{b}`} />  and
		<Latex math={`\\| \\vec{p} \\| = \\text{ Area formed by } \\vec{a} \\text{ , } \\vec{b}`} /></p>
<p>How do we find the <Latex math={'p_1, p_2, p_3 '} /> of  <Latex math={'\\vec{p}'} />?</p>
<p><b>Finding <Latex math={'p_1'}/>:</b></p>
<p>feed <Latex math={'\\vec{v}=[1,0,0]'}/> into <Latex math={'\\phi (\\vec{v})'}/></p>
<Latex center math={`\\phi ([1,0,0]) = 
det \\begin{bmatrix}
1  & 0 &  0 \\\\
a_{1} & a_{2} & a_{3} \\\\
b_{1} & b_{2} & b_{3} \\\\
\\end{bmatrix} = 
\\vec{p} \\cdot [1,0,0] = [p_1,p_2,p_3] \\cdot [1,0,0] = p_1`}/>

<p><b>Finding <Latex math={'p_2'}/>:</b></p>
<p>feed <Latex math={`\\vec{v}=[0,1,0]`}/> into <Latex math={`\\phi (\\vec{v})`}/></p>
<Latex center math={`\\phi ([0,1,0]) = det \\begin{bmatrix}
0  & 1 &  0 \\\\
a_{1} & a_{2} & a_{3} \\\\
b_{1} & b_{2} & b_{3} \\\\
\\end{bmatrix} = \\vec{p} \\cdot [0,1,0] = [p_1,p_2,p_3] \\cdot [0,1,0] = p_2`}/>

<p><b>Finding <Latex math={`p_3`}/>:</b></p>
<p>feed <Latex math={`\\vec{v}=[0,0,1]`}/> into <Latex math={`\\phi (\\vec{v})`}/></p>
<Latex center math={`\\phi ([0,0,1]) = det \\begin{bmatrix}
0 & 0 &  1 \\\\
a_{1} & a_{2} & a_{3} \\\\
b_{1} & b_{2} & b_{3} \\\\
\\end{bmatrix} = \\vec{p} \\cdot [0,0,1] = [p_1,p_2,p_3] \\cdot [0,0,1] = p_3`}/>



<p>
which is basically  doing <Latex
	math={` p_1 = \\vec{p} \\cdot \\hat{i} \\; , \\; p_2 = \\vec{p} \\cdot \\hat{j} \\; , \\; p_3 = \\vec{p} \\cdot \\hat{k}`}
/>, which if you put them together, will give you the "notation":
<Latex
	center
	math={`\\vec{p} = \\det \\begin{bmatrix}
				\\vec{i} & \\vec{j} & \\vec{k} \\\\
				a_1 	   & a_2      & b_2 \\\\
				b_1	     & a_3      & b_3
				\\end{bmatrix} = \\vec{a} \\times \\vec{b} `}
/>

</p>
