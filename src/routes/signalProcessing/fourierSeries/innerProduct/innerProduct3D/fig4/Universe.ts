import * as THREE from 'three';
import { TickingWorld } from './TickingWorld';
import type EventEmitter from 'eventemitter3';
import { mathmesh } from '$lib/mathmesh/mathmesh';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { mathmesh } from 'mathmesh';


const canvasSize = { w: 400, h: 300 };

export class Universe {
  // export class World extends EventEmitter {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  eventBroker: EventEmitter;
  controls: OrbitControls;

  constructor(refCurrent: HTMLDivElement, eventBroker: EventEmitter) {

    this.eventBroker = eventBroker;
    // super();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightblue');
    this.camera = this.initCamera();
    const mainLight = new THREE.PointLight('green', 2, 50);
    mainLight.position.set(0, 5, 0);
    this.scene.add(mainLight);

    const helper = new THREE.AxesHelper(10);
    helper.position.set(0, 0, 0);
    const ghelper = new THREE.GridHelper(10, 10);
    ghelper.rotation.x = Math.PI / 2;
    ghelper.position.set(0, 0, 0);
    this.scene.add(helper);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true, //https://discourse.threejs.org/t/how-to-save-rendering-scene-to-img/41858/3
    });
    this.tickingWorld = new TickingWorld(this.camera, this.scene, this.renderer);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(canvasSize.w, canvasSize.h);
    refCurrent.appendChild(this.renderer.domElement);
    this.eventBroker.on("hello", (data) => { console.log(data) });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement );
    this.camera.position.set( 2, 6, 10 );
    this.controls.update();



    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(-2,4,4);
    this.scene.add(sphere);
    
    // Create line geometry
    const points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(2, 4, 4));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create line material
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the line
    const line = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(line);

    // Create arrowhead geometry
    const arrowheadGeometry = new THREE.ConeGeometry(0.1, 0.3, 10);
    const arrowheadMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const arrowhead = new THREE.Mesh(arrowheadGeometry, arrowheadMaterial);
    arrowhead.position.copy(points[1]);
    const direction = new THREE.Vector3();
    direction.subVectors(points[1], points[0]).normalize();
    arrowhead.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); //using (0,1,0) because cone initally is pointing (0,1,0)

    this.scene.add(arrowhead);



  }

  async addMathMesh() {
    const mm = await mathmesh("\\int_{a}^{b}x^2 \\,dx \\frac{3}{4} \\vec{a}");
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(mm.vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, side:THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }



  initCamera() {
    const aspect = canvasSize.w / canvasSize.h;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 20);
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3(0,0,0))
    return camera;
  }

  start() {
    this.tickingWorld.start();
  }

  stop() {
    this.tickingWorld.stop();
  }

}