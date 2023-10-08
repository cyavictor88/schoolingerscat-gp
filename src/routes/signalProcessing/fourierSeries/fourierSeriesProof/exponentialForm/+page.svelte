<script lang='ts'>
	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";
	import { SITE_COLOR } from "$lib/theme/colors";
	import { getCircleNum } from '$lib/unicode';
	import { onMount } from "svelte";

</script>

<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Exponential Form:
</Title>
<p>
Fourier Series is <Latex math={'f(t)= \\sum_{k=0}^{\\infty} {a_k cos(\\tfrac{2\\pi}{T} kt)} +  \\sum_{k=0}^{\\infty} {b_k sin(\\tfrac{2\\pi}{T} kt)}'} />
</p>

<p>
  But it can also be written in Exponential form:
</p>

<Latex center math={'f(t)= \\sum_{k=-\\infty}^{\\infty} {c_k e^{j\\tfrac{2\\pi}{T} kt}}'} />


<p>To prove it is </p>