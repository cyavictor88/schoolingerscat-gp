<script lang="ts">
	import { getHref, type IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import ColsVec from '../common/latex/ColsVec.svelte';

	import { sectionRoute } from '../store';
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

<p>We all know the definition of Cross Product is:</p>
<Latex center math={' \\vec{a} \\times \\vec{b} = \\| a \\| \\| b \\| sin(\\theta) \\hat{n}'} />

<div bind:this={divFig1} />

<p>
	But in school, I was taught that given
	<Latex math={`\\vec{a} =`} /><ColsVec cols={['a']} dim={3} />
	and
	<Latex math={`\\vec{b} =`} /><ColsVec cols={['b']} dim={3} />, you can calculate their cross
	product using:
</p>

<Latex
	center
	math={`\\vec{a} \\times \\vec{b} = \\det \\begin{bmatrix}
				\\vec{i} & a_1 & b_1 \\\\
				\\vec{j} & a_2 & b_2 \\\\
				\\vec{k} & a_3 & b_3
				\\end{bmatrix}`}
/>

<p>
	But WHY? First of all,<Latex math={`\\vec{i}, \\vec{j},\\vec{k}`} /> are unit vectors, how can you
	put that inside a matrix? Even if it is just some notations for convenience, fine, But why doing this
	calculation give you a vector that is perpendicular to the plane formed by <Latex
		math={`\\vec{a}`}
	/>,<Latex math={`\\vec{b}`} /> and with magnitude equals to the area formed by <Latex
		math={`\\vec{a}`}
	/>,<Latex math={`\\vec{b}`} />?
</p>

<p>Today, we will prove it step by step:</p>

<ol>
	<li>
		<strong><a href={getHref('parallelepiped', $sectionRoute)}>Parallelepiped</a>:</strong>
		<ol>
			<li>
				We first show that when we put together three vectors,
				<Latex math={`\\vec{r} =`} /><ColsVec cols={['r']} dim={3} />
				,
				<Latex math={`\\vec{a} =`} /><ColsVec cols={['a']} dim={3} />
				and
				<Latex math={`\\vec{b} =`} /><ColsVec cols={['b']} dim={3} />, to create a 3 x 3 matrix = <ColsVec
					cols={['r', 'a', 'b']}
					dim={3}
				/>, the determinant of this matrix is equal to the volume of the parallelepiped formed by
				<Latex math={`\\vec{r},\\vec{a},\\vec{b}`} />.
			</li>
		</ol>
	</li>
	<hr />

	<li>
		<strong><a href={getHref('linear functional', $sectionRoute)}>Linear Functional</a>:</strong>
		<ol>
			<li>
				Next we show that if we treat <Latex math={`\\vec{a} =`} /><ColsVec cols={['a']} dim={3} />
				and
				<Latex math={`\\vec{b} =`} /><ColsVec cols={['b']} dim={3} /> as constants, and make <Latex
					math={`\\vec{r} =`}
				/><ColsVec cols={['r']} dim={3} /> as a variable vector. we then can create a linear functional
				<Latex math={'\\phi'} /> where <Latex math={'\\phi ( \\vec{r} )= \\det'} />
				<ColsVec cols={['r', 'a', 'b']} dim={3} />.
			</li>
			<li>
				Then we can show that there is a unique vector, <Latex math={`\\vec{p}`} />, such that <Latex
					math={`\\vec{p} \\cdot  \\vec{r} = \\phi( \\vec{r})`}
				/>
			</li>
		</ol>
	</li>
	<hr />

	<li>
		Cross Product Proof:
		<ol>
			<li>
				Next we prove that <Latex math={`\\vec{p} = \\vec{a} \\times  \\vec{b} `} /> by showing that
				<Latex math={`\\vec{p}`} /> is aligned with unit vector <Latex math={'\\hat{n}'} /> and
				<Latex math={`\\| \\vec{p} \\| = \\text{ Area formed by } \\vec{a} \\text{ , } \\vec{b}`} />
			</li>

			<li>
				Finally, with <Latex math={`\\vec{p} = \\vec{a} \\times  \\vec{b} `} />, and
				<Latex math={`\\vec{p} \\cdot  \\vec{r} = \\phi( \\vec{r}) = \\det`} /><ColsVec
					cols={['r', 'a', 'b']}
					dim={3}
				/>, we can find <Latex math={` p_1 , p_2 , p_3`} /> by doing <Latex
					math={` \\vec{p} \\cdot \\hat{i} ,  \\vec{p} \\cdot \\hat{j} ,  \\vec{p} \\cdot \\hat{k}`}
				/>, which if you put them together, will give you the "notation":
				<Latex
					center
					math={`\\vec{p} = \\det \\begin{bmatrix}
								\\vec{i} & a_1 & b_1 \\\\
								\\vec{j} & a_2 & b_2 \\\\
								\\vec{k} & a_3 & b_3
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
