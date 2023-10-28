import * as THREE from 'three';
import type { Universe } from './Universe';

const clearColor = new THREE.Color( '#000' );

const clock = new THREE.Clock();

interface AnyProperties {
  [prop: string]: any
}

// export type Updatable = AnyProperties & {
//   tick:()=> void;
// }

export interface Updatable {
  [key: string]: any;
  tick:()=> void;
}

export class Multiverse {
	universes: Universe[];
	renderer: THREE.WebGLRenderer;
	tickingVerse: TickingVerse;
	constructor(canvas: HTMLCanvasElement, universes: Universe[]){
		this.renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
		this.universes = universes;
		this.tickingVerse = new TickingVerse(this.renderer,universes);
	}
	start(){
		this.tickingVerse.start();
	}
}




export class TickingVerse {
  renderer: THREE.WebGLRenderer;
  universes: Universe[];
  constructor(renderer: THREE.WebGLRenderer, universes: Universe[]) {
    this.universes = universes;
    this.renderer = renderer;
    this.renderer.setPixelRatio( window.devicePixelRatio );
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
        this.resizeRendererToDisplaySize(  );

        this.renderer.setScissorTest( false );
        this.renderer.setClearColor( clearColor, 0 );
        this.renderer.clear( true, true );
        this.renderer.setScissorTest( true );
    
        // const transform = `translateY(${window.scrollY}px)`;
        // renderer.domElement.style.transform = transform;	
    
        for ( const universe of this.universes ) {
          const rect :DOMRect = {
            height: universe.htmlElement.offsetHeight,
            width: universe.htmlElement.offsetWidth,
            left: universe.htmlElement.offsetLeft,
            top: universe.htmlElement.offsetTop,
            right: universe.htmlElement.offsetLeft+universe.htmlElement.offsetWidth ,
            bottom:universe.htmlElement.offsetTop+universe.htmlElement.offsetHeight,
            x:0,
            y:0,
            toJSON: ()=>{},
          }
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
    for( const universe of this.universes){
      for (const object of universe.updatables) {
        (object as any).tick(delta);
      }
    }
  }
}

