<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { pageRoute } from './pageRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';

	const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');

	onMount(() => {
		(async () => {
			innerPageRoute.set(pageRoute);
		})();
	});




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

