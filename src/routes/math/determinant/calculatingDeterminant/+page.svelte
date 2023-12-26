<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	// import { pageRoute } from './sectionRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import Scrollspy from '$lib/components/Scrollspy/Scrollspy.svelte';

	// const contextSectionRoute = getContext<Writable<IRoute>>('contextSectionRoute');

	// onMount(() => {
	// 	(async () => {
	// 		contextSectionRoute.set(pageRoute);
	// 	})();
	// });

	// $: if(window) {
	// 	console.log(window.location.hash)
	// }
</script>


<Title hLevel={1}>Calculating Determinant</Title>
<p>
  In this section, using elementary row operations, I will show how to calculate determinant for matrix of <Latex math={'\\mathbb{R^2}'}/>, <Latex math={'\\mathbb{R^3}'}/> and <Latex math={'\\mathbb{R^n}'}/>.
</p>
<b><u>Elementary Row Operation:</u></b>
<ol>
  <li>
    <b>Row Swap:</b>
    <p>Switch any two rows</p>
  </li>
  <li>
    <b>Scalar Multiplication:</b>
    <p>Multiply a row with a constant<Latex math={'\\in \\mathbb{R}'}/> </p>
  </li>
  <li>
    <b>Row Sum:</b>
    <p>Add a multiple of one row to another row</p>
  </li>


</ol>