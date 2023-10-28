import * as THREE from 'three';
import type { Universe } from './Universe';
import { TickingVerse, type Updatable } from './TickingVerse';
import type EventEmitter from 'eventemitter3';

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


