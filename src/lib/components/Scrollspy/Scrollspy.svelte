<script lang="ts">
	import { onMount } from 'svelte';
	let container: HTMLDivElement;
	let sectionNodeList;
	let observer: IntersectionObserver;
	interface IScrollspy {
		node: Element;
		isInteresecting: boolean;
		rectInter?: DOMRectReadOnly;
		rectBound?: DOMRectReadOnly;
	}
	let intersectingStatus : IScrollspy[] = [];

	let highlightNode : Element | null = null;
	let sectionsDebug : string[] = [];
	const highlightableTopToVHRatio = 0.11;
	const highlightColor = 'yellow';
	const unhighlightColor = 'grey';

	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined' && container) {
      console.log(container)
      let options = {
				rootMargin: '0px',
				threshold: [0.,0.5,0.9]
			};
			let callback = (entries: IntersectionObserverEntry[], observer: any) => {
				entries.forEach((entry) => {
					const rectInter = entry.intersectionRect;
					const rectBound = entry.boundingClientRect;
					const nodeIndex = intersectingStatus.findIndex(x=>x.node===entry.target);
					if(nodeIndex > -1) {
						intersectingStatus[nodeIndex].isInteresecting = entry.isIntersecting;
						intersectingStatus[nodeIndex].rectBound =  entry.boundingClientRect;
						intersectingStatus[nodeIndex].rectInter =  entry.intersectionRect;
					}
				});
				intersectingStatus = intersectingStatus.map((x)=>{
					return {...x, rectBound: x.node.getBoundingClientRect()}
				});

				let intersectingEntries = intersectingStatus.filter(x=>x.isInteresecting && x.rectBound && x.rectInter && x.rectBound.top/window.innerHeight < highlightableTopToVHRatio );
				let orderedIntersectingEntries = intersectingEntries.sort((a,b)=> b.rectInter!.height/b.rectBound!.height - a.rectInter!.height/a.rectBound!.height );
				if(highlightNode === null || (highlightNode !== orderedIntersectingEntries[0].node)){
					if(orderedIntersectingEntries.length)
					{
						highlightNode = orderedIntersectingEntries[0].node;
          	window.location.hash = highlightNode.id;
					}

				}

				// intersectingStatus.forEach(x=>{
				// 	const bgColor =  highlightNode===x.node ? highlightColor : unhighlightColor;
				// 	(x.node as HTMLElement).style.backgroundColor = bgColor;
				// })
				// setTimeout(()=>{(x as HTMLElement).style.backgroundColor =''}, 1000)

			};

			observer = new IntersectionObserver(callback, options);
			sectionNodeList = container.querySelectorAll('section');
			sectionNodeList.forEach(function (node, index) {
				intersectingStatus.push({node:node,isInteresecting:false})
				observer.observe(node);
			});

		}
    const locationChangeAction = ()=>{
			intersectingStatus.forEach((x) => {
				const bgColor = '#' + x.node.id === window.location.hash ? 'rgba(255,165,255   ,0.2)' : '';
				(x.node as HTMLElement).style.background = bgColor;
				setTimeout(()=>{(x.node as HTMLElement).style.background =''}, 1000)
			});
    };
		window.addEventListener('popstate', locationChangeAction);
		return ()=>{
			observer.disconnect();
      window.removeEventListener('popstate', locationChangeAction);
		}
	});

</script>

<div id='stuff' bind:this={container}>
	<slot />
</div>

<div id='debug'>
	{#each sectionsDebug as sec}
	<p>{sec}</p>
	{/each}
</div>

<style>


	#debug {
		position:fixed;
		top:100px;
		right:300px;
		background-color: yellow;
	}


</style>