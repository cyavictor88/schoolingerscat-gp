<script lang='ts'>
	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
	import { getCircleNum } from '$lib/unicode';

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
  as shown in Figure meow
</p>



