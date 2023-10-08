<script lang='ts'>
	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
	import { getCircleNum } from '$lib/unicode';
	import { onMount } from "svelte";
	import { drawFunc1 } from "./d3/drawFunc1";
	import { drawFunc2 } from "./d3/drawFunc2";
	import { drawFunc1FS } from "./d3/drawFunc1FS";
	import { drawFunc2FS } from "./d3/drawFunc2FS";
  let fig1D3: HTMLDivElement;
  let fig2D3: HTMLDivElement;
  let fig3D3: HTMLDivElement;
  let fig4D3: HTMLDivElement;
  onMount(()=>{
    fig1D3.append(drawFunc1()!);
    fig2D3.append(drawFunc1FS()!);
    fig3D3.append(drawFunc2()!);
    fig4D3.append(drawFunc2FS()!);
  });
</script>

<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Examples from Introduction:
</Title>

<p>In the Introduction page, I showed 2 examples using:</p>
<p> a periodic function:  {getCircleNum(1)} <Latex math={'\\color{green} y(t)=12cos(2t)sin(t)+16'}/> </p>
 <p>  and a non-periodic function:  {getCircleNum(2)} <Latex math={'\\color{red} y(t) = t^3 -12 t +16 \\; \\text{, for} \\; t\\in [-6,6]'} /> </p>
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
  <Latex center math={'y(t)=  a_0 + \\sum_{k=1}^{\\infty} {\\color{blue} a_k   cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=1}^{\\infty} { \\color{green} b_k sin(\\tfrac{2 \\pi }{T}kt)} '} />
  where,

   <Latex center math={'T=2\\pi'} />  

   <Latex center math={'a_0= \\tfrac{1}{T} \\int_{T} y(t) \\, dt = \\tfrac{1}{2\\pi} \\int_{0}^{2\\pi} y(t) \\, dt '} />  
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
  <Latex math={'a_0 = 16, b_1 = -6 , b_3 = 6'} />
  </p>
<p>
  <Latex math={`\\rightarrow y(t) = a_0 + b_1 \\cdot sin(\\tfrac{2\\pi}{T}(1)t) + b_3 \\cdot sin(\\tfrac{2\\pi}{T}(3)t)
  `} />
</p>
<p>
  <Latex math={`\\rightarrow y(t) 
  = 16 -6 sin(t) + 6 sin(3t)`} />
  </p>
<p> If we graph  <p>
  <Latex math={`y(t) 
  = 16 -6 sin(t) + 6 sin(3t)`} />
  and <Latex math={'\\color{green} y(t)=12cos(2t)sin(t)+16'}/>, you will see they have the same values as shown in Figure 2.
</p>
  <div bind:this={fig2D3} />


  <hr />
  <p>{getCircleNum(2)}:
  <Latex math={'\\color{red} y(t) = t^3 -12 t +16 \\; \\text{, for} \\; t\\in [-6,6]'} />
</p>
<p>Well, <Latex math={'\\color{red} y(t)'} /> is not a periodic function as shown in Figure 3</p>
<div bind:this={fig3D3} />

<p>But if we only need to approximate between the interval of <Latex math={'\\color{violet} t\\in [-6,6]'} />,we can pretend we have a periodic function with period <Latex math={'T=12'}/> </p>



<p>
  Let's make 
  <Latex center math={'y(t)=  a_0 + \\sum_{k=1}^{\\infty} {\\color{blue} a_k   cos(\\tfrac{2 \\pi }{T}kt)} +  \\sum_{k=1}^{\\infty} { \\color{green} b_k sin(\\tfrac{2 \\pi }{T}kt)} '} />
  where,

   <Latex center math={'T=12'} />  

   <Latex center math={'a_0= \\tfrac{1}{T} \\int_{T} y(t) \\, dt = \\tfrac{1}{12} \\int_{-6}^{6} y(t) \\, dt '} />  
		<Latex center math={`\\color{blue} a_{k} \\color{black} =\\tfrac{2}{T} \\langle y(t),  \\color{blue} cos(\\tfrac{2 \\pi }{T}k t)  \\color{black} \\rangle =
   \\color{black} \\tfrac{1}{6} \\langle y(t), cos( \\tfrac{\\pi}{6}k t)  \\color{black} \\rangle 
   = \\tfrac{1}{6} \\int_{12}^{} y(t)cos(\\tfrac{\\pi}{6}kt) \\,dt 
 `} />
		<Latex center math={` \\color{green} b_{k} \\color{black} =\\tfrac{2}{T} \\langle y(t),  \\color{green} sin(\\tfrac{2 \\pi }{T}k t)  \\color{black} \\rangle
   \\color{black}= \\tfrac{1}{6} \\langle y(t),  sin(\\tfrac{\\pi}{6}k t)  \\color{black} \\rangle 
   = \\tfrac{1}{6} \\int_{12}^{} y(t)sin(\\tfrac{\\pi}{6}kt) \\,dt 
    `} />
  

  if you go ahead to do the the calculations to find <Latex math={'a_k'} /> and <Latex math={'b_k'} />, you will find terms of <Latex math={'a_k'} />s and <Latex math={'b_k'} />s:
</p>

<p>
  Here we will use the k <Latex math={'\\leq'} /> 45 terms to approximate <Latex math={'\\color{red} y(t) = t^3 -12 t +16 \\; \\text{, for} \\; t\\in [-6,6]'} />:
</p>
 <p>
  <Latex math={'\\color{blue}a_0 \\color{black}= 8'} /> 
</p>
<p>
  <Latex math={'\\color{blue}a_k \\color{black}= 0 \\; \\text{for} \\; k > 0'} /> 
</p>
<p>
  <Latex math={'[\\color{green} b_1 ... b_{45} \\color{black}] ='} /> [ 8.077, -35.387, 27.462, -21.612, 17.666, -14.892, 12.852, -11.296, 10.071, -9.084, 8.271, -7.591, 7.014, -6.518, 6.087, -5.709, 5.376, -5.079, 4.813, -4.573, 4.356, -4.159, 3.979, -3.814, 3.662, -3.521, 3.391, -3.270, 3.158, -3.053, 2.954, -2.862, 2.776, -2.694, 2.617, -2.545, 2.476, -2.411, 2.349, -2.291, 2.235, -2.182, 2.131, -2.083]
</p>

<p>the final Fourier Series approximation is: </p>
<Latex center math={'\\color{purple}y(t) \\approx  8 +   \\sum_{k=1}^{45} {  b_k sin(\\tfrac{ \\pi }{6}kt)}'} />


<p>The result is shown in Figure 4:</p>
<div bind:this={fig4D3} />
<p>In Figure 4, you can see that Fourier Series was able to approximate the function in the focus interval. If you zoom in/out, you can see that the approximated function does has period = 12  </p>
