<script lang="ts">
	import { onMount } from 'svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
  import { Universe } from './Universe';
	import { Multiverse } from './Multiverse';
	import ToggleViewPort from './ToggleViewPort.svelte';

	let uni0Div: HTMLDivElement;
	let uni1Div: HTMLDivElement;
	let uni2Div: HTMLDivElement;
	let universe0: Universe;
	let universe1: Universe;
	let universe2: Universe;
  let shows = [true,false,false];
	let canvas: HTMLCanvasElement;

  export let veca:[number,number,number] = [-4,4,-5];
  export let vecb:[number,number,number] =[-1,2,3] ;
  export let vecc:[number,number,number] = [4,3,5];
	export let zoomIn: boolean = false;

    // this.veca = new Vector(-1,2,3,0x008800);
    // this.vecb = new Vector(4,3,5,0x0000ff);
    // this.vecv = new Vector(-4,4,-5,0xff0000);
	onMount(() => {
		universe0 = new Universe(uni0Div,veca,vecb,vecc,zoomIn,null);
		universe1 = new Universe(uni1Div,veca,vecb,vecc,zoomIn,2);
		universe2 = new Universe(uni2Div,veca,vecb,vecc,zoomIn,-2);
		const multiverse = new Multiverse(canvas, [universe0,universe1,universe2], shows);

		universe0.eventBroker.emit('setMathMeshes');
		universe0.eventBroker.emit('setRightHand');
		universe1.eventBroker.emit('setMathMeshes');
		universe1.eventBroker.emit('setRightHand');
		universe2.eventBroker.emit('setMathMeshes');
		universe2.eventBroker.emit('setRightHand');
		multiverse.start();

		return () => {
			universe0.eventBroker.removeAllListeners();
			universe1.eventBroker.removeAllListeners();
			universe2.eventBroker.removeAllListeners();
			if (uni0Div.firstChild) uni0Div.removeChild(uni0Div.firstChild);
			if (uni1Div.firstChild) uni1Div.removeChild(uni1Div.firstChild);
			if (uni2Div.firstChild) uni2Div.removeChild(uni2Div.firstChild);
		};
	});

</script>
<div style='padding: 4px; border: 1px black solid'>

<!-- need this div so the canvas is contained -->
<div style="position: relative;" >
  <canvas bind:this={canvas}/>
  <!-- nned this div so html elements are on top of canvas( so can click on toggles)-->
  <div style="position: relative;  display:flex; flex-flow: column wrap;">
		<p>
			If <Latex math={`M'`} /> is formed by multiplying one row by a constant <Latex math={'c'} />, then
			<Latex math={`det(M')=c \\times det(M)`} />
		</p>
		<p>
			Proof: Given that the volume of the parallelepiped is: <Latex math={`Volume = area \\times height `} />, 
			if you multiply one row in <Latex math={'M'} /> by <Latex math={'c'} />,
			you are just multiplying the <Latex math={'height'} /> by <Latex math={'c'} />.
			So the resulting volume is  <Latex math={`New Volume = area \\times c \\times height  = c \\times (area \\times height)`} />.
		</p>
		<p>Say we have a <Latex 
			math={`M = \\begin{bmatrix}
			\\color{red}\\vec{v_1} \\\\ \\color{blue}\\vec{v_2} \\\\ \\color{green}\\vec{v_3} \\end{bmatrix} 
									 =
									 \\begin{bmatrix}
									\\color{red}v_{11}  &\\color{red} v_{12} &  \\color{red}v_{13} \\\\
									\\color{blue}v_{21} &  \\color{blue}v_{22} &  \\color{blue}v_{23} \\\\
									\\color{green}v_{31} & \\color{green}v_{32} & \\color{green}v_{33} \\\\
									\\end{bmatrix} 
										`}
			/> as shown below</p>
		<div bind:this={uni0Div} style={`width:400px;height:400px;${shows[0]? 'display:block' : 'display:none'}`}/>
		<p>Now say we do <Latex math={`\\color{purple}\\vec{v_2} \\color{black}= \\color{blue} 2\\vec{v_2}`}/>, you will see that the volume is doubled.</p>
    <ToggleViewPort bind:visible={shows[1]}>
      <div slot='text'>
        <Latex math={'\\color{purple}c=2'} />
      </div>
      <div slot='viewport' bind:this={uni1Div} style={`width:400px;height:400px;${shows[1]? 'display:block' : 'display:none'}`}/>
    </ToggleViewPort>
		<p>
			If <Latex math={'c < 0'}/>, then you also flip the orientation.
		</p>
		<p>Now say we do <Latex math={`\\color{purple}\\vec{v_2} \\color{black}= \\color{blue} -2\\vec{v_2}`}/>, you will see that the volume is doubled, and the orientation is flipped(thumb is pointer away from <Latex math={'\\color{green}\\vec{v_3}'} /> when curl your right finger from <Latex math={'\\color{red}\\vec{v_1}'} /> to <Latex math={'\\color{purple}\\vec{-2v_2}'} />).</p>

    <ToggleViewPort bind:visible={shows[2]}>
      <div slot='text'>
				<Latex math={'\\color{purple}c=-2'} />
      </div>
      <div slot='viewport' bind:this={uni2Div} style={`width:400px;height:400px;${shows[2]? 'display:block' : 'display:none'}`}/>
    </ToggleViewPort>
  </div>
</div>
</div>

<style>
canvas {
	padding: 8px;
  /* border: 4px solid yellow; */
  /* background-color: rgba(0,0,0,0.5); */
  position: absolute;
  /* width: 1000px; */
  /* height: var(--post-height); */
  width:100%; 
  height:100%;
  /* z-index:0; */
}
</style>