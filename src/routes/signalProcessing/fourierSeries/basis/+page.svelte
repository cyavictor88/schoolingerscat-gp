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


<Title hLevel={1} >Basis</Title>

