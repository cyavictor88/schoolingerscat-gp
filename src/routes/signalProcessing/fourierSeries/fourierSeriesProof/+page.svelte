<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';
	import HiddenBlock from './HiddenBlock.svelte';

	const innerPageRoute = getContext<Writable<IRoute | null>>('innerPageRoute');
  let showSet: Set<number> = new Set<number>(); 
  const toggleShow = (idx:number) => {
    const newSet = new Set<number>(showSet);
    if(showSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    showSet = newSet;
  }

  const showAll = ()=>{
    let newSet = new Set<number>();
    if(showSet.size === 0) for (let index = 0; index < 2; index++) newSet.add(index);
    showSet = newSet;
  }
	onMount(() => {
		(async () => {
			innerPageRoute.set(null);
		})();
	});
</script>

<Title hLevel={1}>Fourier Series - Proof</Title>
<p>
	Fourier Series for me is basically applying function decomposition to a function of <Latex
		math={'t'}
	/> with period
	<Latex math={'T'} /> using the following the basis:
</p>
<Latex
	center={true}
	math={`
\\{ \\; cos( \\frac{2\\pi}{T} kt ) \\; , \\; sin( \\frac{2\\pi}{T} kt ) \\; \\}  , \\ \\; k \\in [ -\\infty, \\infty] 
`}
/>

<p>
	First we prove the above set of <Latex math={'sin'} /> and <Latex math={'cos'} /> is indeed a orthogonal
	basis:
</p>
<ol  style="list-style-type: upper-roman;">
	<li>
		Orthogonality:
		<p>
			we need to show that for any function <Latex
				math={'g_i(t) \\in \\{ \\; cos( \\frac{2\\pi}{T} kt ) \\; , \\; sin( \\frac{2\\pi}{T} kt ) \\; \\} '}
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
      <p>to be more explicit, we need to show the following: 
        <button on:click={showAll}>{showSet.size === 0? 'show all': 'hide all'}</button>
      </p>
      <ol>
        <li>
          <Latex math={'\\langle  cos( \\frac{2\\pi}{T} kt ) ,  cos( \\frac{2\\pi}{T} kt ) \\rangle \\ne 0'} />
          <button on:click={()=>toggleShow(0)}>{showSet.has(0)? 'hide': 'show'}</button>
        </li>
        {#if showSet.has(0)}
          <HiddenBlock>
            sup
          </HiddenBlock>
        {/if}
        <br />
        <li>
          <Latex math={'\\langle  sin( \\frac{2\\pi}{T} kt ) ,  sin( \\frac{2\\pi}{T} kt ) \\rangle\\ne 0'} />
          <button on:click={()=>toggleShow(1)}>{showSet.has(0)? 'hide': 'show'}</button>
        </li>
        {#if (showSet.has(1))}
          <HiddenBlock>
            sup2
          </HiddenBlock>
        {/if}
        <br />
        <li><Latex math={'\\langle  cos( \\frac{2\\pi}{T} kt ) ,  sin( \\frac{2\\pi}{T} kt ) \\rangle = 0'} /></li>
        <br/>
        <li><Latex math={'\\langle  cos( \\frac{2\\pi}{T} k_1t ) ,  sin( \\frac{2\\pi}{T} k_2t ) \\rangle = 0'} /></li>
        <br/>
        <li><Latex math={'\\langle  cos( \\frac{2\\pi}{T} k_1t ) ,  sin( \\frac{2\\pi}{T} k_2t ) \\rangle = 0'} /></li>
        <br/>
        <li><Latex math={'\\langle  cos( \\frac{2\\pi}{T} k_1t ) ,  cos( \\frac{2\\pi}{T} k_2t ) \\rangle = 0'} /></li>
        <br/>
        <li><Latex math={'\\langle  sin( \\frac{2\\pi}{T} k_1t ) ,  sin( \\frac{2\\pi}{T} k_2t ) \\rangle = 0'} /></li>
      </ol>



	</li>
</ol>


