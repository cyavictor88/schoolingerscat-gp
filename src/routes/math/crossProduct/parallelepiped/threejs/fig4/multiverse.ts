import * as THREE from 'three';
import type { Universe } from './Universe';
import { TickingVerse } from './TickingVerse';

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

