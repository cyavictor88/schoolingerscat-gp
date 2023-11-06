<script lang="ts">
	import type { IRoute }  from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import url from '$lib/components/Route/url';

	const contextSectionRoute = getContext<Writable<IRoute|null>>('contextSectionRoute');

  export let sectionRoute : IRoute | null = null; 

	let topOfPageElement : HTMLDivElement ;

	onMount(() => {
		contextSectionRoute.set(sectionRoute);
	});

	import { SITE_COLOR } from '$lib/theme/colors';
	import Route from '$lib/components/Route/Route.svelte';

	// when url changes, scroll to the top of the page, pretty sure does not work 100% of the time
	// $: if ($url && typeof $url !== 'string' && topOfPageElement) {
  //   console.log($url);
	// 	topOfPageElement.scrollIntoView();
	// }

</script>

<!-- <div bind:this={topOfPageElement}></div> -->
<slot />
<hr />
<Route route={$contextSectionRoute} indent={0} bgColor={SITE_COLOR.LayoutFSSectionRouteBG} />
<hr />