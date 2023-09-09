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

  focusTriangle3D: Polygon2D | null = null;
  leg3D_2: Line | null = null;
  leg3D_1: Line | null = null;


  focusTriangle2D: Polygon2D | null = null;
  leg2D_2: Line | null = null;
  leg2D_1: Line | null = null;


  thirdPoint2D: THREE.Vector3 | null = null;
  thirdPoint3D: THREE.Vector3 | null = null;
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

    this.controls.addEventListener('change', () => {
      const cameraPosition = this.camera.position.clone();
      console.log('Camera Position:', cameraPosition,this.camera.zoom);
    });

    this.veca = new Vector(9,-4,8,0xff0000);
    this.vecb = new Vector(4,8,-5,0x0000ff);
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

    this.addEventListener('showFocusTriangle3D',()=>{this.showFocusTriangle3D()});
    this.addEventListener('showLeg3D_2',()=>{this.showLeg3D_2()});
    this.addEventListener('showLeg3D_1',()=>{this.showLeg3D_1()});

    this.addEventListener('showFocusTriangle2D',()=>{this.showFocusTriangle2D()});
    this.addEventListener('showLeg2D_2',()=>{this.showLeg2D_2()});
    this.addEventListener('showLeg2D_1',()=>{this.showLeg2D_1()});


  }

  showFocusTriangle2D(){
    if(!this.focusTriangle2D){
      // simple method

      // this.thirdPoint2D = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z);
      // this.thirdPoint3D = new THREE.Vector3(this.veca.coord.x,this.veca.coord.y,this.vecb.coord.z);

      this.thirdPoint2D = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.veca.coord.z);
      this.thirdPoint3D= new THREE.Vector3(this.vecb.coord.x,this.vecb.coord.y,this.veca.coord.z);

      this.focusTriangle2D = new Polygon2D([this.thirdPoint3D,this.veca.coord,this.thirdPoint2D],'yellow')
      this.scene.add(this.focusTriangle2D.mesh);
      this.ressetCamera();

      } else {
        this.focusTriangle2D.mesh.visible = !this.focusTriangle2D.mesh.visible;
      if(this.focusTriangle2D.mesh.visible) this.ressetCamera();

      }
  }

  showFocusTriangle3D(){
    if(!this.focusTriangle3D){
      // simple method

      this.thirdPoint2D = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.veca.coord.z);
      this.thirdPoint3D= new THREE.Vector3(this.vecb.coord.x,this.vecb.coord.y,this.veca.coord.z);

      this.focusTriangle3D = new Polygon2D([this.veca.coord,this.vecb.coord,this.thirdPoint3D],'brown')
      this.scene.add(this.focusTriangle3D.mesh);
      this.ressetCamera(5.6,2.7,19);

      } else {
        this.focusTriangle3D.mesh.visible = !this.focusTriangle3D.mesh.visible;
      if(this.focusTriangle3D.mesh.visible) this.ressetCamera(5.6,2.7,19);

      }

      if(this.focusTriangle3D && this.focusTriangle3D.mesh.visible) {
        this.showFocusTriangle2D();
        this.focusTriangle2D!.mesh.visible=true;
        this.showLeg2D_1();
        this.leg2D_1!.lineMesh.visible=true;
        this.leg2D_1!.textMesh!.visible=true;
        this.showLeg2D_2();
        this.leg2D_2!.lineMesh.visible=true;
        this.leg2D_2!.textMesh!.visible=true;
        this.showLeg3D_1();
        this.leg3D_1!.lineMesh.visible=true;
        this.leg3D_1!.textMesh!.visible=true;
        this.showLeg3D_2();
        this.leg3D_2!.lineMesh.visible=true;
        this.leg3D_2!.textMesh!.visible=true;
        this.ressetCamera(5.6,2.7,19);
      }
  }

  showLeg3D_2(){
    if(!this.leg3D_2){
      this.thirdPoint2D = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.veca.coord.z);
      this.thirdPoint3D= new THREE.Vector3(this.vecb.coord.x,this.vecb.coord.y,this.veca.coord.z);
      this.leg3D_2 = new Line([...this.vecb.coord.toArray()],[...this.thirdPoint3D.toArray()],'black') 
      this.leg3D_2.setText(this.font!,'Brown Leg2');
      this.scene.add(this.leg3D_2.lineMesh,this.leg3D_2.textMesh!);
      this.ressetCamera(5.6,2.7,19);

    } else {
      this.leg3D_2.lineMesh.visible = !this.leg3D_2.lineMesh.visible;
      this.leg3D_2.textMesh!.visible = !this.leg3D_2.textMesh!.visible;

      if(this.leg3D_2.lineMesh.visible) this.ressetCamera(5.6,2.7,19);
    }
  }

  showLeg2D_2(){
    if(!this.leg2D_2){
      this.thirdPoint2D = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.veca.coord.z);
      this.thirdPoint3D= new THREE.Vector3(this.vecb.coord.x,this.vecb.coord.y,this.veca.coord.z);
      this.leg2D_2 = new Line([...this.thirdPoint3D.toArray()],[...this.thirdPoint2D.toArray()],'black') 
      this.leg2D_2.setText(this.font!,'Yellow Leg2','yellow');
      this.leg2D_2.textMesh?.position.setY(this.leg2D_2.textMesh?.position.y+1);

      this.scene.add(this.leg2D_2.lineMesh,this.leg2D_2.textMesh!);
      this.ressetCamera();

    } else {
      this.leg2D_2.lineMesh.visible = !this.leg2D_2.lineMesh.visible;
      this.leg2D_2.textMesh!.visible = !this.leg2D_2.textMesh!.visible;

      if(this.leg2D_2.lineMesh.visible) this.ressetCamera();
    }
  }


  showLeg2D_1(){
    if(!this.leg2D_1){

      this.thirdPoint2D = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.veca.coord.z);
      this.thirdPoint3D= new THREE.Vector3(this.vecb.coord.x,this.vecb.coord.y,this.veca.coord.z);

      this.leg2D_1 = new Line([...this.veca.coord.toArray()],[...this.thirdPoint2D.toArray()],'black');
      this.leg2D_1.setText(this.font!,'Yellow Leg1','yellow');
      this.scene.add(this.leg2D_1.lineMesh,this.leg2D_1.textMesh!);
      this.ressetCamera();
    } else {
      this.leg2D_1.lineMesh.visible = !this.leg2D_1.lineMesh.visible;
      this.leg2D_1.textMesh!.visible = !this.leg2D_1.textMesh!.visible;
      if(this.leg2D_1.lineMesh.visible) this.ressetCamera();

    }
  }

  showLeg3D_1(){
    if(!this.leg3D_1){

      this.thirdPoint2D = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.veca.coord.z);
      this.thirdPoint3D= new THREE.Vector3(this.vecb.coord.x,this.vecb.coord.y,this.veca.coord.z);

      this.leg3D_1 = new Line([...this.veca.coord.toArray()],[...this.thirdPoint3D.toArray()],'black');
      this.leg3D_1.setText(this.font!,'Brown Leg1');
      this.leg3D_1.textMesh?.position.setY(this.leg3D_1.textMesh?.position.y-1);

      this.scene.add(this.leg3D_1.lineMesh,this.leg3D_1.textMesh!);
      this.ressetCamera(5.6,2.7,19);
    } else {
      this.leg3D_1.lineMesh.visible = !this.leg3D_1.lineMesh.visible;
      this.leg3D_1.textMesh!.visible = !this.leg3D_1.textMesh!.visible;
      if(this.leg3D_1.lineMesh.visible) this.ressetCamera(5.6,2.7,19);

    }
  }

  ressetCamera(x?:number,y?:number,z?:number){
    if(!x && !y && !z)
    this.camera!.position.set( 0,0, 20 );
    else
    this.camera!.position.set(x!,y!,z!);

    this.camera!.zoom = 2;
    this.camera!.lookAt(new THREE.Vector3());
    this.camera!.updateProjectionMatrix();
  }




  async setMathMeshes(){
    const mathText = await MathText.Init('\\vec{a} \\\\ (a_x,a_y,a_z)','red');
    mathText.mesh.position.set(this.veca.coord.x, this.veca.coord.y, this.veca.coord.z);
    this.scene.add(mathText.mesh);

    const mathText2 = await MathText.Init('\\vec{b} \\\\ (b_x,b_y,b_z)','blue');
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