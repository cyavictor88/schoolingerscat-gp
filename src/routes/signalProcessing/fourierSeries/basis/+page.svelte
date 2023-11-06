<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	// import { pageRoute } from './sectionRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';

	const contextSectionRoute = getContext<Writable<IRoute>>('contextSectionRoute');

	// onMount(() => {
	// 	(async () => {
	// 		contextSectionRoute.set(pageRoute);
	// 	})();
	// });




	// $: if(window) {
	// 	console.log(window.location.hash)
	// }
</script>


<Title hLevel={1}>Basis</Title>

<p>A basis for a vector space of any dimension is a set of vectors that satisfies the following 2 conditions:</p>
<ol>
	<li>The vectors in the set are linear independent</li>
	<li>The vectors in the set span the vector space</li>
</ol>

