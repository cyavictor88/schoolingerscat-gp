<script lang="ts">
	import { onMount } from 'svelte';
	let container: HTMLDivElement;
	let sectionNodeList;
	let observer: IntersectionObserver;
	interface IIntersectingStatus {
		node: Element;
		isInteresecting: boolean;
		rectInter?: DOMRectReadOnly;
		rectBound?: DOMRectReadOnly;
	}
	let intersectingStatus : IIntersectingStatus[] = [];

	let highlightNode : Element | null = null;
	let sectionsDebug : string[] = [];
	const highlightableTopToVHRatio = 0.11;


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
					entry.target.innerHTML = entry.target.id+" "+entry.intersectionRatio.toFixed(2)+" "+rectBound.top.toFixed(2)+" "+rectInter.top.toFixed(2)
				});
				intersectingStatus = intersectingStatus.map((x)=>{
					return {...x, rectBound: x.node.getBoundingClientRect()}
				})

				let intersectingEntries = intersectingStatus.filter(x=>x.isInteresecting && x.rectBound && x.rectInter && x.rectBound.top/window.innerHeight < highlightableTopToVHRatio );
				let orderedIntersectingEntries = intersectingEntries.sort((a,b)=> b.rectInter!.height/b.rectBound!.height - a.rectInter!.height/a.rectBound!.height );
				if(highlightNode === null || highlightNode!== orderedIntersectingEntries[0].node){
					highlightNode = orderedIntersectingEntries[0].node;
					// console.log(highlightNode.id);
				}
				intersectingStatus.forEach(x=>{
					const bgColor =  highlightNode===x.node ? 'green' : 'maroon';
					(x.node as HTMLElement).style.backgroundColor = bgColor;
				})
					
				sectionsDebug = intersectingStatus.map(x=>{
					const id = x.node.id;
					const isInteresecting = x.isInteresecting ? '✓':'𐄂';
					const rectbT = x.rectBound?.top.toFixed(2);
					const rectiT = x.rectInter?.top.toFixed(2);
					const ishighlight = highlightNode === x.node? '✅':'❌';
					return `${ishighlight} ${id} ${isInteresecting} max of: ${(x.rectInter?.height/x.rectBound?.height).toFixed(2)} && ${highlightableTopToVHRatio} > ${(x.rectBound.top/window.innerHeight).toFixed(2)}`
				})
			};
			
			observer = new IntersectionObserver(callback, options);
			sectionNodeList = container.querySelectorAll('section');
			sectionNodeList.forEach(function (node, index) {
				intersectingStatus.push({node:node,isInteresecting:false})
				observer.observe(node);
			});

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
  #stuff {
    background-color: red;
  }

	#debug {
		position:fixed;
		top:100px;
		right:300px;
		background-color: yellow;
	}
</style>