import * as THREE from 'three';
import { TickingWorld } from './TickingWorld';
import EventEmitter from 'eventemitter3';
import { mathmesh } from '$lib/mathmesh/mathmesh';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector } from './object/Vector';
import { Axes } from './object/Axes';
import { MathText } from './object/MathText';
import { Parallelepiped } from './object/Parallelepiped';
import { Plane } from './object/Plane';
import { Line } from './object/Line';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export enum Dir {
  X,
  Y,
  Z
}

export const unitVec = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
}

export class Universe {
  // export class World extends EventEmitter {
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  eventBroker: EventEmitter;
  controls: OrbitControls;
  canvasSize = { w: 500, h: 400 };

  veca: Vector;
  vecb: Vector;
  vecv: Vector;
  axes: Axes;

  zoomIn: boolean = false;
  scale: number = 1;

  timePass = 0;

  fps = 0;

  constructor(refCurrent: HTMLDivElement, veca: [number, number, number], vecb: [number, number, number], vecc: [number, number, number], zoomIn: boolean) {
    this.zoomIn = zoomIn;
    if (this.zoomIn) this.scale = 5;
    this.eventBroker = new EventEmitter();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightblue');
    this.camera = this.initCamera();
    if (!zoomIn) {
      this.camera.position.set(5.44, 18., 22);
      this.camera.position.set(0, 18., 0);
      this.camera.zoom = 2.06;
      this.camera.updateProjectionMatrix()
    } else {
      this.camera.position.set(5.44, 18., 22);
      this.camera.position.set(5, 5, 5);
      this.camera.zoom = 2.06;
      this.camera.updateProjectionMatrix()
    }

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true, //https://discourse.threejs.org/t/how-to-save-rendering-scene-to-img/41858/3
    });
    this.tickingWorld = new TickingWorld(this.camera, this.scene, this.renderer);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);
    refCurrent.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.update();

    // universe setup done

    // this.controls.addEventListener('change', () => {
    //   const cameraPosition = this.camera.position.clone();

    //   console.log('Camera Position:', cameraPosition,this.camera.zoom);
    // });
    const plane = new Plane(this.scene, [0, 0, 0], 18, 18, new THREE.Vector3(1, 0, 0));
    plane.mesh.visible = false;

    if (!zoomIn) {
      this.veca = new Vector(...veca, 0xff0000);
      this.vecb = new Vector(...vecb, 0x0000ff);
      this.vecv = new Vector(...vecc, 0x008800);
    } else {
      this.veca = new Vector(veca[0] * this.scale, veca[1] * this.scale, veca[2] * this.scale, 0xff0000);
      this.vecb = new Vector(vecb[0] * this.scale, vecb[1] * this.scale, vecb[2] * this.scale, 0x0000ff);
      this.vecv = new Vector(vecc[0] * this.scale, vecc[1] * this.scale, vecc[2] * this.scale, 0x008800);
    }


    // this.vecvrossProduct = new Vector(cp.x,cp.y,cp.z,0xff0000);

    this.scene.add(this.veca.vector);
    this.scene.add(this.vecb.vector);
    this.scene.add(this.vecv.vector);
    this.axes = this.zoomIn ? new Axes(this, 10, 10, 10, this.scale) : new Axes(this, 10, 10, 10, 1);

    const pp = new Parallelepiped(this.scene, this.veca.coord, this.vecb.coord, this.vecv.coord);

    this.eventBroker.on('setMathMeshes', () => { this.setMathMeshes() });
    this.eventBroker.on('setRightHand', () => { this.setRightHand() });
  }



  async setRightHand() {
    const gltfLoader = new GLTFLoader();

    const loadedData = await gltfLoader.loadAsync('/glbs/rightHand2.glb');
    // console.log(loadedData)
    const model = loadedData.scene.children[0];
    model.position.set(0, 0, 0);
    const [veca, vecb] = [new THREE.Vector3(), new THREE.Vector3()];
    veca.copy(this.veca.coord);
    vecb.copy(this.vecb.coord);
    const cross = new THREE.Vector3().crossVectors(veca, vecb);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), cross.normalize());
    const quat1 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.acos(new THREE.Vector3(0, 1, 0).dot(veca.normalize())));
    quat.multiply(quat1);
    model.applyQuaternion(quat);

    if (!this.zoomIn) {
      model.scale.set(0.1, 0.1, 0.1);
    } else {
      model.scale.set(0.1, 0.1, 0.1);
    }
    model.visible = true;


    const clip = loadedData.animations[0];

    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();


    (model as any).tick = (delta: number) => {
      this.fps = 1/(delta);
      this.eventBroker.emit('fps',this.fps.toFixed())
      if(this.fps>120) mixer.update(delta*10)
      else mixer.update(delta)

    }


    this.scene.add(model);
    this.tickingWorld.updatables.push(model);
  }

  async setMathMeshes() {
    const scale = this.scale;
    const mathTexta = await MathText.Init(`\\vec{v_1}=(${this.veca.coord.x / scale},${this.veca.coord.y / scale},${this.veca.coord.z / scale}) `, 'red');
    mathTexta.mesh.position.set(this.veca.coord.x, this.veca.coord.y, this.veca.coord.z);
    this.scene.add(mathTexta.mesh);

    const mathTextb = await MathText.Init(`\\vec{v_2}=(${this.vecb.coord.x / scale},${this.vecb.coord.y / scale},${this.vecb.coord.z / scale}) `, 'blue');
    mathTextb.mesh.position.set(this.vecb.coord.x, this.vecb.coord.y, this.vecb.coord.z)
    this.scene.add(mathTextb.mesh);

    const mathTextv = await MathText.Init(`\\vec{v_3}=(${this.vecv.coord.x / scale},${this.vecv.coord.y / scale},${this.vecv.coord.z / scale})`, 'green');
    mathTextv.mesh.position.set(this.vecv.coord.x, this.vecv.coord.y, this.vecv.coord.z)
    this.scene.add(mathTextv.mesh);
  }


  initCamera() {
    const aspect = this.canvasSize.w / this.canvasSize.h;

    const frustumSize = 40;
    const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 40);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    return camera;
  }

  start() {
    this.tickingWorld.start();
  }

  stop() {
    this.tickingWorld.stop();
  }

}