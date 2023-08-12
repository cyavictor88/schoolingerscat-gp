<script lang="ts">
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


	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined' && container) {
      console.log(container)
      let options = {
				rootMargin: '0px',
				threshold: [0.2, 0.4, 0.6, 0.8, 1.0]
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
					const ih = entry.intersectionRect.top;
					const bh = entry.boundingClientRect.top;
					const nodeIndex = intersectingStatus.findIndex(x=>x.node.id===entry.target.id);
					if(nodeIndex > -1) {
						intersectingStatus[nodeIndex].isInteresecting = entry.isIntersecting;
						intersectingStatus[nodeIndex].rectBound =  entry.boundingClientRect;
						intersectingStatus[nodeIndex].rectInter =  entry.intersectionRect;
						intersectingStatus = [...intersectingStatus];
						const firstTrueEntry = intersectingStatus.find(x=>x.isInteresecting &&
						x.rectBound && x.rectInter && x.rectInter) ?? intersectingStatus[0];
						if(highlightNode === null || highlightNode!== firstTrueEntry.node){
							highlightNode = firstTrueEntry.node;
							console.log(highlightNode.id);
						}
					}

					entry.target.innerHTML = entry.target.id+" "+entry.intersectionRatio.toFixed(2)+" "+entry.isIntersecting+" "+bh+" "+ih+" "+entry.boundingClientRect.height+" "+entry.intersectionRect.height;
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

<div bind:this={container}>
	<slot />
</div>

<style>
  div {
    background-color: red;
  }
</style>