<script lang='ts'>
	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
	import HiddenBlock from './HiddenBlock.svelte';

	import { getCircleNum } from '$lib/unicode';
	import { onMount } from "svelte";
	let showSet: Set<number> = new Set<number>();
	const toggleShow = (idx: number) => {
		const newSet = new Set<number>(showSet);
		if (showSet.has(idx)) newSet.delete(idx);
		else newSet.add(idx);
		showSet = newSet;
	};

	const showAll = () => {
		let newSet = new Set<number>();
		if (showSet.size === 0) for (let index = 1; index <= 6; index++) newSet.add(index);
		showSet = newSet;
	};
</script>

<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Exponential Form:
</Title>
<p>
Fourier Series is <Latex math={'f(t)= \\sum_{k=0}^{\\infty} {a_k cos(\\tfrac{2\\pi}{T} kt)} +  \\sum_{k=0}^{\\infty} {b_k sin(\\tfrac{2\\pi}{T} kt)}  , \\text{where } a_k,b_k  \\in \\mathbb{R}'} />
</p>

<p>
  But it can also be written in Exponential form:
</p>

<Latex center math={'f(t)= \\sum_{k=-\\infty}^{\\infty} {c_k e^{j\\tfrac{2\\pi}{T} kt}} , \\text{where } c_k  \\in \\mathbb{C}'} />


<p>
	To prove it works, we need to show that the set
	<Latex math={`\\{ e^{j \\tfrac{2\\pi}{T} kt } \\} `}/> 
	is
</p>
<ol>
	<li>Orthogonal</li>
	<li>Can span any periodic function with period <Latex math={'T'} /></li>
</ol>
<hr />
<ol>
	<li>		
		<b>Orthogonality:</b>
		<p>
			we need to show that for any function in the set <Latex
				math={'g_i(t) \\in \\{ \\; e^{j \\tfrac{2\\pi}{T} k_i t }  \\} '}
			/>
			,
		</p>
		<Latex
		center={true}
		math={`
\\langle g_i(t),g_j(t) \\rangle =
	\\left\\{
			\\begin{array}{ll}
					0  & \\mathrm{,if} \\; i \\neq j \\\\
					\\langle g_i(t), g_i(t) \\rangle  & \\mathrm{,if} \\; i=j
			\\end{array}
	\\right. 
`}
	/>
	<p>
		to be more explicit, we need to show the following:
		<button on:click={showAll}>{showSet.size === 0 ? 'show all' : 'hide all'}</button>
	</p>
	<ol style="list-style: none">

		<li id="f1">
			<fieldset>
				<legend>{getCircleNum(1)}</legend>
				<Latex
					math={`\\langle e^{j \\tfrac{2\\pi}{T} k_i t } , e^{j \\tfrac{2\\pi}{T} k_j t } \\rangle = 0

					`}
				/>
				<button on:click={() => toggleShow(1)}>{showSet.has(1) ? 'hide' : 'show'}</button>
			</fieldset>
		</li>
		{#if showSet.has(1)}
			<HiddenBlock>

				<Latex center math={`
			\\langle e^{j \\tfrac{2\\pi}{T} k_i t } , e^{j \\tfrac{2\\pi}{T} k_j t } \\rangle 
				= \\int_{T} e^{j \\tfrac{2\\pi}{T} k_i t } \\cdot e^{-j \\tfrac{2\\pi}{T} k_j t } \\, dt 
				=  \\int_{T} e^{j \\tfrac{2\\pi}{T} (k_i-k_j) t }  \\, dt 
				`} />
				<Latex center math={`
				= \\frac{1}{ j\\tfrac{2\\pi}{T} (k_i-k_j)} \\bigl[  e^{j \\tfrac{2\\pi}{T} (k_i-k_j) t }  \\bigr]_0^T
				= \\frac{1}{ j\\tfrac{2\\pi}{T} (k_i-k_j)} \\bigl[  e^{j 2\\pi (k_i-k_j) }-  e^{j \\tfrac{2\\pi}{T} (k_i-k_j) 0 }  \\bigr]
						`} />
				<Latex center math={`
					= \\frac{1}{ j\\tfrac{2\\pi}{T} (k_i-k_j)} \\bigl[  1-  e^{0 }  \\bigr]
					= \\frac{1}{ j\\tfrac{2\\pi}{T} (k_i-k_j)} \\bigl[  1- 1  \\bigr] = 0
							`} />

			</HiddenBlock>
		{/if}
			<br />

		<li id="f2">
			<fieldset>
				<legend>{getCircleNum(2)}</legend>
				<Latex
					math={`\\langle e^{j \\tfrac{2\\pi}{T} k_i t } , e^{j \\tfrac{2\\pi}{T} k_i t } \\rangle = T

					`}
				/>
				<button on:click={() => toggleShow(2)}>{showSet.has(2) ? 'hide' : 'show'}</button>
			</fieldset>
		</li>
		{#if showSet.has(2)}
			<HiddenBlock>

				<Latex center math={`
			\\langle e^{j \\tfrac{2\\pi}{T} k_i t } , e^{j \\tfrac{2\\pi}{T} k_i t } \\rangle 
				= \\int_{T} e^{j \\tfrac{2\\pi}{T} k_i t } \\cdot e^{-j \\tfrac{2\\pi}{T} k_i t } \\, dt 
				= \\int_{T} e^{0} \\, dt
				= \\int_{T} 1 \\, dt = T
				
				`} />


			</HiddenBlock>
		{/if}
		<br />

	</ol>
	</li>
	<hr/>
	<li>
		<b>Can span any periodic function with period <Latex math={'T'} />:</b>
		<p>
			Given a periodic function <Latex math={'f(t)'} /> with period <Latex math={'T'}/> , how do we find all the <Latex
				math={'c_k \\in \\mathbb{R}'} /> such that:
		</p>
		<Latex
			center
			math={'f(t)= \\sum_{k= -\\infty}^{\\infty} c_k e^{j \\tfrac{2\\pi}{T} k t } '}
		/>

		<p>Let's solve for a particular <Latex math={`c_{k_i}`} />:</p>

<Latex center math={`
\\mathbf{ \\langle f(t) ,  e^{j \\tfrac{2\\pi}{T} k_i t  } \\rangle } 
	 = \\langle \\sum_{k=-\\infty}^{k=\\infty} c_k e^{j \\tfrac{2\\pi}{T} k t} ,  e^{j \\tfrac{2\\pi}{T} k_i t  } \\rangle 


	 = \\sum_{k=-\\infty}^{k=\\infty} \\langle  c_k e^{j \\tfrac{2\\pi}{T} k t} ,  e^{j \\tfrac{2\\pi}{T} k_i t  }  \\rangle
	`}/>

<p style="text-align:center">
<Latex  math={`
	= \\langle  c_{k_i} e^{j \\tfrac{2\\pi}{T} k_i t} ,  e^{j \\tfrac{2\\pi}{T} k_i t  }  \\rangle
 `}/> ( by using {getCircleNum(1)} )
</p>
<p style="text-align:center">
	<Latex  math={`
		= c_{k_i} \\cdot T = T c_{k_i}
	 `}/> ( by using {getCircleNum(2)} )
	</p>


	<Latex center math={`
		\\Rightarrow \\mathbf{ \\langle f(t) ,  e^{j \\tfrac{2\\pi}{T} k_i t  } \\rangle } =  T c_{k_i}
	`}/>


<Latex center math={`
	\\rightarrow  c_{k_i} = \\tfrac{1}{T} \\mathbf{ \\langle f(t) ,  e^{j \\tfrac{2\\pi}{T} k_i t  } \\rangle } 
	= \\tfrac{1}{T} \\int_{T} f(t) e^{-j \\tfrac{2\\pi}{T} k_i t } \\, dt
`}/>

<p>That's it! we can explicitly solve for every <Latex math={'c_k'} /></p>
	</li>

</ol>
<hr />

<b>Why <Latex math={'k'}/> goes from <Latex math={'-\\infty'}/> to  <Latex math={'\\infty'}/> instead from <Latex math={'0'}/> to  <Latex math={'\\infty'}/>?</b>
<p><strong>Ans:</strong> since <Latex math={'e^{jx}'}/> contains a <Latex math={'cos'}/> and <Latex math={'sin'}/>, you will need both  <Latex math={'c_k'}/> and  <Latex math={'c_{-k}'}/> 
to get an equivalent  <Latex math={'a_k'}/> or  <Latex math={'b_k'}/>       </p>
<hr />
<p>Let me illustrate this is with two examples:</p>
<b>Example 1:</b>
<p>Say we have a function <Latex math={`f(t)=cos(2\\pi 4 t)`}/> that has period <Latex math={'T=1'} /></p>

<p>Let's do Fourier decomposition with <Latex math={'sin/cos'}/> basis and <Latex math={'  e^{j \\tfrac{2\\pi}{T} k t  }'}/> basis :</p>
<ol>
	<li>
		<b>Using <Latex math={'sin/cos'}/> basis:</b>
		<p>After decomposition, the only non-zero term is <Latex math={'a_4=1'}/>:</p>
		<Latex
		center
		math={'f(t)= a_0 + \\sum_{k=1}^{\\infty} {a_k  cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=1}^{\\infty} { b_k  sin(\\tfrac{2 \\pi }{T}kt)} = a_4 cos(\\tfrac{2 \\pi }{T}4t) = cos(2\\pi4t) '}
	/>
	</li>
	<li>
		<b>Using <Latex math={' e^{j \\tfrac{2\\pi}{T} k t  }'}/> basis:</b>
		<p>After decomposition, the only non-zero term are <Latex math={'c_4=\\tfrac{1}{2}'}/> and <Latex math={'c_{-4}=-\\tfrac{1}{2}'}/>:</p>
		<Latex
		center
		math={`f(t)= \\sum_{k= -\\infty}^{\\infty} c_k e^{j \\tfrac{2\\pi}{T} k t } 
		= c_4  \\cdot e^{j \\tfrac{2\\pi}{T} 4 t } +  c_{-4}\\cdot  e^{j \\tfrac{2\\pi}{T} (-4) t } 
		= \\tfrac{1}{2} e^{j 2\\pi 4 t } - \\tfrac{1}{2} e^{-j 2\\pi4 t }
		`}
		
	/>
	<p  style="text-align: center;">which if do the calculation, you will get:</p>
	<Latex
	center
	math={`f(t)=\\tfrac{1}{2} e^{j 2\\pi 4 t } - \\tfrac{1}{2} e^{-j 2\\pi4 t } = cos(2\\pi4t)
	`}
	/>

	</li>
</ol>
<b>Example 2:</b>
<p>Say we have a function <Latex math={`f(t)=sin(2\\pi 4 t)`}/> that has period <Latex math={'T=1'} /></p>

<p>Let's do Fourier decomposition with <Latex math={'sin/cos'}/> basis and <Latex math={'  e^{j \\tfrac{2\\pi}{T} k t  }'}/> basis :</p>
<ol>
	<li>
		<b>Using <Latex math={'sin/cos'}/> basis:</b>
		<p>After decomposition, the only non-zero term is <Latex math={'b_4=1'}/>:</p>
		<Latex
		center
		math={'f(t)= a_0 + \\sum_{k=1}^{\\infty} {a_k  cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=1}^{\\infty} { b_k  sin(\\tfrac{2 \\pi }{T}kt)} = b_4 sin(\\tfrac{2 \\pi }{T}4t) = sin(2\\pi4t) '}
	/>
	</li>
	<li>
		<b>Using <Latex math={' e^{j \\tfrac{2\\pi}{T} k t  }'}/> basis:</b>
		<p>After decomposition, the only non-zero term are <Latex math={'c_4=\\tfrac{1}{2j}'}/> and <Latex math={'c_{-4}=-\\tfrac{1}{2j}'}/>:</p>
		<Latex
		center
		math={`f(t)= \\sum_{k= -\\infty}^{\\infty} c_k e^{j \\tfrac{2\\pi}{T} k t } 
		= c_4  \\cdot e^{j \\tfrac{2\\pi}{T} 4 t } +  c_{-4}\\cdot  e^{j \\tfrac{2\\pi}{T} (-4) t } 
		= \\tfrac{1}{2j} e^{j 2\\pi 4 t } - \\tfrac{1}{2j} e^{-j 2\\pi4 t }
		`}
		
	/>
	<p  style="text-align: center;">which if do the calculation, you will get:</p>
	<Latex
	center
	math={`f(t)=\\tfrac{1}{2j} e^{j 2\\pi 4 t } - \\tfrac{1}{2j} e^{-j 2\\pi4 t } = sin(2\\pi4t)
	`}
	/>

	</li>
</ol>

<p>Basically, from the example, to get coefficient for  <Latex math={'f(t)=sin(2\\pi 4t)'}/> with exponential basis,
you need two terms:  </p>
<Latex center math={'c_4 \\; (\\text{ with } e^{j\\tfrac{2\\pi}{T} 4t} =  cos(2\\pi 4t) + j sin(2\\pi 4t) \\; )'}/> 

<Latex center math={'c_{-4} \\; (\\text{ with }  e^{-j\\tfrac{2\\pi}{T} 4t} = cos(2\\pi 4t) - j sin(2\\pi 4t) \\; )'}/> 

<p style="text-align: center;">for canceling out the  <Latex math={' cos(2\\pi 4t)'}/> terms so can return the desired <Latex math={'sin(2\\pi 4t)'}/> </p>