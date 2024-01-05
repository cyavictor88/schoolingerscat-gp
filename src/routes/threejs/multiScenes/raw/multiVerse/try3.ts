import * as THREE from 'three';
// import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



interface SceneHTMLElement {
  elem: HTMLElement;
  fn: any;
	rect: DOMRect;
}

export function try3(canvas: HTMLCanvasElement, boxElem: HTMLSpanElement, pyramidElem:HTMLSpanElement){

	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
	const rect = canvas.getBoundingClientRect();
	// console.log('canvas rect',rect)
	const sceneElements :SceneHTMLElement[]= [];
	function addScene( elem:HTMLElement, fn:any) {
		// console.log('rect',rect)
		const spanEle = elem as HTMLSpanElement;
		spanEle.offsetHeight

		const rect :DOMRect = {
			height: spanEle.offsetHeight,
			width: spanEle.offsetWidth,
			left: spanEle.offsetLeft,
			top: spanEle.offsetTop,
			right: spanEle.offsetLeft+spanEle.offsetWidth ,
			bottom:spanEle.offsetTop+spanEle.offsetHeight,
			x:0,
			y:0,
			toJSON: ()=>{},
		}
		sceneElements.push( { elem, fn,rect } );

	}

	function makeScene( elem:HTMLElement ) {

		const scene = new THREE.Scene();

		const fov = 45;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 5;
		const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
		camera.position.set( 0, 1, 2 );
		camera.lookAt( 0, 0, 0 );
		scene.add( camera );

		const controls = new OrbitControls( camera, elem as HTMLSpanElement );
		// controls.noZoom = true;
		// controls.noPan = true;

		{

			const color = 0xFFFFFF;
			const intensity = 3;
			const light = new THREE.DirectionalLight( color, intensity );
			light.position.set( - 1, 2, 4 );
			camera.add( light );

		}

		return { scene, camera, controls };

	}

	const sceneInitFunctionsByName = {
		'box': ( elem:HTMLElement ) => {

			const { scene, camera, controls } = makeScene( elem );
			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshPhongMaterial( { color: 'red' } );
			const mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );
			return ( time:number, rect:DOMRect ) => {

				mesh.rotation.y = time * .1;
				camera.aspect = rect.width / rect.height;
				camera.updateProjectionMatrix();
				// controls.handleResize();
				controls.update();
				renderer.render( scene, camera );

			};

		},
		'pyramid': ( elem:HTMLElement ) => {

			const { scene, camera, controls } = makeScene( elem );
			const radius = .8;
			const widthSegments = 4;
			const heightSegments = 2;
			const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
			const material = new THREE.MeshPhongMaterial( {
				color: 'blue',
				flatShading: true,
			} );
			const mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );
			return ( time:number, rect:DOMRect ) => {

				mesh.rotation.y = time * .1;
				camera.aspect = rect.width / rect.height;
				camera.updateProjectionMatrix();
				// controls.handleResize();
				controls.update();
				renderer.render( scene, camera );

			};

		},
	};

  const boxInitFunc = sceneInitFunctionsByName[ 'box' ];
  const boxSceneRenderFunction = boxInitFunc( boxElem );
  addScene(boxElem,boxSceneRenderFunction );

  const pyramidInitFunc = sceneInitFunctionsByName[ 'pyramid' ];
  const pyramidSceneRenderFunction = pyramidInitFunc( pyramidElem );
  addScene(pyramidElem,pyramidSceneRenderFunction );

	// document.querySelectorAll( '[data-diagram]' ).forEach( ( elem ) => {

	// 	const sceneName = elem.dataset.diagram;
	// 	const sceneInitFunction = sceneInitFunctionsByName[ sceneName ];
	// 	const sceneRenderFunction = sceneInitFunction( elem );
	// 	addScene( elem, sceneRenderFunction );

	// } );

	function resizeRendererToDisplaySize( renderer:THREE.Renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	const clearColor = new THREE.Color( '#000' );
	function render( time:number ) {

		time *= 0.001;

		resizeRendererToDisplaySize( renderer );

		renderer.setScissorTest( false );
		renderer.setClearColor( clearColor, 0 );
		renderer.clear( true, true );
		renderer.setScissorTest( true );

		// const transform = `translateY(${window.scrollY}px)`;
		// renderer.domElement.style.transform = transform;	

		for ( const { elem, fn,rect } of sceneElements ) {

			// get the viewport relative position of this element
			// const rect = elem.getBoundingClientRect();
			const { left, right, top, bottom, width, height } = rect;
			// console.log('rect',rect)
			// console.log('canvas rect',canvas.getBoundingClientRect());

			const isOffscreen =
          bottom < 0 ||
          top > renderer.domElement.clientHeight ||
          right < 0 ||
          left > renderer.domElement.clientWidth;

			if ( ! isOffscreen ) {

				const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
				renderer.setScissor( left, positiveYUpBottom, width, height );
				renderer.setViewport( left, positiveYUpBottom, width, height );

				fn( time, rect );

			}

		}

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

