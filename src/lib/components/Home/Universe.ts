import * as THREE from 'three';
import { TickingWorld } from './TickingWorld';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MathText } from './MathText';

// import { mathmesh } from 'mathmesh';


export enum Dir {
  X,
  Y,
  Z
}

export const unitVec = {
  x: new THREE.Vector3(1,0,0),
  y: new THREE.Vector3(0,1,0),
  z: new THREE.Vector3(0,0,1),
}

const canvasSize = { w: 500, h: 50 };

export class Universe extends THREE.EventDispatcher{
  // export class World extends EventEmitter {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  canvasSize = canvasSize;

  mathText!: MathText;

  constructor(refCurrent: HTMLDivElement) {
    super();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightblue');
    this.camera = this.initCamera();
    this.camera.position.set( 80,5,10 );

    const light = new THREE.AmbientLight( 0xffffff ); // soft white light
    this.scene.add( light );


    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true, //https://discourse.threejs.org/t/how-to-save-rendering-scene-to-img/41858/3
    });
    this.tickingWorld = new TickingWorld(this.camera, this.scene, this.renderer);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(canvasSize.w, canvasSize.h);
    refCurrent.appendChild(this.renderer.domElement);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement );

    // this.controls.update();


    this.addEventListener('setMathMeshes',()=>{this.setMathMeshes()})



  }


  async setMathMeshes(){
    const mathText = await MathText.Init('schoolingerscat @ g\\Mu \\alpha \\iota \\lfloor \\cdot \\subset \\varnothing \\Mu','blue');
    mathText.mesh.position.set(0,0,0);
    mathText.mesh.scale.set(10,10,10);
    this.scene.add(mathText.mesh);
    this.mathText=mathText;
    (mathText.mesh as any).scaler = 10.1;
    (mathText.mesh as any).cnt = 0;
    (mathText.mesh as any).tick = function(delta:number){
      (mathText.mesh as any).scaler += 0.01;
      (mathText.mesh as any).scaler %= 2.5 ;
      // (mathText.mesh as any).scaler += 1 ;
      // if((mathText.mesh as any).cnt>1) return
      let scale = new THREE.Vector3( (mathText.mesh as any).scaler,(mathText.mesh as any).scaler,(mathText.mesh as any).scaler );
      scale.addVectors(scale, new THREE.Vector3(2,2,2))
      // if(scale.length()>10.5) (mathText.mesh as any).scaler-=0.1;
      // if(scale.length()<10.2) (mathText.mesh as any).scaler+=0.1;
      mathText.mesh.scale.set(...scale.multiplyScalar((mathText.mesh as any).scaler).toArray());
    }
    this.tickingWorld.updatables.push(mathText.mesh);
  }

  initCamera() {
    const aspect = canvasSize.w / canvasSize.h;
    const frustumSize = 20;
    const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 40);
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