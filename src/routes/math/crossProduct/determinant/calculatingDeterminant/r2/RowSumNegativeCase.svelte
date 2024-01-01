<script lang="ts">
	import Toggle from '../Toggle.svelte';
  import Latex from '$lib/components/Latex/Latex.svelte';
	import { RowOp } from './d3/interactive/InteractiveD3';
	import InteractiveD3 from './d3/interactive/InteractiveD3.svelte';
  import { RowSum } from './d3/RowSum';
	import { onMount } from 'svelte';
  import * as mj from 'mathjs';
  let figRowSumD3: HTMLDivElement;
	let d3FigRowSum: RowSum;
  onMount(()=>{
    const veca = [2, 3, -1];
		const vecb = [-3, -1, 3];
    const mult = -2;
		const rowop = mj.add(mj.multiply(mult, veca), vecb) as number[];

    d3FigRowSum = new RowSum(mult,
			{ x: veca[0], y: veca[1] },
			{ x: vecb[0], y: vecb[1] },
			{ x: rowop[0], y: rowop[1] }
		);
    figRowSumD3.append(d3FigRowSum.svgNode!);
  })
</script>
<p><b>Negative Multiple:</b></p>
    <p>This also is true when add negative multiple of a row to another row.</p>
    <p>For this example, we will use  <Latex math={`E=
      \\begin{bmatrix}
      1 & 0 \\\\
      0 & 1 \\\\
      \\end{bmatrix}_{r_2 \\rightarrow -2r_1 + r_2} = 
      \\begin{bmatrix}
      1 & 0 \\\\
      -2 & 1 \\\\
      \\end{bmatrix}`}/> 
    </p>
    <p>and see how it will affect area(determinant) of 
      <Latex math={`M = \\begin{bmatrix}
      \\color{red}\\vec{a} \\\\
      \\color{blue}\\vec{b} \\\\
      \\end{bmatrix} =
        \\begin{bmatrix}
        2 & 3 \\\\
        -3 & -1 \\\\
        \\end{bmatrix}`} />
    </p>
    <p>
      <Latex math={`EM =\\begin{bmatrix}
      \\color{red}\\vec{a} \\\\
      \\color{purple}\\vec{b'} \\\\
      \\end{bmatrix} =
        \\begin{bmatrix}
        2 & 3 \\\\
        -7 & -7 \\\\
        \\end{bmatrix}`} />

    </p>
   

      <p>
    And from the figure below, you can see that 
             <a
          href="#"
          on:click={() => {
            d3FigRowSum.eventBroker.emit('toggleShowOldArea');
          }}
          ><Latex math={`\\text{\\underline{Area of}}
          \\begin{bmatrix}
          \\color{red}\\vec{a} \\\\
      \\color{blue}\\vec{b} \\\\
        \\end{bmatrix}`}/>
        </a>
  
        and
        <a
          href="#"
          on:click={() => {
            d3FigRowSum.eventBroker.emit('toggleShowNewArea');
          }}
          ><Latex math={`\\text{\\underline{Area of}}
          \\begin{bmatrix}
          \\color{red}\\vec{a} \\\\
      \\color{purple}\\vec{b'} \\\\
        \\end{bmatrix}`}/>
        </a>
  
       share with same base <Latex math={'\\color{red}\\vec{a}'}/> and have same height , which implies that they have the same area : <br /><Latex math={`
       \\text{Area of}\\begin{bmatrix}
        \\color{red}\\vec{a} \\\\
      \\color{purple}\\vec{b'} \\\\
        \\end{bmatrix}
        =\\text{Area of}
          \\begin{bmatrix}
          \\color{red}\\vec{a} \\\\
      \\color{blue}\\vec{b} \\\\
        \\end{bmatrix}
       `} />.
      </p>

    <div style='display: flex; flex-flow: row wrap;'>
      <div bind:this={figRowSumD3} />
    </div>

    <hr />



    
