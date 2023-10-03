<script lang='ts'>
	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";

</script>

<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Examples:
</Title>

<p>In the Introduction page, I showed 2 examples using:</p>
<p> a periodic function: <Latex math={'\\color{green} y(t)=12cos(2t)sin(t)+16'}/> </p>

 <p>  and a non-periodic function: <Latex math={'\\color{red} y(t) = t^3 -12 t +16 \\; \\text{, for} \\; t\\in [-5,5]'} /> </p>
 <p> In this section. We will go over in details on how to apply Fourier Series decomposition on those two example functions.
</p>