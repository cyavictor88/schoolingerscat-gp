import * as THREE from 'three';
import { TickingWorld } from './TickingWorld';
import EventEmitter from 'eventemitter3';
import { mathmesh } from '$lib/mathmesh/mathmesh';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector } from './object/Vector';
import { Line } from './object/Line';
import { Axes } from './object/Axes';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
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


export class Universe extends THREE.EventDispatcher {
  // export class World extends EventEmitter {
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  // eventBroker: EventEmitter;
  controls: OrbitControls;
  font!: Font;
  canvasSize = { w: 500, h: 400 };

  veca : Vector;
  vecb : Vector;
  axes : Axes;

  focusTriangle: Polygon2D | null = null;
  focusTriangleLine1: Line | null = null;
  focusTriangleLine2: Line | null = null;

  leg2: Line | null = null;
  leg1: Line | null = null;

  thirdPoint: THREE.Vector3 | null = null;
  constructor(refCurrent: HTMLDivElement) {
    super();
    // this.eventBroker = new EventEmitter();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightblue');
    this.camera = this.initCamera();
    this.camera.position.set( 0,0, 20 );
    this.camera.zoom = 2;
    this.camera.updateProjectionMatrix();

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
    this.addEventListener("hello", (data) => { console.log(data) });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement );

    this.controls.update();

    // universe setup done

    // this.controls.addEventListener('change', () => {
    //   const cameraPosition = this.camera.position.clone();
    //   console.log('Camera Position:', cameraPosition,this.camera.zoom);
    // });

    this.veca = new Vector(9,-4,0,0xff0000);
    this.vecb = new Vector(4,8,0,0x0000ff);
    this.scene.add(this.veca.vector);
    this.scene.add(this.vecb.vector);
    this.axes = new Axes(this.scene,10,10,10);


    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      const d = new Line(this.veca.coord.toArray(),this.vecb.coord.toArray(),'brown',true);
      d.setText(this.font,'d');
      this.scene.add(d.lineMesh,d.textMesh!);

      // playing with updateable in tickingworld
      // (d.textMesh as any).scaler = 1.1;
      // (d.textMesh as any).cnt = 0;
      // (d.textMesh as any).tick = function(delta:number){
      //   (d.textMesh as any).cnt += 1;
      //   (d.textMesh as any).cnt %= 5;
      //   if((d.textMesh as any).cnt>0) return
      //   const scale = d.textMesh!.scale.clone();
      //   if(scale.length()>2.5) (d.textMesh as any).scaler-=0.1;
      //   if(scale.length()<1.5) (d.textMesh as any).scaler+=0.1;
      //   d.textMesh!.scale.set(...scale.multiplyScalar((d.textMesh as any).scaler).toArray());
      // }
      // this.tickingWorld.updatables.push(d.textMesh);
    });




    this.addEventListener('setMathMeshes',()=>{this.setMathMeshes()})

    this.addEventListener('showFocusTriangle',()=>{this.showFocusTriangle()});
    this.addEventListener('showLeg2',()=>{this.showLeg2()});
    this.addEventListener('showLeg1',()=>{this.showLeg1()});

  }

  // showFocusTriangle(){
  //   if(!this.focusTriangle){
  //     this.focusTriangle = new Polygon2D([this.veca.coord,this.vecb.coord,new THREE.Vector3()],'lightgrey')
  //     this.scene.add(this.focusTriangle.mesh);
  //   } else {
  //     this.focusTriangle.mesh.visible = !this.focusTriangle.mesh.visible;
  //   }

  // }

  showFocusTriangle(){
    if(!this.focusTriangle){
      // simple method
      let thirdPoint = new THREE.Vector3();
      thirdPoint= new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z);
      this.thirdPoint = thirdPoint;

      this.focusTriangle = new Polygon2D([this.veca.coord,this.vecb.coord,thirdPoint],'brown')
      this.scene.add(this.focusTriangle.mesh);
      } else {
        this.focusTriangle.mesh.visible = !this.focusTriangle.mesh.visible;
      }
  }

  showLeg2(){
    if(!this.leg2){
      let thirdPoint = new THREE.Vector3();
      thirdPoint= new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z);
      this.thirdPoint = thirdPoint;
      this.leg2 = new Line([...this.vecb.coord.toArray()],[...thirdPoint.toArray()],'black') 
      this.leg2.setText(this.font!,'leg2');
      this.scene.add(this.leg2.lineMesh,this.leg2.textMesh!);
    } else {
      this.leg2.lineMesh.visible = !this.leg2.lineMesh.visible;
      this.leg2.textMesh!.visible = !this.leg2.textMesh!.visible;
    }
  }
  showLeg1(){
    if(!this.leg1){
      let thirdPoint = new THREE.Vector3();
      thirdPoint= new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z);
      this.thirdPoint = thirdPoint;
      this.leg1 = new Line([...this.veca.coord.toArray()],[...thirdPoint.toArray()],'black') 
      this.leg1.setText(this.font!,'Leg1');
      this.scene.add(this.leg1.lineMesh,this.leg1.textMesh!);
    } else {
      this.leg1.lineMesh.visible = !this.leg1.lineMesh.visible;
      this.leg1.textMesh!.visible = !this.leg1.textMesh!.visible;
    }
  }




  async setMathMeshes(){
    const mathText = await MathText.Init('\\vec{a} \\\\ (a_x,a_y,0)','red');
    mathText.mesh.position.set(this.veca.coord.x, this.veca.coord.y, this.veca.coord.z);
    this.scene.add(mathText.mesh);

    const mathText2 = await MathText.Init('\\vec{b} \\\\ (b_x,b_y,0)','blue');
    mathText2.mesh.position.set(this.vecb.coord.x, this.vecb.coord.y, this.vecb.coord.z)
    this.scene.add(mathText2.mesh);



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
    const frustumSize = 50;
    const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 100);
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