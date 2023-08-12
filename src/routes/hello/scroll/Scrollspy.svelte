<script lang="ts">
	import { xgcd } from 'mathjs';
	import { onMount } from 'svelte';
	let container: HTMLDivElement;
	let sectionNodeList;
	let observer: IntersectionObserver;
  let sectionsStatus: Map<HTMLElement,boolean> = new Map();
  let statusMap: Map<string,boolean> = new Map();
	interface IIntersectingStatus {
		node: Element;
		isInteresecting: boolean;
		rectInter?: DOMRectReadOnly;
		rectBound?: DOMRectReadOnly;
	}
	let intersectingStatus : IIntersectingStatus[] = [];

	let highlightNode : Element | null = null;
	let sectionsDebug : string[] = [];


	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined' && container) {
      console.log(container)
      let options = {
				root: null,
				rootMargin: '0px',
				threshold: [0,1]
			};
			let callback = (entries: IntersectionObserverEntry[], observer: any) => {
				entries.forEach((entry) => {
					// console.log(entry.target, entry.intersectionRatio, entry.isIntersecting);
          if(entry.isIntersecting && statusMap.get(entry.target.id) === false){
            
          }

          sectionsStatus.set(entry.target as HTMLElement, entry.isIntersecting);

          sectionsStatus.forEach((val,key)=>{
            statusMap.set(key.id, val)
          })
					const rectInter = entry.intersectionRect;
					const rectBound = entry.boundingClientRect;
					const nodeIndex = intersectingStatus.findIndex(x=>x.node.id===entry.target.id);
					if(nodeIndex > -1) {
						intersectingStatus[nodeIndex].isInteresecting = entry.isIntersecting;
						intersectingStatus[nodeIndex].rectBound =  entry.boundingClientRect;
						intersectingStatus[nodeIndex].rectInter =  entry.intersectionRect;
						intersectingStatus = intersectingStatus.map((x,idx)=>{
							if(idx===nodeIndex) return x;
							return {...x, rectBound: x.node.getBoundingClientRect()}
						})

						let intersectingEntries = intersectingStatus.filter(x=>x.isInteresecting && x.rectBound && x.rectInter );
						let orderedIntersectingEntries = intersectingEntries.sort((a,b)=> 
						b.rectInter!.height/b.rectBound!.height -a.rectInter!.height/a.rectBound!.height );
						if(highlightNode === null || highlightNode!== orderedIntersectingEntries[0].node){
							highlightNode = orderedIntersectingEntries[0].node;
							console.log(highlightNode.id);
						}

						// let firstTrueEntry = intersectingStatus.find(x=>x.isInteresecting &&
						// x.rectBound && x.rectInter && x.rectInter.h.top > 0) ?? intersectingStatus[0];
						// if(highlightNode === null || highlightNode!== firstTrueEntry.node){
						// 	highlightNode = firstTrueEntry.node;
						// 	console.log(highlightNode.id);
						// }
					}
					sectionsDebug = intersectingStatus.map(x=>{
						const id = x.node.id;
						const isInteresecting = x.isInteresecting ? '✓':'𐄂';
						const rectbT = x.rectBound?.top.toFixed(2);
						const rectiT = x.rectInter?.top.toFixed(2);
						const ishighlight = highlightNode === x.node? '✅':'❌';
						return `${ishighlight} ${id} ${isInteresecting} ${rectbT} ${rectiT} ${(x.rectInter?.height/x.rectBound?.height).toFixed(2)}`
					})
					entry.target.innerHTML = entry.target.id+" "+entry.intersectionRatio.toFixed(2)+" "+rectBound.top.toFixed(2)+" "+rectInter.top.toFixed(2)
				});
			};

			observer = new IntersectionObserver(callback, options);
			sectionNodeList = container.querySelectorAll('section');
			sectionNodeList.forEach(function (node, index) {
        sectionsStatus.set(node,false);
        statusMap.set(node.id, false);
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