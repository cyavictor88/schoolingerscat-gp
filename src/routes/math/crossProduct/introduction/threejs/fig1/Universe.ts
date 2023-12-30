import * as THREE from 'three';
import { TickingWorld } from './TickingWorld';
import EventEmitter from 'eventemitter3';
import { mathmesh } from '$lib/mathmesh/mathmesh';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector } from './object/Vector';
import { Line } from './object/Line';
import { Axes } from './object/Axes';
import type { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { MathText } from './object/MathText';
import { Theta } from './object/Theta';
import { Polygon2D } from './object/Polygon2D';
import { functionsIn } from 'lodash';

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


export class Universe {
  // export class World extends EventEmitter {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  eventBroker: EventEmitter;
  controls: OrbitControls;
  font!: Font;
  canvasSize = { w: 500, h: 400 };

  veca : Vector;
  vecb : Vector;
  vecCrossProduct: Vector;
  vecn: Vector;
  axes : Axes;

  fig4triangle: Polygon2D | null = null;

  constructor(refCurrent: HTMLDivElement) {
    this.eventBroker = new EventEmitter();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightblue');
    this.camera = this.initCamera();
    this.camera.position.set( 5.44, 18., 22 );

    // const mainLight = new THREE.PointLight('green', 2, 50);
    // mainLight.position.set(0, 5, 0);
    // this.scene.add(mainLight);

    const light = new THREE.AmbientLight( 0xffffff ); // soft white light
    this.scene.add( light );

    // const helper = new THREE.AxesHelper(10);
    // helper.position.set(0, 0, 0);
    // const ghelper = new THREE.GridHelper(10, 10);
    // ghelper.rotation.x = Math.PI / 2;
    // ghelper.position.set(0, 0, 0);
    // this.scene.add(ghelper);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true, //https://discourse.threejs.org/t/how-to-save-rendering-scene-to-img/41858/3
    });
    this.tickingWorld = new TickingWorld(this.camera, this.scene, this.renderer);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);
    refCurrent.appendChild(this.renderer.domElement);
    this.eventBroker.on("hello", (data) => { console.log(data) });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement );

    this.controls.update();

    // universe setup done

    // this.controls.addEventListener('change', () => {
    //   const cameraPosition = this.camera.position.clone();
    //   console.log('Camera Position:', cameraPosition);
    // });

    this.veca = new Vector(3,-2,3,0xff0000);
    this.vecb = new Vector(2,1,-2,0x0000ff);
    const cp = new THREE.Vector3().crossVectors(this.veca.coord,this.vecb.coord);
    this.vecCrossProduct = new Vector(cp.x,cp.y,cp.z,0xffff00);
    const n = cp.normalize();
    this.vecn = new Vector(n.x,n.y,n.z,0xff8000);

    this.scene.add(this.veca.vector);
    this.scene.add(this.vecb.vector);
    this.scene.add(this.vecCrossProduct.vector);
    this.scene.add(this.vecn.vector);
    this.axes = new Axes(this.scene,10,10,10);


    // const loader = new FontLoader();
    // loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    //   this.font = font;
    //   const d = new Line(this.veca.coord.toArray(),this.vecb.coord.toArray(),'brown',true);
    //   d.setText(this.font,'d');
    //   this.scene.add(d.lineMesh,d.textMesh!);

    //   // playing with updateable in tickingworld
    //   (d.textMesh as any).scaler = 1.1;
    //   (d.textMesh as any).cnt = 0;
    //   (d.textMesh as any).tick = function(delta:number){
    //     (d.textMesh as any).cnt += 1;
    //     (d.textMesh as any).cnt %= 5;
    //     if((d.textMesh as any).cnt>0) return
    //     const scale = d.textMesh!.scale.clone();
    //     if(scale.length()>2.5) (d.textMesh as any).scaler-=0.1;
    //     if(scale.length()<1.5) (d.textMesh as any).scaler+=0.1;
    //     d.textMesh!.scale.set(...scale.multiplyScalar((d.textMesh as any).scaler).toArray());
    //   }
    //   this.tickingWorld.updatables.push(d.textMesh);
    // });




    this.eventBroker.on('setMathMeshes',()=>{this.setMathMeshes()})

    this.eventBroker.on('showFig4Triangle',()=>{this.showFig4Triangle()});
    

  }

  showFig4Triangle(){
    if(!this.fig4triangle){
      this.fig4triangle = new Polygon2D([this.veca.coord,this.vecb.coord,new THREE.Vector3()],'lightgrey')
      this.scene.add(this.fig4triangle.mesh);
    } else {
      this.fig4triangle.mesh.visible = !this.fig4triangle.mesh.visible;
    }

  }

  async setMathMeshes(){
    const mathText = await MathText.Init('\\vec{a} \\\\ (a_x,a_y,a_z)','red');
    mathText.mesh.position.set(this.veca.coord.x, this.veca.coord.y, this.veca.coord.z);
    this.scene.add(mathText.mesh);

    const mathText2 = await MathText.Init('\\vec{b} \\\\ (b_x,b_y,b_z)','blue');
    mathText2.mesh.position.set(this.vecb.coord.x, this.vecb.coord.y, this.vecb.coord.z)
    this.scene.add(mathText2.mesh);

    const mathText3 = await MathText.Init('\\vec{a} \\times \\vec{b}','yellow');
    mathText3.mesh.position.set(this.vecCrossProduct.coord.x, this.vecCrossProduct.coord.y, this.vecCrossProduct.coord.z)
    this.scene.add(mathText3.mesh);

    const mathText4 = await MathText.Init('\\hat{n}','orange');
    mathText4.mesh.position.set(this.vecn.coord.x, this.vecn.coord.y, this.vecn.coord.z)
    this.scene.add(mathText4.mesh);

    const theta = await Theta.Init(this.veca.coord,this.vecb.coord);
    this.scene.add(theta.curveMesh);
    this.scene.add(theta.textMesh.mesh);


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
    const aspect = this.canvasSize.w / this.canvasSize.h;
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