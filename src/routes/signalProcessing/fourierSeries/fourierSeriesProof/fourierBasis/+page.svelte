<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';

	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';
	import HiddenBlock from './HiddenBlock.svelte';
	import { SITE_COLOR } from '$lib/theme/colors';
	import { getCircleNum } from '$lib/unicode';
	import ShowOnHover from './ShowOnHover.svelte';

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
	onMount(() => {
		// showAll();
	});
</script>

<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>Fourier Basis:</Title>
<p>
	Fourier Series for me is basically applying function decomposition to a periodic function <Latex
		math={'f(t)'}
	/> that has period
	<Latex math={'T'} /> using the following the basis:
</p>
<Latex
	center={true}
	math={`
\\{ \\; cos( \\tfrac{2\\pi}{T} kt ) \\; , \\; sin( \\tfrac{2\\pi}{T} kt ) \\; \\}  , \\ \\; k \\in \\mathbb{Z}^+
`}
/>

<p>
	To prove such basis exists, first we show the above set of <Latex math={'sin'} /> and <Latex
		math={'cos'}
	/> is indeed a orthogonal basis:
</p>
<ol style="list-style-type: upper-roman;">
	<li>
		<hr />

		<b>Orthogonality:</b>
		<p>
			we need to show that for any basis function <Latex
				math={'g_i(t) \\in \\{ \\; cos( \\tfrac{2\\pi}{T} k_it ) \\; , \\; sin( \\tfrac{2\\pi}{T} k_it ) \\; \\} '}
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
						math={`\\langle  cos( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_i t ) \\rangle = 
						\\left\\{
        			\\begin{array}{ll}
								\\tfrac{1}{2}T  & \\mathrm{,if} \\; k_i > 0 \\\\
									T  & \\mathrm{,if} \\; k_i=0
        				\\end{array}
    				\\right.
						`}
					/>
					<button on:click={() => toggleShow(1)}>{showSet.has(1) ? 'hide' : 'show'}</button>
				</fieldset>
			</li>
			{#if showSet.has(1)}
				<HiddenBlock>
					 <Latex  math={'\\text{For } k_i > 0:'} />
					<Latex
						center
						math={'\\langle  cos( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_i t ) \\rangle = \\int_{0}^{T} cos(\\tfrac{2\\pi}{T}k_i t)cos(\\tfrac{2\\pi}{T}k_i t) \\,dt'}
					/>
					<Latex
						center
						math={'= \\int_{0}^{T} cos^2(\\tfrac{2\\pi}{T}k_i t) \\,dt = \\int_{0}^{T} cos^2(\\theta) \\,dt \\text{, where } \\theta =  \\tfrac{2\\pi}{T}k_i t'}
					/>
					<p style="text-align: center;">
						( by using <Latex
							math={'cos(2\\theta) = 2cos^2(\\theta)-1 \\Rightarrow  cos^2(\\theta) =  \\tfrac{1}{2}+ \\tfrac{cos(2\\theta)}{2} '}
						/>)
					</p>
					<Latex
						center
						math={'=\\int_{0}^{T} \\tfrac{1}{2} + \\tfrac{cos(2\\theta)}{2} \\,dt = \\int_{0}^{T} \\tfrac{1}{2} + \\tfrac{cos(2\\tfrac{2\\pi}{T}k_i t)}{2} \\,dt'}
					/>
					<Latex
						center
						math={'= \\tfrac{1}{2}t\\bigr]_0^T + \\tfrac{1}{2} \\bigl[ sin(2\\tfrac{2\\pi}{T}k_i t) \\cdot\\tfrac{T}{2 \\cdot 2\\pi k_i} \\bigr]_0^T '}
					/>
					<Latex center math={'= \\tfrac{1}{2}t\\bigr]_0^T = \\tfrac{1}{2}T'} />

					<Latex  math={'\\text{For } k_i = 0:'} />
					<Latex
						center
						math={'\\langle  cos( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_i t ) \\rangle = \\int_{0}^{T} cos(0)cos(0) \\,dt = T'}
					/>
				</HiddenBlock>
			{/if}
			<br />
			<li id="f2">
				<fieldset>
					<legend>{getCircleNum(2)}</legend>
					<Latex
						math={`\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  sin( \\tfrac{2\\pi}{T} k_i t ) \\rangle =
						\\left\\{
        			\\begin{array}{ll}
								\\tfrac{1}{2}T  & \\mathrm{,if} \\; k_i > 0 \\\\
									0  & \\mathrm{,if} \\; k_i=0
        				\\end{array}
    				\\right.
						`}
					/>
					<button on:click={() => toggleShow(2)}>{showSet.has(2) ? 'hide' : 'show'}</button>
				</fieldset>
			</li>
			{#if showSet.has(2)}
				<HiddenBlock>
					<Latex  math={'\\text{For } k_i > 0:'} />

					<Latex
						center
						math={'\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  sin( \\tfrac{2\\pi}{T} k_i t ) \\rangle = \\int_{0}^{T} sin(\\tfrac{2\\pi}{T}k_i t)sin(\\tfrac{2\\pi}{T}k_i t) \\,dt'}
					/>
					<Latex
						center
						math={'= \\int_{0}^{T} sin^2(\\tfrac{2\\pi}{T}k_i t) \\,dt = \\int_{0}^{T} sin^2(\\theta) \\,dt \\text{, where } \\theta =  \\tfrac{2\\pi}{T}k_i t'}
					/>
					<p style="text-align: center;">
						( by using <Latex
							math={'sin^2(\\theta) =  \\tfrac{1}{2} - \\tfrac{cos(2\\theta)}{2} '}
						/>)
					</p>
					<Latex
						center
						math={'= \\int_{0}^{T} \\tfrac{1}{2} - \\tfrac{cos(2\\theta)}{2} \\,dt =\\int_{0}^{T} \\tfrac{1}{2} - \\tfrac{cos(2\\tfrac{2\\pi}{T}k_i t)}{2} \\,dt'}
					/>
					<Latex
						center
						math={'= \\tfrac{1}{2}t\\bigr]_0^T - \\tfrac{1}{2} \\bigl[ sin(2\\tfrac{2\\pi}{T}k_i t) \\cdot\\tfrac{T}{2 \\cdot 2\\pi k_i} \\bigr]_0^T '}
					/>
					<Latex center math={'= \\tfrac{1}{2}t\\bigr]_0^T = \\tfrac{1}{2}T'} />
					<Latex  math={'\\text{For } k_i = 0:'} />
					<Latex
						center
						math={'\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  sin( \\tfrac{2\\pi}{T} k_i t ) \\rangle = \\int_{0}^{T} sin(0)sin(0) \\,dt = 0'}
					/>
				</HiddenBlock>
			{/if}
			<br />
			<li id="f3">
				<fieldset>
					<legend>{getCircleNum(3)}</legend>
					<Latex
						math={'\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_i t ) \\rangle = 0'}
					/>
					<button on:click={() => toggleShow(3)}>{showSet.has(3) ? 'hide' : 'show'}</button>
				</fieldset>
			</li>
			{#if showSet.has(3)}
				<HiddenBlock>
					<Latex
						center
						math={'\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_i t ) \\rangle = \\int_{0}^{T} sin(\\tfrac{2\\pi}{T}k_i t)cos(\\tfrac{2\\pi}{T}k_i t) \\,dt'}
					/>
					<Latex
						center
						math={' = \\int_{0}^{T} sin(\\theta)cos(\\theta) \\,dt\\text{, where } \\theta =  \\tfrac{2\\pi}{T}k_i t'}
					/>
					<p style="text-align: center;">
						( by using <Latex math={'sin(2\\theta) = 2sin(\\theta)cos(\\theta)  '} />)
					</p>
					<Latex
						center
						math={'= \\int_{0}^{T}  \\tfrac{1}{2} sin(2\\theta) \\,dt =\\int_{0}^{T}  \\tfrac{1}{2} sin(2\\tfrac{2\\pi}{T}k_i t) \\,dt'}
					/>
					<Latex
						center
						math={'=  - \\tfrac{1}{2} \\bigl[ cos(2\\tfrac{2\\pi}{T}k_i t) \\cdot\\tfrac{T}{2 \\cdot 2\\pi k_i} \\bigr]_0^T  = 0'}
					/>
				</HiddenBlock>
			{/if}
			<br />
			<li id="f4">
				<fieldset>
					<legend>{getCircleNum(4)}</legend>
					<Latex
						math={'\\langle  cos( \\tfrac{2\\pi}{T} k_it ) ,  cos( \\tfrac{2\\pi}{T} k_jt ) \\rangle = 0'}
					/>
					<button on:click={() => toggleShow(4)}>{showSet.has(4) ? 'hide' : 'show'}</button>
				</fieldset>
			</li>
			{#if showSet.has(4)}
				<HiddenBlock>
					<Latex
						center
						math={'\\langle  cos( \\tfrac{2\\pi}{T} k_it ) ,  cos( \\tfrac{2\\pi}{T} k_jt ) \\rangle = \\int_{0}^{T} cos(\\tfrac{2\\pi}{T}k_it)cos(\\tfrac{2\\pi}{T}k_jt) \\,dt'}
					/>
					<Latex
						center
						math={' = \\int_{0}^{T} cos(\\alpha)cos(\\beta) \\,dt\\text{, where } \\alpha =  \\tfrac{2\\pi}{T}k_it \\text{  and  } \\beta = \\tfrac{2\\pi}{T}k_jt '}
					/>
					<p style="text-align: center;">
						( by using <Latex
							math={'cos(\\alpha)cos(\\beta) = \\tfrac{cos(\\alpha+\\beta)}{2} + \\tfrac{cos(\\alpha-\\beta)}{2} '}
						/>)
					</p>
					<Latex
						center
						math={`= \\tfrac{1}{2} \\int_{0}^{T}  cos(\\alpha+\\beta)+cos(\\alpha-\\beta) \\,dt =
						 \\tfrac{1}{2} \\int_{0}^{T}  
						cos( \\tfrac{(k_i+k_j)2\\pi t}{T}) +cos( \\tfrac{(k_i-k_j)2\\pi t}{T}) \\,dt`}
					/>
					<Latex
						center
						math={`=  \\tfrac{1}{2} \\bigl[ 
							sin(\\tfrac{(k_i+k_j)2\\pi t}{T}) \\cdot \\tfrac{T}{(k_i+k_j)2\\pi }  + 
							sin(\\tfrac{(k_i-k_j)2\\pi t}{T}) \\cdot \\tfrac{T}{(k_i-k_j)2\\pi }  
							
							\\bigr]_0^T  = 0`}
					/>
				</HiddenBlock>
			{/if}
			<br />
			<li id="f5">
				<fieldset>
					<legend>{getCircleNum(5)}</legend>
					<Latex
						math={'\\langle  sin( \\tfrac{2\\pi}{T} k_it ) ,  sin( \\tfrac{2\\pi}{T} k_jt ) \\rangle = 0'}
					/>
					<button on:click={() => toggleShow(5)}>{showSet.has(5) ? 'hide' : 'show'}</button>
				</fieldset>
			</li>
			{#if showSet.has(5)}
				<HiddenBlock>
					<Latex
						center
						math={'\\langle  sin( \\tfrac{2\\pi}{T} k_it ) ,  sin( \\tfrac{2\\pi}{T} k_jt ) \\rangle = \\int_{0}^{T} sin(\\tfrac{2\\pi}{T}k_it)sin(\\tfrac{2\\pi}{T}k_jt) \\,dt'}
					/>
					<Latex
						center
						math={' = \\int_{0}^{T} sin(\\alpha)sin(\\beta) \\,dt\\text{, where } \\alpha =  \\tfrac{2\\pi}{T}k_it \\text{  and  } \\beta = \\tfrac{2\\pi}{T}k_jt '}
					/>
					<p style="text-align: center;">
						( by using <Latex
							math={'sin(\\alpha)sin(\\beta) = \\tfrac{cos(\\alpha-\\beta)}{2} - \\tfrac{cos(\\alpha+\\beta)}{2} '}
						/>)
					</p>
					<Latex
						center
						math={`= \\tfrac{1}{2} \\int_{0}^{T}  cos(\\alpha-\\beta)-cos(\\alpha+\\beta) \\,dt =
						 \\tfrac{1}{2} \\int_{0}^{T}  
						cos( \\tfrac{(k_i-k_j)2\\pi t}{T}) -cos( \\tfrac{(k_i+k_j)2\\pi t}{T}) \\,dt`}
					/>
					<Latex
						center
						math={`=  \\tfrac{1}{2} \\bigl[ 
							sin(\\tfrac{(k_i-k_j)2\\pi t}{T}) \\cdot \\tfrac{T}{(k_i-k_j)2\\pi }  
							-sin(\\tfrac{(k_i+k_j)2\\pi t}{T}) \\cdot \\tfrac{T}{(k_i+k_j)2\\pi }  
							
							\\bigr]_0^T  = 0`}
					/>
				</HiddenBlock>
			{/if}
			<br />
			<li id="f6">
				<fieldset>
					<legend>{getCircleNum(6)}</legend>
					<Latex
						math={'\\langle  sin( \\tfrac{2\\pi}{T} k_it ) ,  cos( \\tfrac{2\\pi}{T} k_jt ) \\rangle = 0'}
					/>
					<button on:click={() => toggleShow(6)}>{showSet.has(6) ? 'hide' : 'show'}</button>
				</fieldset>
			</li>
			{#if showSet.has(6)}
				<HiddenBlock>
					<Latex
						center
						math={'\\langle  sin( \\tfrac{2\\pi}{T} k_it ) ,  cos( \\tfrac{2\\pi}{T} k_jt ) \\rangle = \\int_{0}^{T} sin(\\tfrac{2\\pi}{T}k_it)cos(\\tfrac{2\\pi}{T}k_jt) \\,dt'}
					/>
					<Latex
						center
						math={' = \\int_{0}^{T} sin(\\alpha)cos(\\beta) \\,dt\\text{, where } \\alpha =  \\tfrac{2\\pi}{T}k_it \\text{  and  } \\beta = \\tfrac{2\\pi}{T}k_jt '}
					/>
					<p style="text-align: center;">
						( by using <Latex
							math={'sin(\\alpha)cos(\\beta) = \\tfrac{sin(\\alpha+\\beta)}{2} + \\tfrac{sin(\\alpha-\\beta)}{2} '}
						/>)
					</p>
					<Latex
						center
						math={`= \\tfrac{1}{2} \\int_{0}^{T}  sin(\\alpha+\\beta)+sin(\\alpha-\\beta) \\,dt =
						 \\tfrac{1}{2} \\int_{0}^{T}  
						sin( \\tfrac{(k_i+k_j)2\\pi t}{T}) +sin( \\tfrac{(k_i-k_j)2\\pi t}{T}) \\,dt`}
					/>
					<Latex
						center
						math={`=  \\tfrac{1}{2} \\bigl[ 
							-cos(\\tfrac{(k_i+k_j)2\\pi t}{T}) \\cdot \\tfrac{T}{(k_i+k_j)2\\pi }  
							-cos(\\tfrac{(k_i-k_j)2\\pi t}{T}) \\cdot \\tfrac{T}{(k_i-k_j)2\\pi }  
							
							\\bigr]_0^T  = 0`}
					/>
				</HiddenBlock>
			{/if}
		</ol>
		<br />
	</li>

	<li>
		<hr />
		<b>Show how this basis can decompose any periodic function with period <Latex math={'T'} />:</b>
		<p>
			In other words, given a periodic function <Latex math={'f(t)'} />, how do we find all the <Latex
				math={'a_k'}
			/> and <Latex math={'b_k'} /> such that:
		</p>
		<Latex
			center
			math={'f(t)= \\sum_{k=0}^{\\infty} {\\color{blue} a_k  \\color{black} cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=0}^{\\infty} { \\color{green} b_k  \\color{black} sin(\\tfrac{2 \\pi }{T}kt)} '}
		/>

		<p>First let's solve for a particular <Latex math={` \\color{blue} a_{k_i}`} />:</p>

		<Latex
			center
			math={`\\langle f(t),  \\color{blue} cos(\\tfrac{2 \\pi }{T}k_i t)  \\color{black} \\rangle = \\langle  \\sum_{k=0}^{\\infty} {a_k cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=0}^{\\infty} {b_k sin(\\tfrac{2 \\pi }{T}kt)} ,\\color{blue} cos(\\tfrac{2 \\pi }{T}k_i t) \\color{black}\\rangle`}
		/>
		<Latex
			center
			math={`= \\sum_{k=0}^{\\infty}  \\langle  a_k cos(\\tfrac{2 \\pi }{T}kt),\\color{blue} cos(\\tfrac{2 \\pi }{T}k_i t)\\color{black} \\rangle 
		+  \\sum_{k=0}^{\\infty} \\langle  b_k sin(\\tfrac{2 \\pi }{T}kt),\\color{blue}cos(\\tfrac{2 \\pi}{T} k_i  t)\\color{black} \\rangle`}
		/>

		<p style="text-align:center">
			(with
			<a href="#f3"
				><ShowOnHover>
					<span slot="label"> {getCircleNum(3)} </span>
					<Latex
						slot="tooltip"
						math={`\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_i t ) \\rangle = 0`}
					/>
				</ShowOnHover>
			</a>
			and
			<a href="#f6"
				><ShowOnHover>
					<span slot="label"> {getCircleNum(6)}</span>
					<Latex
						slot="tooltip"
						math={`\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_j t ) \\rangle = 0`}
					/>
				</ShowOnHover></a
			>, all the <Latex math={'sin'} /> terms become 0s)
		</p>

		<Latex
			center
			math={`= \\sum_{k=0}^{\\infty}  \\langle  a_k cos(\\tfrac{2 \\pi }{T}kt),\\color{blue} cos(\\tfrac{2 \\pi }{T}k_i t)\\color{black} \\rangle 
		+  \\overset{0}{\\cancel{ \\sum_{k=0}^{\\infty} \\langle  b_k sin(\\tfrac{2 \\pi }{T}kt),\\color{blue}cos(\\tfrac{2 \\pi}{T} k_i  t)\\color{black} \\rangle}}`}
		/>

		<Latex
			center
			math={`=\\sum_{k=0}^{\\infty}  \\langle  a_k cos(\\tfrac{2 \\pi }{T}kt),\\color{blue} cos(\\tfrac{2 \\pi }{T}k_i t)\\color{black} \\rangle + 0`}
		/>

		<p style="text-align:center">
			(with
			<a href="#f4"
				><ShowOnHover>
					<span slot="label"> {getCircleNum(4)} </span>
					<Latex
						slot="tooltip"
						math={`\\langle  cos( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_j t ) \\rangle = 0`}
					/>
				</ShowOnHover>
			</a>
			all the <Latex math={'cos'} /> terms with <Latex math={'k \\neq k_i '} /> become 0s , and for <Latex
				math={'k = k_i'}
			/> we use
			<a href="#f1"
				><ShowOnHover>
					<span slot="label"> {getCircleNum(1)} </span>
					<Latex
						slot="tooltip"
						math={`\\langle  cos( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_i t )  \\rangle 
											=	\\left\\{
        			\\begin{array}{ll}
								\\tfrac{1}{2}T  & \\mathrm{,if} \\; k_i > 0 \\\\
									T  & \\mathrm{,if} \\; k_i=0
        				\\end{array}
    				\\right.`}
					/>
				</ShowOnHover>
				)
			</a>
		</p>

		<Latex
			center
			math={`= \\langle \\color{blue} a_{k_i}cos(\\tfrac{2 \\pi }{T}k_i t) , \\color{blue} cos(\\tfrac{2 \\pi }{T}k_i t)\\color{black} \\rangle = \\frac{1}{2}a_{k_i}T`}
		/>
		<Latex
			center
			math={`\\Rightarrow   \\frac{1}{2}a_{k_i}T = \\langle f(t),  \\color{blue} cos(\\tfrac{2 \\pi }{T}k_i t)  \\color{black} \\rangle `}
		/>
		<Latex
			center
			math={`\\boxed{\\color{blue} a_{k_i} \\color{black} =\\frac{2}{T} \\langle f(t),  \\color{blue} cos(\\tfrac{2 \\pi }{T}k_i t)  \\color{black} \\rangle}`}
		/>

		<p>Next let's solve for a particular <Latex math={` \\color{green} b_{k_i}`} />:</p>

		<Latex
			center
			math={`\\langle f(t),  \\color{green} sin(\\tfrac{2 \\pi }{T}k_i t)  \\color{black} \\rangle= \\langle  \\sum_{k=0}^{\\infty} {a_k cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=0}^{\\infty} {b_k sin(\\tfrac{2 \\pi }{T}kt)} ,\\color{green} sin(\\tfrac{2 \\pi }{T}k_i t) \\color{black}\\rangle`}
		/>
		<Latex
			center
			math={`= \\sum_{k=0}^{\\infty}  \\langle  a_k cos(\\tfrac{2 \\pi }{T}kt),\\color{green} sin(\\tfrac{2 \\pi }{T}k_i t)\\color{black} \\rangle 
		+  \\sum_{k=0}^{\\infty} \\langle  b_k sin(\\tfrac{2 \\pi }{T}kt),\\color{green} sin(\\tfrac{2 \\pi}{T} k_i  t)\\color{black} \\rangle`}
		/>

		<p style="text-align:center">
			(with
			<a href="#f3"
				><ShowOnHover>
					<span slot="label"> {getCircleNum(3)} </span>
					<Latex
						slot="tooltip"
						math={`\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_i t ) \\rangle = 0`}
					/>
				</ShowOnHover>
			</a>
			and
			<a href="#f6"
				><ShowOnHover>
					<span slot="label"> {getCircleNum(6)}</span>
					<Latex
						slot="tooltip"
						math={`\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  cos( \\tfrac{2\\pi}{T} k_j t ) \\rangle = 0`}
					/>
				</ShowOnHover></a
			>, all the <Latex math={'cos'} /> terms become 0s)
		</p>

		<Latex
			center
			math={`= \\overset{0}{ \\cancel{ \\sum_{k=0}^{\\infty}  \\langle  a_k cos(\\tfrac{2 \\pi }{T}kt),\\color{green} sin(\\tfrac{2 \\pi }{T}k_i t)\\color{black} \\rangle }}
		+  \\sum_{k=0}^{\\infty} \\langle  b_k sin(\\tfrac{2 \\pi }{T}kt),\\color{green} sin(\\tfrac{2 \\pi}{T} k_i  t)\\color{black} \\rangle`}
		/>

		<Latex
			center
			math={`=\\sum_{k=0}^{\\infty}  \\langle  b_k sin(\\tfrac{2 \\pi }{T}kt),\\color{green} sin(\\tfrac{2 \\pi }{T}k_i t)\\color{black} \\rangle + 0`}
		/>

		<p style="text-align:center">
			(with
			<a href="#f5"
				><ShowOnHover>
					<span slot="label"> {getCircleNum(5)} </span>
					<Latex
						slot="tooltip"
						math={`\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  sin( \\tfrac{2\\pi}{T} k_j t ) \\rangle = 0`}
					/>
				</ShowOnHover>
			</a>
			all the <Latex math={'sin'} /> terms with <Latex math={'k \\neq k_i '} /> become 0s , and for <Latex
				math={'k = k_i'}
			/> we use
			<a href="#f2"
				><ShowOnHover>
					<span slot="label"> {getCircleNum(2)} </span>
					<Latex
						slot="tooltip"
						math={`\\langle  sin( \\tfrac{2\\pi}{T} k_i t ) ,  sin( \\tfrac{2\\pi}{T} k_i t ) \\rangle = 
												\\left\\{
        			\\begin{array}{ll}
								\\tfrac{1}{2}T  & \\mathrm{,if} \\; k_i > 0 \\\\
									0  & \\mathrm{,if} \\; k_i=0
        				\\end{array}
    				\\right.`}
					/>
				</ShowOnHover>
				)
			</a>
		</p>

		<Latex
			center
			math={`= \\langle\\color{green} b_{k_i}sin(\\tfrac{2 \\pi }{T}k_i t) , sin(\\tfrac{2 \\pi }{T}k_i t) \\color{black} \\rangle =
			
			\\left\\{
        			\\begin{array}{ll}
							\\frac{1}{2}b_{k_i}T  & \\mathrm{,if} \\; k_i > 0 \\\\
									0  & \\mathrm{,if} \\; k_i=0
        				\\end{array}
    				\\right.
			
		`}
		/>
		<Latex
			center
			math={`\\Rightarrow   \\frac{1}{2}b_{k_i}T = \\langle f(t),  \\color{green} sin(\\tfrac{2 \\pi }{T}k_i t)  \\color{black} \\rangle `}
		/>
		<Latex
			center
			math={`\\boxed{ \\color{green} b_{k_i} \\color{black} =\\frac{2}{T} \\langle f(t),  \\color{green} sin(\\tfrac{2 \\pi }{T}k_i t)  \\color{black} \\rangle}`}
		/>

		<p>
			Now we know how to solve for <Latex math={'\\color{blue}{a_k}'} /> and <Latex
				math={'\\color{green}{b_k}'}
			/>, we can put it together:
		</p>
		<Latex
			center
			math={'f(t)= \\sum_{k=0}^{\\infty} {\\color{blue} a_k  \\color{black} cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=0}^{\\infty} { \\color{green} b_k  \\color{black} sin(\\tfrac{2 \\pi }{T}kt)} '}
		/>
		<Latex
			center
			math={'\\boxed{f(t)= \\sum_{k=0}^{\\infty} {\\color{blue} \\frac{2}{T} \\langle f(t), cos(\\tfrac{2 \\pi }{T}kt) \\rangle   \\color{black} cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=0}^{\\infty} {  \\color{green}  \\frac{2}{T} \\langle f(t), sin(\\tfrac{2 \\pi }{T}kt)  \\color{black} \\rangle  \\color{black} sin(\\tfrac{2 \\pi }{T}kt)}} '}
		/>
		<p>
			That's it! so if we are given a periodic function <Latex math={'f(t)'} /> with period = <Latex
				math={'T'}
			/> , we can rewrite(decompose) <Latex math={'f(t)'} /> using the fourier basis into the above equation.
		</p>

		<p>
			In the next page, we will use the examples from <a
				href="/signalProcessing/fourierSeries/intro">Introduction</a
			> to show how Fourier Series work.
		</p>
	</li>
</ol>
