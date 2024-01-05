import * as THREE from 'three';


interface SceneInfo {
  scene: THREE.Scene;
  camera: THREE.Camera;
  elem: HTMLElement;
  mesh?: THREE.Mesh;
}

export function try2(canvas: HTMLCanvasElement, boxElem: HTMLSpanElement, pyramidElem:HTMLSpanElement) {

	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );

	function makeScene( elem :HTMLElement):SceneInfo {

		const scene = new THREE.Scene();

		const fov = 45;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 5;
		const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
		camera.position.set( 0, 1, 2 );
		camera.lookAt( 0, 0, 0 );

		{

			const color = 0xFFFFFF;
			const intensity = 3;
			const light = new THREE.DirectionalLight( color, intensity );
			light.position.set( - 1, 2, 4 );
			scene.add( light );

		}

		return { scene, camera, elem};

	}

	function setupScene1( elem :HTMLElement) {

		const sceneInfo = makeScene(elem );
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshPhongMaterial( { color: 'red' } );
		const mesh = new THREE.Mesh( geometry, material );
		sceneInfo.scene.add( mesh );
		sceneInfo.mesh = mesh;
		return sceneInfo;

	}

	function setupScene2( elem :HTMLElement) {

		const sceneInfo = makeScene( elem);
		const radius = .8;
		const widthSegments = 4;
		const heightSegments = 2;
		const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
		const material = new THREE.MeshPhongMaterial( {
			color: 'blue',
			flatShading: true,
		} );
		const mesh = new THREE.Mesh( geometry, material );
		sceneInfo.scene.add( mesh );
		sceneInfo.mesh = mesh;
		return sceneInfo;

	}

	const sceneInfo1 = setupScene1(boxElem);
	const sceneInfo2 = setupScene2(pyramidElem);

	function resizeRendererToDisplaySize( renderer : THREE.Renderer) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function renderSceneInfo( sceneInfo: { scene: any; camera: any; elem: any; mesh?: {}; } ) {

		const { scene, camera, elem } = sceneInfo;

		// get the viewport relative position of this element
		const { left, right, top, bottom, width, height } =
        elem.getBoundingClientRect();

		const isOffscreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        left > renderer.domElement.clientWidth;

		if ( isOffscreen ) {

			return;

		}

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
		renderer.setScissor( left, positiveYUpBottom, width, height );
		renderer.setViewport( left, positiveYUpBottom, width, height );

		renderer.render( scene, camera );

	}

	function render( time: number ) {

		time *= 0.001;

		resizeRendererToDisplaySize( renderer );

		renderer.setScissorTest( false );
		renderer.clear( true, true );
		renderer.setScissorTest( true );

		sceneInfo1.mesh!.rotation.y = time * .1;
		sceneInfo2.mesh!.rotation.y = time * .1;

		renderSceneInfo( sceneInfo1 );
		renderSceneInfo( sceneInfo2 );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

