<script lang='ts'>
	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
	import { getCircleNum } from '$lib/unicode';
	import { onMount } from "svelte";
	import { drawFunc1 } from "./d3/drawFunc1";
  let fig1D3: HTMLDivElement;
  onMount(()=>{
    fig1D3.append(drawFunc1()!);
  });
</script>

<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Examples:
</Title>

<p>In the Introduction page, I showed 2 examples using:</p>
<p> a periodic function:  {getCircleNum(1)} <Latex math={'\\color{green} y(t)=12cos(2t)sin(t)+16'}/> </p>
 <p>  and a non-periodic function:  {getCircleNum(2)} <Latex math={'\\color{red} y(t) = t^3 -12 t +16 \\; \\text{, for} \\; t\\in [-5,5]'} /> </p>
 <p> In this section. We will go over in details on how to apply Fourier Series decomposition on those two example functions.
</p>
<hr />
<p>{getCircleNum(1)}:<Latex math={'\\color{green} y(t)=12cos(2t)sin(t)+16'}/></p>
<p>
  First let's find the period for this function:
</p>
<p>
  For <Latex math={'cos(2t)'}/>, its period is <Latex math={'\\pi'} />.
</p>
<p>
  For <Latex math={'sin(t)'}/>, its period is <Latex math={'2\\pi'} />.
</p>

<p>
  So together, the Least Common Multiple is <Latex math={'lcm(\\pi,2\\pi)=2\\pi'}/> ,
    so the period for <Latex math={'\\color{green} y(t)=12cos(2t)sin(t)+16'}/> is <Latex math={'T=2\\pi'}/>,
  as shown in Figure 1.
</p>

<div bind:this={fig1D3} />

<p>
  Let's make 
  <Latex center math={'y(t)= \\sum_{k=0}^{\\infty} {\\color{blue} a_k   cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=0}^{\\infty} { \\color{green} b_k sin(\\tfrac{2 \\pi }{T}kt)} '} />
  where,

   <Latex center math={'T=2\\pi'} />  

		<Latex center math={`\\color{blue} a_{k} \\color{black} =\\tfrac{2}{T} \\langle y(t),  \\color{blue} cos(\\tfrac{2 \\pi }{T}k t)  \\color{black} \\rangle =
   \\color{black} \\tfrac{1}{\\pi} \\langle y(t), cos(k t)  \\color{black} \\rangle 
   = \\tfrac{1}{\\pi} \\int_{2\\pi}^{} y(t)cos(kt) \\,dt 
 `} />
		<Latex center math={` \\color{green} b_{k} \\color{black} =\\tfrac{2}{T} \\langle y(t),  \\color{green} sin(\\tfrac{2 \\pi }{T}k t)  \\color{black} \\rangle
   \\color{black}= \\tfrac{1}{\\pi} \\langle y(t),  sin(k t)  \\color{black} \\rangle 
   = \\tfrac{1}{\\pi} \\int_{2\\pi}^{} y(t)sin(kt) \\,dt 
    `} />
		

  if you go ahead to do the the calculations to find <Latex math={'a_k'} /> and <Latex math={'b_k'} />, you will find that the only non-zero terms for <Latex math={'a_k'} /> and <Latex math={'b_k'} /> are:


</p>

<p>
  <Latex math={'a_k'} />
</p>


