<script lang="ts">
	import type { IRoute }  from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { pageRoute } from './pageRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import url from '$lib/components/Route/url';

	const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');



	onMount(() => {
    
		innerPageRoute.set(pageRoute);
	});

	import { SITE_COLOR } from '$lib/theme/colors';
	import Route from '$lib/components/Route/Route.svelte';

	$: if ($url && typeof $url !== 'string') {
		// currentHash = ($url as URL).hash;
    console.log($url);
    // if(window){
    //   console.log('scrollinggg');
    //   window.scrollTo(0,0);
    // }
	}

	// $: if(window) {
	// 	console.log(window.location.hash)
	// }
</script>


<slot />
<hr />
<Route route={$innerPageRoute} indent={0} bgColor={SITE_COLOR.LayoutFSPageRouteBG} />
<hr />