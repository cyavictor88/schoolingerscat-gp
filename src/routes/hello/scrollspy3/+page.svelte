<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	// import { pageRoute } from './pageRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Scrollspy from '$lib/components/Scrollspy/Scrollspy.svelte';
	let wrapper: HTMLDivElement;
  let clicked: boolean = false;

  let scrollY = 0;
	// const contextSectionRoute = getContext<Writable<IRoute>>('contextSectionRoute');
	onMount(() => {
		// contextSectionRoute.set(pageRoute);
    const intersectingStatus = wrapper.querySelectorAll('section');


    const scrollingAction = (eve:Event)=>{
      clicked = false;
      intersectingStatus.forEach((x) => {
				(x as HTMLElement).style.backgroundColor = '';
			});
    }

    // const clickAction = () => {
    //   console.log('clickedd')
    //   clicked = true;
    // }

		// window.addEventListener('popstate', lc);
		// document.body.addEventListener('wheel', scrollingAction);
    // document.body.addEventListener('click', clickAction); 
    return ()=>{
		  // document.body.removeEventListener('wheel', scrollingAction);
      // document.body.removeEventListener('click', clickAction); 
    }
	});

  $: {
    console.log(scrollY)
  }
</script>
<svelte:window bind:scrollY={scrollY} />
<div bind:this={wrapper} on:scroll={(event) => {
  console.log(event.currentTarget.scrollTop)
}} >
	<h1>basis</h1>
	<Scrollspy>
		<section id="t1">
      <h2>b-tag1</h2>
			Ok, so what is the purpose of inner product? The way I see it, the inner product of two
			vectors indicated how closely aligned those two vectors are, assuming the magnitudes of those
			two vectors are fixed. Two things to clarify here: 1. How closely aligned two vectors are can
			be reisented by the angle or the cosine of the angle between the two vectors, as shown in
			Figure 1. 2. What I mean by having fixed magnitude vectors is that if given a vector and a set
			of vectors that have the same length as but with different orientations, the greater the inner
			product of and a vector from that set, the more closely aligned that vector is to compare to
			other vectors in that set. Let me show you how the formula of inner product of two vectors is
			related to the cosine angle between the two vectors using Figure 1. In Figure 1, it shows two
			vectors, and , with indicates the angle between twop vectors and indicates the distance
			between two vectos.Ok, so what is the purpose of inner product? The way I see it, the inner
			product of two vectors indicated how closely aligned those two vectors are, assuming the
			magnitudes of those two vectors are fixed. Two things to clarify here: 1. How closely aligned
			two vectors are can be reisented by the angle or the cosine of the angle between the two
			vectors, as shown in Figure 1. 2. What I mean by having fixed magnitude vectors is that if
			given a vector and a set of vectors that have the same length as but with different
			orientations, the greater the inner product of and a vector from that set, the more closely
			aligned that vector is to compare to other vectors in that set. Let me show you how the
			formula of inner product of two vectors is related to the cosine angle between the two vectors
			using Figure 1. In Figure 1, it shows two vectors, and , with indicates the angle between twop
			vectors and indicates the distance between two vectos.Ok, so what is the purpose of inner
			product? The way I see it, the inner product of two vectors indicated how closely aligned
			those two vectors are, assuming the magnitudes of those two vectors are fixed. Two things to
			clarify here: 1. How closely aligned two vectors are can be reisented by the angle or the
			cosine of the angle between the two vectors, as shown in Figure 1. 2. What I mean by having
			fixed magnitude vectors is that if given a vector and a set of vectors that have the same
			length as but with different orientations, the greater the inner product of and a vector from
			that set, the more closely aligned that vector is to compare to other vectors in that set. Let
			me show you how the formula of inner product of two vectors is related to the cosine angle
			between the two vectors using Figure 1. In Figure 1, it shows two vectors, and , with
			indicates the angle between twop vectors and indicates the distance between two vectos.
		</section>

		<section id="t2">
      <h2>b-tag2</h2>

			b-tag 2 Ok, so what is the purpose of inner product? The way I see it, the inner product of two
			vectors indicated how closely aligned those two vectors are, assuming the magnitudes of those
			two vectors are fixed. Two things to clarify here: 1. How closely aligned two vectors are can
			be reisented by the angle or the cosine of the angle between the two vectors, as shown in
			Figure 1. 2. What I mean by having fixed magnitude vectors is that if given a vector and a set
			of vectors that have the same length as but with different orientations, the greater the inner
			product of and a vector from that set, the more closely aligned that vector is to compare to
			other vectors in that set. Let me show you how the formula of inner product of two vectors is
			related to the cosine angle between the two vectors using Figure 1. In Figure 1, it shows two
			vectors, and , with indicates the angle between twop vectors and indicates the distance
			between two vectos.Ok, so what is the purpose of inner product? The way I see it, the inner
			product of two vectors indicated how closely aligned those two vectors are, assuming the
			magnitudes of those two vectors are fixed. Two things to clarify here: 1. How closely aligned
			two vectors are can be reisented by the angle or the cosine of the angle between the two
			vectors, as shown in Figure 1. 2. What I mean by having fixed magnitude vectors is that if
			given a vector and a set of vectors that have the same length as but with different
			orientations, the greater the inner product of and a vector from that set, the more closely
			aligned that vector is to compare to other vectors in that set. Let me show you how the
			formula of inner product of two vectors is related to the cosine angle between the two vectors
			using Figure 1. In Figure 1, it shows two vectors, and , with indicates the angle between twop
			vectors and indicates the distance between two vectos.Ok, so what is the purpose of inner
			product? The way I see it, the inner product of two vectors indicated how closely aligned
			those two vectors are, assuming the magnitudes of those two vectors are fixed. Two things to
			clarify here: 1. How closely aligned two vectors are can be reisented by the angle or the
			cosine of the angle between the two vectors, as shown in Figure 1. 2. What I mean by having
			fixed magnitude vectors is that if given a vector and a set of vectors that have the same
			length as but with different orientations, the greater the inner product of and a vector from
			that set, the more closely aligned that vector is to compare to other vectors in that set. Let
			me show you how the formula of inner product of two vectors is related to the cosine angle
			between the two vectors using Figure 1. In Figure 1, it shows two vectors, and , with
			indicates the angle between twop vectors and indicates the distance between two vectos.
		</section>

		<section id="t3">
      <h2>b-tag3</h2>

			t3 Ok, so what is the purpose of inner product? The way I see it, the inner product of two
			vectors indicated how closely aligned those two vectors are, assuming the magnitudes of those
			two vectors are fixed. Two things to clarify here: 1. How closely aligned two vectors are can
			be reisented by the angle or the cosine of the angle between the two vectors, as shown in
			Figure 1. 2. What I mean by having fixed magnitude vectors is that if given a vector and a set
			of vectors that have the same length as but with different orientations, the greater the inner
			product of and a vector from that set, the more closely aligned that vector is to compare to
			other vectors in that set. Let me show you how the formula of inner product of two vectors is
			related to the cosine angle between the two vectors using Figure 1. In Figure 1, it shows two
			vectors, and , with indicates the angle between twop vectors and indicates the distance
			between two vectos.Ok, so what is the purpose of inner product? The way I see it, the inner
			product of two vectors indicated how closely aligned those two vectors are, assuming the
			magnitudes of those two vectors are fixed. Two things to clarify here: 1. How closely aligned
			two vectors are can be reisented by the angle or the cosine of the angle between the two
			vectors, as shown in Figure 1. 2. What I mean by having fixed magnitude vectors is that if
			given a vector and a set of vectors that have the same length as but with different
			orientations, the greater the inner product of and a vector from that set, the more closely
			aligned that vector is to compare to other vectors in that set. Let me show you how the
			formula of inner product of two vectors is related to the cosine angle between the two vectors
			using Figure 1. In Figure 1, it shows two vectors, and , with indicates the angle between twop
			vectors and indicates the distance between two vectos.Ok, so what is the purpose of inner
			product? The way I see it, the inner product of two vectors indicated how closely aligned
			those two vectors are, assuming the magnitudes of those two vectors are fixed. Two things to
			clarify here: 1. How closely aligned two vectors are can be reisented by the angle or the
			cosine of the angle between the two vectors, as shown in Figure 1. 2. What I mean by having
			fixed magnitude vectors is that if given a vector and a set of vectors that have the same
			length as but with different orientations, the greater the inner product of and a vector from
			that set, the more closely aligned that vector is to compare to other vectors in that set. Let
			me show you how the formula of inner product of two vectors is related to the cosine angle
			between the two vectors using Figure 1. In Figure 1, it shows two vectors, and , with
			indicates the angle between twop vectors and indicates the distance between two vectos.
		</section>
	</Scrollspy>
</div>

<style>
	section {
		-moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
	}
	</style>