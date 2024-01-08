<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';
	import RowsVec from '../common/latex/RowsVec.svelte';
	import { storeSubjectRoute } from '../store';
	import { Universe as Fig1 } from './threejs/fig1/Universe';
	let divFig1: HTMLDivElement;
	let universeFig1: Fig1;

	onMount(() => {
		universeFig1 = new Fig1(divFig1);
		universeFig1.start();
		universeFig1.eventBroker.emit('setMathMeshes');

		return () => {
			universeFig1.eventBroker.removeAllListeners();
			if (divFig1.firstChild) divFig1.removeChild(divFig1.firstChild);
		};
	});
</script>

<Title hLevel={1}>Cross Product - Introduction</Title>

<p>The definition of Cross Product is:</p>
<Latex center math={'\\boxed{\\;\\color{yellow} \\vec{a} \\times \\vec{b} \\color{black}=  \\color{red} \\| \\vec{a} \\|  \\color{blue} \\| \\vec{b} \\| \\color{black} sin(\\theta) \\color{orange} \\hat{u}}\\;'} />
<Latex center math={`\\text{where }  \\color{red} \\| \\vec{a} \\|  \\color{blue} \\| \\vec{b} \\| \\color{black} sin(\\theta) \\text{ is the white shaded area formed by }  \\color{red} \\vec{a} \\color{black}, \\color{blue}  \\vec{b}`}/>
<Latex center math={`\\text{and }  \\color{orange} \\hat{u} \\color{black}\\text{ is the unit vector orthogonal to the white shaded area }`} />
<div bind:this={divFig1} />

<p>
	In school, I was taught that given
	<Latex math={`\\vec{a} =`} /><ColsVec cols={['a']} dim={3} />
	and
	<Latex math={`\\vec{b} =`} /><ColsVec cols={['b']} dim={3} />, you can calculate their cross
	product using:
</p>

<Latex
	center
	math={`\\vec{a} \\times \\vec{b} = \\det \\begin{bmatrix}
				\\vec{i} & \\vec{j} & \\vec{k} \\\\
				a_1 	   & a_2      & b_2 \\\\
				b_1	     & a_3      & b_3
				\\end{bmatrix}`}
/>

<p>
	But the above formula raised a few questions for me. First, <Latex math={`\\vec{i}, \\vec{j},\\vec{k}`} /> are unit vectors, how do they fit inside a matrix? Even if it is just some notations for convenience, ok, fine. But why doing this
	calculation give you the cross product vector that is perpendicular to the plane formed by <Latex
		math={`\\vec{a}`}
	/>,<Latex math={`\\vec{b}`} /> and has magnitude equals to the area formed by <Latex
		math={`\\vec{a}`}
	/>,<Latex math={`\\vec{b}`} />?
</p>

<p>Today, we will prove it step by step:</p>

<ol>
	<li>
		<strong><a href={getHref('determinant', $storeSubjectRoute)}>Determinant</a>:</strong>
		<ol>
			<li>
				We first need to understand that determinant is the oriented volume of a given full-rank matrix.
			</li>
		</ol>
	</li>
	<hr />

	<li>
		<strong><a href={getHref('linear functional', $storeSubjectRoute)}>Linear Functional</a>:</strong>
		<ol>
			<li>
				Next we show that if we fix <Latex math={`\\vec{a} `} />
				and
				<Latex math={`\\vec{b} `} /> as constants, and make <Latex
					math={`\\vec{v} `}
				/> as a variable vector. we then can create a linear functional
				<Latex math={'\\phi'} /> such that: <br/><Latex math={'\\phi ( \\vec{v} )= \\det'} />
				<RowsVec cols={['v', 'a', 'b']} dim={3} />.
			</li>
			<li>
				Then we can show that there is a unique vector, <Latex math={`\\vec{p}`} />, such that <Latex
					math={`\\vec{p} \\cdot  \\vec{v} = \\phi( \\vec{v})`}
				/>
			</li>
		</ol>
	</li>
	<hr />

	<li>
		<strong><a href={getHref('cross product proof', $storeSubjectRoute)}>Cross Product Proof</a>:</strong>
		<ol>
			<li>
				Next we prove that <Latex math={`\\vec{p} = \\vec{a} \\times  \\vec{b} `} /> by showing that
				<Latex math={`\\vec{p}`} /> is aligned with unit vector <Latex math={'\\hat{u}'} /> and
				<Latex math={`\\| \\vec{p} \\| = \\text{ Area formed by } \\vec{a} \\text{ , } \\vec{b}`} />
			</li>

			<li>
				Finally, with <Latex math={`\\vec{p} = \\vec{a} \\times  \\vec{b} `} />, and
				<Latex math={`\\vec{p} \\cdot  \\vec{v} = \\phi( \\vec{v}) = \\det`} /><RowsVec
					cols={['v', 'a', 'b']}
					dim={3}
				/>, we can find <Latex math={` p_1 , p_2 , p_3`} /> with <Latex
					math={` p_1 = \\vec{p} \\cdot \\hat{i} , p_2 = \\vec{p} \\cdot \\hat{j} , p_3 = \\vec{p} \\cdot \\hat{k}`}
				/>, which if you put them together, will give you the "notation":
				<Latex
					center
					math={`\\vec{p} = \\det \\begin{bmatrix}
								\\vec{i} & \\vec{j} & \\vec{k} \\\\
								a_1 	   & a_2      & b_2 \\\\
								b_1	     & a_3      & b_3
								\\end{bmatrix} = \\vec{a} \\times \\vec{b} `}
				/>
			</li>
		</ol>
	</li>
</ol>

<style>
	ol {
		counter-reset: item;
	}
	li {
		display: block;
		margin: 8px 0px;
		/* color: #666666; */
	}
	li:before {
		content: counters(item, '.') ': ';
		counter-increment: item;
	}
	/* strong {
    padding: 8px;
  } */
</style>
