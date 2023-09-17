<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';
	import HiddenBlock from './HiddenBlock.svelte';

	const innerPageRoute = getContext<Writable<IRoute | null>>('innerPageRoute');
  let clickedIndex: Set<number> = new Set<number>(); 
  const click = (idx:number) => {
    const newMap = new Set<number>(clickedIndex);
    if(clickedIndex.has(idx))newMap.delete(idx)
    else newMap.add(idx);
    clickedIndex = newMap
  }

  const showAll = ()=>{
    let newMap = new Set<number>();
    if(clickedIndex.size === 0) {
      newMap.add(0);
      newMap.add(1);
    }
    clickedIndex = newMap;
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
<ol >
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

        <!-- svelte-ignore missing-declaration -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span on:click={showAll}>show all</span>


      </p>
      <ol style="list-style-type: upper-roman;">
        <!-- svelte-ignore missing-declaration -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <li><span on:click={()=>click(0)}><Latex math={'\\langle  cos( \\frac{2\\pi}{T} kt ) ,  cos( \\frac{2\\pi}{T} kt ) \\rangle \\ne 0'} /></span></li>
        {#if (clickedIndex.has(0))}
        <HiddenBlock>
          sup
        </HiddenBlock>

        {/if}
        <br />
                <!-- svelte-ignore missing-declaration -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <li><span on:click={()=>click(1)}><Latex math={'\\langle  sin( \\frac{2\\pi}{T} kt ) ,  sin( \\frac{2\\pi}{T} kt ) \\rangle\\ne 0'} /></span></li>
        {#if (clickedIndex.has(1))}
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



<style>

  span {
    text-decoration: underline;
    cursor: pointer;
    color: blue;
  }


</style>