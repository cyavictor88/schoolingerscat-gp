<script lang="ts">
	import { onMount } from 'svelte';
	let container: HTMLDivElement;
	let sectionNodeList;
	let observer: IntersectionObserver;
  let sectionsStatus: Map<HTMLElement,boolean> = new Map();
  let statusMap: Map<string,boolean> = new Map();


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

          // sectionsStatus.set(entry.target as HTMLElement, entry.isIntersecting);

          // sectionsStatus.forEach((val,key)=>{
          //   statusMap.set(key.id, val)
          // })
          console.log(statusMap)
					entry.target.innerHTML = entry.intersectionRatio.toFixed(2);
				});
			};

			observer = new IntersectionObserver(callback, options);
			sectionNodeList = container.querySelectorAll('section');
			sectionNodeList.forEach(function (node, index) {
        sectionsStatus.set(node,false);
        statusMap.set(node.id, false);
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