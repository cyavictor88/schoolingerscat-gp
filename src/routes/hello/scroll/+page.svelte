<script lang="ts">
	import { onMount } from "svelte";

	let observer;
	let container;
	let obj1: Element;
	let obj2: Element;
	let options = {
		root: container,
		rootMargin: '0px',
		threshold: [0.6,0.8,1.0]
	};

  onMount(()=>{


	if (typeof IntersectionObserver !== 'undefined') {
    let callback = (entries: IntersectionObserverEntry[], observer: any) => {
      entries.forEach((entry) => {
        console.log(entry.target,entry.intersectionRatio,entry.isIntersecting);
        entry.target.innerHTML = entry.intersectionRatio.toFixed(2);
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
      });
    };

		observer = new IntersectionObserver(callback, options);
    observer.observe(obj1);
    observer.observe(obj2);
		// const observer = new IntersectionObserver((entries, observer) => {

		//  })

	}
})
</script>
<div bind:this={container} ></div>
<section id='s1' bind:this={obj1}>1</section>
<section id='s2' bind:this={obj2}>2</section>

<style>
  section {
    height: 80vh;
    background-color: green;
    margin: 10px;   
  }
</style>