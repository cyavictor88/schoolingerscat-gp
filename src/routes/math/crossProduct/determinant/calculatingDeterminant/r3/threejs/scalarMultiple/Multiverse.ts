import * as THREE from 'three';
import type { Universe } from './Universe';
import type EventEmitter from 'eventemitter3';

const clearColor = new THREE.Color( '#000' );
export interface Updatable {
  [key: string]: any;
  tick:(delta:number)=> void;
}

const clock = new THREE.Clock();
export interface IUniverse {
	htmlElement: HTMLDivElement | HTMLSpanElement;
  updatables: Updatable[];
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  eventBroker: EventEmitter;
}

export class Multiverse {
	universes: IUniverse[];
	renderer: THREE.WebGLRenderer;
  shows: boolean[];
	constructor(canvas: HTMLCanvasElement, universes: IUniverse[], shows: boolean[]){
		this.renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
		this.universes = universes;
    this.shows = shows;
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
    
        for ( const [uni,idx] of this.universes.map((uni,idx)=>([uni,idx])) ) {
          if(!this.shows[idx as number]) {       
            continue;
          }
					const universe = uni as IUniverse;
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


					// console.log('universe rect', rect)
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
        (object as Updatable).tick(delta);
      }
    }
  }
}


