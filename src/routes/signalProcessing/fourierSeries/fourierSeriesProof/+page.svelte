<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';

	const innerPageRoute = getContext<Writable<IRoute | null>>('innerPageRoute');

	onMount(() => {
		(async () => {
			innerPageRoute.set(null);
		})();
	});

</script>
<Title hLevel={1}>Fourier Series - Proof</Title>
