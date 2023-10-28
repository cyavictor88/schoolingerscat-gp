import * as THREE from 'three';
import type { Universe } from './Universe';

const clearColor = new THREE.Color( '#000' );

const clock = new THREE.Clock();



export interface SceneHTMLElement {
  elem: HTMLElement;
  // fn: any;
	rect: DOMRect;
}
export class TickingVerse {
  // camera: THREE.Camera;
  // scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  universes: Universe[];
  // updatables: any[];
  constructor(renderer: THREE.WebGLRenderer, universes: Universe[]) {
    this.universes = universes;
    this.renderer = renderer;
    // this.camera = camera;
    // this.scene = scene;
    // this.renderer = renderer;
    // this.updatables = [];
  }

	resizeRendererToDisplaySize() {

		const canvas = this.renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			this.renderer.setSize( width, height, false );

		}

		return needResize;

	}

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

        this.renderer.setScissorTest( false );
        this.renderer.setClearColor( clearColor, 0 );
        this.renderer.clear( true, true );
        this.renderer.setScissorTest( true );
    
        // const transform = `translateY(${window.scrollY}px)`;
        // renderer.domElement.style.transform = transform;	
    
        for ( const universe of this.universes ) {
    
          // get the viewport relative position of this element
          // const rect = elem.getBoundingClientRect();
          const { left, right, top, bottom, width, height } = rect;
          // console.log('rect',rect)
          // console.log('canvas rect',canvas.getBoundingClientRect());
    
          const isOffscreen =
              bottom < 0 ||
              top > this.renderer.domElement.clientHeight ||
              right < 0 ||
              left > this.renderer.domElement.clientWidth;
    
          if ( ! isOffscreen ) {
    
            const positiveYUpBottom = this.renderer.domElement.clientHeight - bottom;
            this.renderer.setScissor( left, positiveYUpBottom, width, height );
            this.renderer.setViewport( left, positiveYUpBottom, width, height );
    
            // fn( time, rect );
            this.tick()
            this.renderer.render(universe.scene, universe.camera);
    
          }
    
        }
    



    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      (object as any).tick(delta);
    }
  }
}

