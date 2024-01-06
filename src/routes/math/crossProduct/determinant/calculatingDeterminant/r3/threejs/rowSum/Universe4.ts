import * as THREE from 'three';
import EventEmitter from 'eventemitter3';
import { mathmesh } from '$lib/mathmesh/mathmesh';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector } from './object/Vector';
import { Axes } from './object/Axes';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { MathText } from './object/MathText';
import { Parallelepiped } from './object/Parallelepiped';
import TWEEN from '@tweenjs/tween.js';
import { Line } from './object/Line';
import type {Updatable } from './TickingVerse';
import type { IUniverse } from './Multiverse';
import * as mj from 'mathjs';
import { Plane } from './object/Plane';


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

export class Universe4 implements IUniverse {
  // export class World extends EventEmitter {
  htmlElement: HTMLDivElement | HTMLSpanElement;
  updatables: Updatable[];
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  eventBroker: EventEmitter;
  
  font!: Font;
  canvasSize = { w: 500, h: 400 };

  vecb : Vector;
  vecv: Vector;
  vecbPrime: Vector;
  axes : Axes;

  vecaHeightLine: Line;

  controls: OrbitControls;
  vecv_vecb_plane: Plane;

  constructor(refCurrent: HTMLSpanElement, v?: number[],b?:number[], bPrime?:number[]) {
    this.htmlElement = refCurrent;
    this.updatables = [];
    this.eventBroker = new EventEmitter();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightblue');
    this.camera = this.initCamera();

    this.controls = new OrbitControls(this.camera, this.htmlElement );

    this.controls.update();


    const light = new THREE.AmbientLight( 0xffffff ); // soft white light
    this.scene.add( light );


    this.eventBroker.on("hello", (data) => { console.log(data) });


    this.vecb = b? new Vector(b[0],b[1],b[2],0x0000ff):  new Vector(0,0,5,0x0000ff);
    this.vecv = v? new Vector(v[0],v[1],v[2],0xff0000):  new Vector(-4,4,-2,0xff0000);

    const vecb = b ?? [0,0,5];
    const vecv = v ?? [-4,4,-2];


    // this.vecvrossProduct = new Vector(cp.x,cp.y,cp.z,0xff0000);
    this.vecbPrime = bPrime ? new Vector(bPrime[0],bPrime[1],bPrime[2],'purple'):  new Vector(-4,4,-2,0xff0000);

    const normvb = mj.cross(vecv,vecb) as [number,number,number];
    this.vecv_vecb_plane = new Plane(this.scene,[0,0,0],18,18, new THREE.Vector3().fromArray(normvb as number[]));

    this.camera.position.set( ...normvb );
    this.camera.lookAt(0,0,0);

    this.scene.add(this.vecb.vector);
    this.scene.add(this.vecv.vector);
    if(bPrime)this.scene.add(this.vecbPrime.vector);
    
    this.axes = new Axes(this,10,10,10);
    this.vecaHeightLine = new Line([this.vecv.coord.x,0,this.vecv.coord.z],this.vecv.coord.toArray() , 'red',true);
    this.scene.add(this.vecaHeightLine.lineMesh);
    this.vecaHeightLine.lineMesh.visible=false;
    


    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      this.vecaHeightLine.setText(font,'V1', new THREE.Vector3(this.vecv.coord.x/2, 0,this.vecv.coord.z)  );
      this.scene.add(this.vecaHeightLine.textMesh!);
      this.vecaHeightLine.textMesh!.visible=false;

  


    });



    this.eventBroker.on('toggleShowHeight',()=>{
      // plane.mesh.visible = false;
      this.vecaHeightLine.lineMesh.visible=true;
      this.vecaHeightLine.textMesh!.visible=true;
      const duration = 1000;
      const cameraPodTween = new TWEEN.Tween(this.camera.position)
      .to( new THREE.Vector3().fromArray(this.vecbPrime.coord.toArray()).multiplyScalar(2), duration)
      .easing(TWEEN.Easing.Quadratic.Out) // You can choose a different easing function
      .onUpdate(() => {
        this.camera.lookAt(new THREE.Vector3());
        this.camera.updateProjectionMatrix();
        this.vecaHeightLine.textMesh!.lookAt(this.camera.position)

      })
      .start()
      .onComplete(() => {
        // Animation is complete
        this.camera.lookAt(new THREE.Vector3());
        // this.camera.rotation.set(0,0,0);
      });

      // const zoomProp = {zoom:1}
      // const cameraZoomTween = new TWEEN.Tween(zoomProp)
      // .to({zoom: 0.8},duration)
      // .easing(TWEEN.Easing.Quadratic.Out) // You can choose a different easing function
      // .onUpdate((val) => {
      //   this.camera.zoom = val.zoom;
      //   this.camera.updateProjectionMatrix();
      // })
      // .start()
      // .onComplete(() => {
      //   // Animation is complete
      //   console.log('zoom tween complete');
      // });
    });


    this.eventBroker.on('focusPlanVecvVecb',()=>{
      // plane.mesh.visible = !plane.mesh.visible;
      this.vecaHeightLine.lineMesh.visible=false;
      this.vecaHeightLine.textMesh!.visible=false;

      const duration = 1000;
      const cameraPodTween = new TWEEN.Tween(this.camera.position)
      .to(new THREE.Vector3(20,0,0), duration)
      .easing(TWEEN.Easing.Quadratic.Out) // You can choose a different easing function
      .onUpdate(() => {
        this.camera.lookAt(new THREE.Vector3());
      })
      .start()
      .onComplete(() => {
        // Animation is complete
        console.log('Animation complete');
        this.camera.lookAt(new THREE.Vector3());
        this.camera.zoom = 0.8 * this.camera.zoom;
        this.camera.updateProjectionMatrix()
      });

      const zoomProp = {zoom:1}
      const cameraZoomTween = new TWEEN.Tween(zoomProp)
      .to({zoom: 0.8},duration)
      .easing(TWEEN.Easing.Quadratic.Out) // You can choose a different easing function
      .onUpdate((val) => {
        this.camera.zoom = val.zoom;
        this.camera.updateProjectionMatrix();
      })
      .start()
      .onComplete(() => {
        // Animation is complete
        console.log('zoom tween complete');
      });

    });
    
    (TWEEN as any).tick = ()=>{
      TWEEN.update();
    }
    this.updatables.push(TWEEN as any);

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




    this.eventBroker.on('setMathMeshes',()=>{this.setMathMeshes()});
    

  }



  async setMathMeshes(){

    const vecbText = `\\vec{b}=(b_1,b_2,b_3)`;
    const mathTextb = await MathText.Init(vecbText,'blue');
    mathTextb.mesh.position.set(this.vecb.coord.x, this.vecb.coord.y, this.vecb.coord.z)
    this.scene.add(mathTextb.mesh);

    const vecbTextPrime = `\\vec{b}=(b_1',b_2',b_3')`;
    const mathTextbPrime = await MathText.Init(vecbTextPrime,'purple');
    mathTextbPrime.mesh.position.set(this.vecbPrime.coord.x, this.vecbPrime.coord.y, this.vecbPrime.coord.z)
    this.scene.add(mathTextbPrime.mesh);

    const mathTextv = await MathText.Init('\\vec{v}=(v_1,v_2,v_3)','red');
    mathTextv.mesh.position.set(this.vecv.coord.x, this.vecv.coord.y, this.vecv.coord.z)
    this.scene.add(mathTextv.mesh);

  }



  initCamera() {
    const aspect = this.canvasSize.w / this.canvasSize.h;
    const frustumSize = 20;
    const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 40);
    camera.lookAt(new THREE.Vector3(0,0,0))
    return camera;
  }



}