import * as THREE from 'three';
import { TickingWorld } from './TickingWorld';
import { FreeDrawLines } from './object/FreeDrawLines';
import type EventEmitter from 'eventemitter3';
import { mathmesh } from '../../../util/mathmesh/mathmesh';
// import { mathmesh } from 'mathmesh';

interface Subscriber {
  notify(event: string, data: any): void;
}

// Define the dispatcher class
export class Dispatcher {
  private subscribers: Map<string, Subscriber[]>;

  constructor() {
    this.subscribers = new Map();
  }

  // Subscribe a subscriber to an event
  subscribe(event: string, subscriber: Subscriber) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }

    const eventSubscribers = this.subscribers.get(event);
    eventSubscribers?.push(subscriber);
  }

  // Unsubscribe a subscriber from an event
  unsubscribe(event: string, subscriber: Subscriber) {
    const eventSubscribers = this.subscribers.get(event);
    if (!eventSubscribers) {
      return;
    }

    const index = eventSubscribers.indexOf(subscriber);
    if (index !== -1) {
      eventSubscribers.splice(index, 1);
    }
  }

  // Dispatch an event to its subscribers
  dispatch(event: string, data: any) {
    const eventSubscribers = this.subscribers.get(event);
    if (!eventSubscribers) {
      return;
    }
    eventSubscribers.forEach((subscriber) => {
      subscriber.notify(event, data);
    });
  }
}


const canvasSize = { w: 1000, h: 600 };

export class World implements Subscriber{
// export class World extends EventEmitter {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  dispatcher: Dispatcher= new Dispatcher();
  eventBroker: EventEmitter;

  constructor(refCurrent:HTMLDivElement, eventBroker: EventEmitter){
    this.eventBroker = eventBroker;
      // super();
    this.scene = new THREE.Scene();
    this.scene.background =new THREE.Color('lightblue');
    this.camera = this.initCamera();
    const mainLight = new THREE.PointLight('green', 2, 50);
    mainLight.position.set(0, 5, 0);
    this.scene.add(mainLight);

    const helper = new THREE.AxesHelper(5);
    helper.position.set(-3.5, 0, 0);
    const ghelper = new THREE.GridHelper(10, 10);
    ghelper.rotation.x = Math.PI / 2;
    ghelper.position.set(0, 0, 0);
    this.scene.add(helper, ghelper);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true, //https://discourse.threejs.org/t/how-to-save-rendering-scene-to-img/41858/3
    });
    this.tickingWorld = new TickingWorld(this.camera, this.scene, this.renderer);
    this.renderer.render(this.scene,this.camera);
    this.renderer.setSize(canvasSize.w, canvasSize.h);

    refCurrent.appendChild(this.renderer.domElement);

    const freeDrawLines = new FreeDrawLines(this.scene,this.camera,canvasSize,refCurrent,this.eventBroker);

    this.dispatcher.subscribe("event1", this);
    this.dispatcher.subscribe("event2", this);
    this.dispatcher.dispatch("event1","qoo");

    this.eventBroker.on("hello",(data)=>{console.log(data)});



  }

async addMathMesh(){
    const mm = await mathmesh("\\int_{a}^{b}x^2 \\,dx \\frac{3}{4} \\vec{a}");
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute( 'position', new THREE.BufferAttribute( mm.vertices, 3 ) );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const mesh = new THREE.Mesh( geometry, material );
    this.scene.add(mesh);
}

  notify(event: string, data: any): void {
    console.log("notifying",event,data)
  }

    initCamera(){
        const aspect = canvasSize.w / canvasSize.h;
        const frustumSize = 10;
        const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 20);
        camera.position.z = 5;
        return camera;
    }

    start(){
        this.tickingWorld.start();
    }

    stop(){
        this.tickingWorld.stop();
    }

}