<script lang="ts">
	import Katex from '$lib/components/Katex/Katex.svelte';
	import innerProduct2D from '$lib/assets/fourierSeries/innerProduct/innerProduct2D.svg';
	import innerProduct2DCosine from '$lib/assets/fourierSeries/innerProduct/innerProduct2DCosine.svg';
	import { onMount } from 'svelte';
	import * as d3Fig from './d3';
	import * as d3G from './d32d';
	import { getCircleNum } from '$lib/unicode';
	let fig1: HTMLDivElement;
	let fig2: HTMLDivElement;
	let fig3: HTMLDivElement;
	// let g1: HTMLDivElement;
	onMount(()=>{
		fig1.append(d3Fig.getFig1()!);
		fig2.append(d3Fig.getFig2()!);
		fig3.append(d3Fig.getFig3()!);
		// g1.append(d3G.baseFig()!);
	})

</script>

<!-- <div bind:this={g1} /> -->


<p>
	Given two <Katex math={'\\mathbb{R}^2'} /> vectors, <Katex math={'\\vec{a}=(a_x,a_y)'} /> and <Katex
		math={'\\vec{b}=(b_x,b_y)'}
	/>, as shown in Figure 1, you can see that
	<Katex math={'\\theta'} /> indicates how closely aligned <Katex math={'\\vec{a}'} /> and <Katex
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
	Next I will give you the inner product formula and show how the inner product of <Katex
		math={'\\vec{a}'}
	/> and <Katex math={'\\vec{b}'} /> is related to <Katex math={'\\theta'} />.
</p>
<strong>
	Inner Product in <Katex math={'\\mathbb{R}^2'} />:
</strong>
<Katex
	displayMode={true}
	math={'\\mathrm{for} \\; \\vec{a}= \\left[\\begin{array}{c} a_x \\\\ a_y \\end{array} \\right] \\; \\mathrm{and} \\; \\vec{b}= \\left[\\begin{array}{c} b_x \\\\ b_y \\end{array}\\right],'}
/>
<Katex
	displayMode={true}
	math={'<\\vec{a},\\vec{b}>:= \\vec{a}^T \\vec{b} =' +
		' \\left[\\begin{array}{cc}a_x & a_y \\end{array}\\right]' +
		'\\left[\\begin{array}{c}b_x \\\\ b_y \\end{array}\\right]=a_x\\,b_x+a_y\\,b_y'}
/>

<p>
	Now, I will show how <Katex math={'a_xb_x+a_yb_y'} /> is related to <Katex math={'\\theta'} /> using
	<Katex math={'d'} />.
</p>
<hr style="border-top: 1px grey dotted" />
<b>Step 1. Using law of Cosine:</b>
<p>
	As shown in Figure 2, by using <a href="https://en.wikipedia.org/wiki/Law_of_cosines">Low of Cosines</a> on the triangle in the figure, we can get the
	following equation for <Katex math={'d'}/>:
</p>

<div style="display: flex; gap:20px;">
	<!-- <div style="display: flex; flex-flow: column nowrap; gap:5px;"> -->
	
	<div style='margin: auto; margin-left:0;margin-right:0;'>
		<Katex
			displayMode={true}
			math={'\\color{brown}{d^2} \\color{black}{=} \\color{red}{\\| \\vec{a}  \\|^2} \\color{black}{+} \\color{blue}{\\| \\vec{b}  \\|^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) } '}
		/>
		<Katex
			displayMode={true}
			math={'\\mathrm{where} \\ \\color{red}{\\| \\vec{a}  \\|^2 = a_x^2+a_y^2} \\color{black}{\\quad \\mathrm{and \\quad }}  \\color{blue}{\\| \\vec{b}  \\|^2 = b_x^2+b_y^2}'}
		/>
		<fieldset>
			<legend>{getCircleNum(1)}</legend>
			<Katex
				displayMode={true}
				math={'\\Rightarrow \\color{brown}{d^2} \\color{black}{=} \\color{red}{a_x^2+a_y^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
			/>
		</fieldset>
	</div>

	<div style="display: flex; flex-flow: column nowrap; align-items:center;">
		<p>Figure 2</p>
		<!-- <object title="law of cosine" width="400" type="image/svg+xml" data={innerProduct2DCosine}
			>Boo your browser does not support SVGs</object
		> -->
		<div bind:this={fig2} />
	</div>

</div>
<hr style="border-top: 1px grey dotted" />

<b>Step 2. Making a new Triangle:</b>


<p>We can use the x,y coordinates of <Katex math={'\\vec{a}'} /> and <Katex math={'\\vec{b}'} /> to construct the brown right triangle as shown in Figure 3, and use the brown trianlge 
  to get <Katex math={'d'} />:
</p>

<div style="display: flex; gap:20px;">

	<div style='margin: auto; margin-left:0;margin-right:0;'>
		<Katex
		displayMode={true}
		math={'\\color{brown}{d_x} \\color{black} = | \\color{red}a_x \\color{brown} \\color{black} - \\color{blue}b_x \\color{black} | '}
	/>
		<Katex
			displayMode={true}
			math={'\\color{brown}{d_y} \\color{black} = | \\color{red}a_y \\color{brown} \\color{black} - \\color{blue}b_y \\color{black} | '}
		/>
		<Katex
		displayMode={true}
		math={'\\color{brown}{d^2} = {d_x}^2 + {d_y}^2'}
	/>
		<fieldset>
			<legend>{getCircleNum(2)}</legend>
			<Katex
			displayMode={true}
			math={'\\Rightarrow \\color{brown}{d^2} \\color{black} = ( \\color{red}{a_x} \\color{black}- \\color{blue} b_x \\color{black})^2+( \\color{red}{a_y} \\color{black}- \\color{blue} b_y \\color{black})^2'}
		/>
		</fieldset>

	</div>

	<div style="display: flex; flex-flow: column nowrap; align-items:center;">
		<p>Figure 3</p>
		<!-- <object title="law of cosine" width="400" type="image/svg+xml" data={innerProduct2DCosine}
			>Boo your browser does not support SVGs</object
		> -->
		<div bind:this={fig3} />
	</div>

</div>

<hr style="border-top: 1px grey dotted" />

<p>Now we equate <Katex math={'\\color{brown}{d^2}'} /> = {getCircleNum(2)} = {getCircleNum(1)} and get:</p>





<Katex
	displayMode={true}
	math={'( \\color{red}{a_x} \\color{black}- \\color{blue} b_x \\color{black})^2+( \\color{red}{a_y} \\color{black}- \\color{blue} b_y \\color{black})^2 \\color{black}{=} \\color{red}{a_x^2+a_y^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'}
	/>



	<Katex displayMode={true} math ={'\\Rightarrow  (a_x^2+b_x^2-2a_xb_x) +(a_y^2+b_y^2-2a_yb_y)= \\color{red}{a_x^2+a_y^2} \\color{black}{+} \\color{blue}{b_x^2+b_y^2} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'} />
	<Katex displayMode={true} math ={'\\Rightarrow (\\cancel{a_x^2}+\\cancel{b_x^2}-2a_xb_x )+(\\cancel{a_y^2}+\\cancel{b_y^2}-2a_yb_y)= \\color{red}{\\cancel{a_x^2}+\\cancel{a_y^2}} \\color{black}{+} \\color{blue}{\\cancel{b_x^2}+\\cancel{b_y^2}} \\color{black}{ - 2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta) }'} />
	<Katex displayMode={true} math ={'\\Rightarrow -2a_xb_x-2a_yb_y = -2 \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta)'} />
	<Katex displayMode={true} math ={'\\Rightarrow a_xb_x+a_yb_y = < \\vec{a},\\vec{b}> = \\| \\vec{a}  \\| \\|\\vec{b}\\| cos(\\theta)' } />
	<Katex displayMode={true} math ={'\\Rightarrow cos(\\theta)   = \\frac{< \\vec{a},\\vec{b}>}{  \\| \\vec{a}  \\| \\|\\vec{b}\\| }'} />





		<p>There you have it, the above shows how the cosine of the angle between two vectors can be expressed using their inner product and lengths.</p>

