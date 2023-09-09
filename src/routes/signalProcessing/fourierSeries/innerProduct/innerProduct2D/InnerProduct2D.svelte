<script lang="ts">
	import Latex from '$lib/components/Latex/Latex.svelte';
	import innerProduct2D from '$lib/assets/fourierSeries/innerProduct/innerProduct2D.svg';
	import innerProduct2DCosine from '$lib/assets/fourierSeries/innerProduct/innerProduct2DCosine.svg';
	import { onMount } from 'svelte';
	import * as d3Fig from './d3Figs';
	import { getCircleNum } from '$lib/unicode';
	import Game from './Game.svelte';
	import Col2 from '$lib/components/PageComp/Col2.svelte';
	let fig1: HTMLDivElement;
	let fig2: HTMLDivElement;
	let fig3: HTMLDivElement;
	// let g1: HTMLDivElement;
	onMount(() => {
		fig1.append(d3Fig.getFig1()!);
		fig2.append(d3Fig.getFig2()!);
		fig3.append(d3Fig.getFig3()!);
		// g1.append(d3G.baseFig()!);
	});
</script>

<p>
	Given two <Latex math={'\\mathbb{R}^2'} /> vectors, <Latex math={'\\vec{a}=(a_x,a_y)'} /> and <Latex
		math={'\\vec{b}=(b_x,b_y)'}
	/>, as shown in Figure 1, you can see that
	<Latex math={'\\theta'} /> indicates how closely aligned <Latex math={'\\vec{a}'} /> and <Latex
		math={'\\vec{b}'}
	/> are.
</p>

<div style="display: flex; flex-flow: column nowrap; align-items:center;">
	<p>Figure 1</p>
	<!-- <object title="vectors in R^2" width="300" type="image/svg+xml" data={innerProduct2D}
		>Boo your browser does not support SVGs</object
	> -->
	<div bind:this={fig1} />
</div>

<p>
	Next I will give you the inner product formula and show how the inner product of <Latex
		math={'\\vec{a}'}
	/> and <Latex math={'\\vec{b}'} /> is related to <Latex math={'\\theta'} />.
</p>
<strong>
	Inner Product in <Latex math={'\\mathbb{R}^2'} />:
</strong>
<Latex
	displayMode={true}
	math={'\\mathrm{for} \\; \\vec{a}= \\left[\\begin{array}{c} a_x \\\\ a_y \\end{array} \\right] \\; \\mathrm{and} \\; \\vec{b}= \\left[\\begin{array}{c} b_x \\\\ b_y \\end{array}\\right],'}
/>
<Latex
	displayMode={true}
	math={'<\\vec{a},\\vec{b}>:= \\vec{a}^T \\vec{b} =' +
		' \\left[\\begin{array}{cc}a_x & a_y \\end{array}\\right]' +
		'\\left[\\begin{array}{c}b_x \\\\ b_y \\end{array}\\right]=a_x\\,b_x+a_y\\,b_y'}
/>

<p>
	Now, I will show how the Inner Product of <Latex math={'\\vec{a}'} /> and <Latex
		math={'\\vec{b}'}
	/>, which is <Latex math={'a_xb_x+a_yb_y'} />, is related to <Latex math={'\\theta'} /> using
	<Latex math={'d'} />.
</p>
<hr style="border-top: 1px grey dotted" />
<b>Step 1. Use Law of Cosine:</b>
<p>
	As shown in Figure 2, by using <a href="https://en.wikipedia.org/wiki/Law_of_cosines"
		>Low of Cosines</a
	>
	on the triangle in the figure, we can get the following equation for <Latex math={'d'} />:
</p>

<Col2>
	<div slot='col1'>
		<p>Figure 2</p>
		<div bind:this={fig2} />
	</div>
	<div slot='col2'>
		<Latex
		displayMode={true}
		math={'\\color{brown}{d^2} \\color{black}{=} \\color{red}{\\| \\vec{a}  \\|^2} \\color{black}{+} \\color{blue}{\\| \\vec{b}  \\|^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } '}
		/>
		<Latex
			displayMode={true}
			math={'\\mathrm{where} \\ \\color{red}{\\| \\vec{a}  \\|^2 = a_x^2+a_y^2} \\color{black}{\\quad \\mathrm{and \\quad }}  \\color{blue}{\\| \\vec{b}  \\|^2 = b_x^2+b_y^2}'}
		/>
		<fieldset>
			<legend>{getCircleNum(1)}</legend>
			<Latex
				displayMode={true}
				math={'\\Rightarrow \\color{brown}{d^2} \\color{black}{=} \\color{red}{a_x^2+a_y^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
			/>
		</fieldset>
	</div>
</Col2>


<hr style="border-top: 1px grey dotted" />

<b>Step 2. Make a Right Triangle:</b>

<p>
	We can use the x,y coordinates of <Latex math={'\\vec{a}'} /> and <Latex math={'\\vec{b}'} /> to construct
	the brown right triangle as shown in Figure 3, and use the brown trianlge to get <Latex
		math={'d'}
	/>:
</p>

<Col2>
	<div slot='col1'>
		<p>Figure 3</p>
		<!-- <object title="law of cosine" width="400" type="image/svg+xml" data={innerProduct2DCosine}
			>Boo your browser does not support SVGs</object
		> -->
		<div bind:this={fig3} />
	</div>
	<div slot='col2' >
		<Latex
		displayMode={true}
		math={'\\color{brown}{d_x} \\color{black} = | \\color{red}a_x \\color{brown} \\color{black} - \\color{blue}b_x \\color{black} | '}
		/>
		<Latex
			displayMode={true}
			math={'\\color{brown}{d_y} \\color{black} = | \\color{red}a_y \\color{brown} \\color{black} - \\color{blue}b_y \\color{black} | '}
		/>
		<Latex displayMode={true} math={'\\color{brown}{d^2} = {d_x}^2 + {d_y}^2'} />
		<fieldset>
			<legend>{getCircleNum(2)}</legend>
			<Latex
				displayMode={true}
				math={'\\Rightarrow \\color{brown}{d^2} \\color{black} = ( \\color{red}{a_x} \\color{black}- \\color{blue} b_x \\color{black})^2+( \\color{red}{a_y} \\color{black}- \\color{blue} b_y \\color{black})^2'}
			/>
		</fieldset>
	</div>
</Col2>

<hr style="border-top: 1px grey dotted" />

<p>
	Now we equate <Latex math={'\\color{brown}{d^2}'} /> = {getCircleNum(2)} = {getCircleNum(1)} and get:
</p>

<Latex
	displayMode={true}
	math={'\\color{brown}{d^2} \\color{black} =    ( \\color{red}{a_x} \\color{black}- \\color{blue} b_x \\color{black})^2+( \\color{red}{a_y} \\color{black}- \\color{blue} b_y \\color{black})^2 \\color{black}{=} \\color{red}{a_x^2+a_y^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
/>

<Latex
	displayMode={true}
	math={'\\Rightarrow  (a_x^2+b_x^2-2a_xb_x) +(a_y^2+b_y^2-2a_yb_y)= \\color{red}{a_x^2+a_y^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
/>
<Latex
	displayMode={true}
	math={'\\Rightarrow (\\cancel{a_x^2}+\\cancel{b_x^2}-2a_xb_x )+(\\cancel{a_y^2}+\\cancel{b_y^2}-2a_yb_y)= \\color{red}{\\cancel{a_x^2}+\\cancel{a_y^2}} \\color{black}{+} \\color{blue}{\\cancel{b_x^2}+\\cancel{b_y^2}} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
/>
<Latex
	displayMode={true}
	math={'\\Rightarrow -2a_xb_x-2a_yb_y = -2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta)'}
/>
<Latex
	displayMode={true}
	math={'\\Rightarrow a_xb_x+a_yb_y = < \\vec{a},\\vec{b}> = \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta)'}
/>
<Latex
	displayMode={true}
	math={'\\Rightarrow cos(\\theta)   = \\frac{< \\vec{a},\\vec{b}>}{  \\| \\vec{a}  \\| \\|\\vec{b}\\| }'}
/>

<p>
	There you have it, the above shows how the cosine of the angle between two vectors can be
	expressed using their inner product and lengths.
</p>

<!-- <div bind:this={g1} /> -->
<Col2 >
	<div slot='col1'> 
		<p>Interactive Demo:  (drag the vectors' arrow head around)</p>

		<Game />
	</div>
</Col2>

<div>
	using the interactive demo above, you can verify that:
	<ol>
		<li>
			When two vectors are getting more aligned in their poting direction, their inner product
			increases
		</li>
		<li>When two vectors are pointing away from each other, their inner product decreases</li>
		<li>
			And most importantly, when two vectors are perpendicular to each other, their inner product is
			0
		</li>
	</ol>
</div>

<hr />


<style>
fieldset {
    border: 1px dashed #555555;
}

</style>