<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { pageRoute } from './pageRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import Scrollspy from '$lib/components/Scrollspy/Scrollspy.svelte';

	const innerPageRoute = getContext<Writable<IRoute>>('innerPageRoute');

	onMount(() => {
		(async () => {
			innerPageRoute.set(pageRoute);
		})();
	});

	import InnerProduct2D from './innerProduct2D/+page.svelte';
	import InnerProduct3D from './innerProduct3D/+page.svelte';
	import { SITE_COLOR } from '$lib/theme/colors';
	import InnerProductRn from './innerProductRn/+page.svelte';
	import Route from '$lib/components/Route/Route.svelte';



	// $: if(window) {
	// 	console.log(window.location.hash)
	// }
</script>


<Title hLevel={1} id={'innerProduct'}>Inner Product</Title>
<p>
	What is inner product? The inner product of 2 vectors indicates how closely aligned the 2
	vectors are to each other.
</p>
<p>
	We will start with explaining inner product of vectors in <Latex
		math={'\\mathbb{R}^2'}
	/>
	, and end with explaining inner product of functions.
</p>

<!-- <Route route={$innerPageRoute} indent={0} bgColor={SITE_COLOR.CompRouteDefaultBG} /> -->


{#if false}
<Scrollspy>
	<Title hLevel={2} backgroudColor={SITE_COLOR.TitleBG}>
		Inner Product in <Latex math={'\\mathbb{R}^2'} />:
	</Title>
	<section id="innerProduct2D">
		<Title hLevel={2} backgroudColor={SITE_COLOR.TitleBG}>
			Inner Product in <Latex math={'\\mathbb{R}^2'} />:
		</Title>
		<InnerProduct2D />
	</section>
	<section id="innerProduct3D">
		<Title hLevel={2} backgroudColor={SITE_COLOR.TitleBG}>
			Inner Product in <Latex math={'\\mathbb{R}^3'} />:
		</Title>
		<InnerProduct3D />
	</section>
	<section id="innerProductRn">
		<Title hLevel={2} backgroudColor={SITE_COLOR.TitleBG}>
			Inner Product in <Latex math={'\\mathbb{R}^n'} />:
		</Title>
		<InnerProductRn />
	</section>
</Scrollspy>
{/if}
