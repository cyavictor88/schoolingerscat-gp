<script lang='ts'>
	import katex from "katex";
	export let math:string;
	export let displayMode = false;
	
	const options = {
		displayMode: displayMode,
		throwOnError: false
	}
	
	$: katexString = katex.renderToString(math, options);
</script>

<svelte:head>
  <link rel="stylesheet" href="/node_modules/katex/dist/katex.min.css" >
</svelte:head>

{@html katexString}