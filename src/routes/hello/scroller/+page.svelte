<script lang="ts">
	import { onMount } from "svelte";

	let observer;
	let container;
	let obj1: Element;
	let obj2: Element;
	let obj3: Element;
	let obj4: Element;
	let options = {
		root: container,
		rootMargin: '0px',
		threshold: [0.2,0.4,0.6,0.8,1.0]
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
    observer.observe(obj3);
    observer.observe(obj4);
		// const observer = new IntersectionObserver((entries, observer) => {

		//  })

	}
})
</script>
<div bind:this={container} >
  <section id='s1' bind:this={obj1}>1</section>
  <section id='s2' bind:this={obj2}>2</section>
  <section id='s3' bind:this={obj3}>3</section>
  <section id='s4' bind:this={obj4}>4</section>
</div>
<style>
  div {
    background-color: red;
  }
  section {
    height: 80vh;
    background-color: green;
    margin: 10px;   
  }
</style>