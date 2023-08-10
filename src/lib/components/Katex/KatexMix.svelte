<script lang='ts'>
	import katex from "katex";
	import type { IKatexMix } from "./katexMix";

	export let mixedString: IKatexMix[] = [];
	export let displayMode = false;
	let katexMixString = '';
	const options = {
		displayMode: displayMode,
		throwOnError: false
	}
  mixedString.forEach(s=>{
    if(s.str) katexMixString += s.str + ' '
    else if(s.math) katexMixString +=  katex.renderToString(s.math, options) + ' '
  })
  katexMixString.trim();

	
</script>

<svelte:head>
  <!-- <link rel="stylesheet" href="/node_modules/katex/dist/katex.min.css" > -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelte:head>

{@html katexMixString}