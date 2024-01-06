import * as THREE from 'three';
import EventEmitter from 'eventemitter3';
import { mathmesh } from '$lib/mathmesh/mathmesh';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector } from './object/Vector';
import { Axes } from './object/Axes';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { MathText } from './object/MathText';
import { Polygon2D } from './object/Polygon2D';
import { Parallelepiped } from './object/Parallelepiped';
import { Plane } from './object/Plane';
import TWEEN from '@tweenjs/tween.js';
import { Line } from './object/Line';
import type {Updatable } from './TickingVerse';
import type { IUniverse } from './Multiverse';
import * as mj from 'mathjs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


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

export class Universe3 implements IUniverse {
  // export class World extends EventEmitter {
  htmlElement: HTMLDivElement | HTMLSpanElement;
  updatables: Updatable[];
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  eventBroker: EventEmitter;
  controls: OrbitControls;
  font!: Font;
  canvasSize = { w: 500, h: 400 };



  fps = 0;


  veca : Vector;
  vecb : Vector;
  vecv: Vector;
  vecbPrime: Vector;
  axes : Axes;

  vecaHeightLine: Line;

  fig4triangle: Polygon2D | null = null;
  vecv_vecb_plane: Plane;

  vec_b_cross_v : Line;


  
  rightHand: THREE.Object3D<THREE.Event> | null = null;
  constructor(refCurrent: HTMLSpanElement, v?: number[],a?:number[],b?:number[], bPrime?:number[]) {
    this.htmlElement = refCurrent;
    this.updatables = [];
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
    // this.renderer = new THREE.WebGLRenderer({
    //   antialias: true,
    //   // preserveDrawingBuffer: true, //https://discourse.threejs.org/t/how-to-save-rendering-scene-to-img/41858/3
    // });
    // this.renderer.setPixelRatio( window.devicePixelRatio );
    // this.tickingWorld = new TickingWorld(this.camera, this.scene, this.renderer);
    // this.renderer.render(this.scene, this.camera);
    // this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);
    // refCurrent.appendChild(this.renderer.domElement);
    this.eventBroker.on("hello", (data) => { console.log(data) });
    this.controls = new OrbitControls(this.camera, this.htmlElement );

    this.controls.update();

    // universe setup done

    // this.controls.addEventListener('change', () => {
    //   const cameraPosition = this.camera.position.clone();
    //   console.log('Camera Position:', cameraPosition);
    // });


    this.veca = a? new Vector(a[0],a[1],a[2],0x008800):  new Vector(0,2,3,0x008800);
    this.vecb = b? new Vector(b[0],b[1],b[2],0x0000ff):  new Vector(0,0,5,0x0000ff);
    this.vecv = v? new Vector(v[0],v[1],v[2],0xff0000):  new Vector(-4,4,-2,0xff0000);

    const veca = a ?? [0,2,3];
    const vecb = b ?? [0,0,5];
    const vecv = v ?? [-4,4,-2];
    // this.vecvrossProduct = new Vector(cp.x,cp.y,cp.z,0xff0000);
    this.vecbPrime = bPrime ? new Vector(bPrime[0],bPrime[1],bPrime[2],'purple'):  new Vector(-4,4,-2,0xff0000);

    const normvb = mj.cross(vecb,vecv);

    const volume = mj.det([veca,vecb, vecv])
    const height = Math.abs(volume / new THREE.Vector3().fromArray(normvb as number[]).length());
    const nomvb_proper_height_for_pp = mj.multiply(1/height,normvb);

    this.vec_b_cross_v = new Line(mj.add(nomvb_proper_height_for_pp,vecv) as [number,number,number], vecv as [number,number,number],0x008800,true);
    this.scene.add(this.vec_b_cross_v.lineMesh);

    const vecbMag = this.vecb.coord.length();
    const vecvMag = this.vecv.coord.length();
    const sin =  Math.sqrt(1-  (  mj.dot(vecb,vecv)/ (vecbMag*vecvMag)   )**2)
    const planeHeight = sin * vecbMag;

    this.vecv_vecb_plane = new Plane(this.scene,[0,0,0],100,planeHeight, new THREE.Vector3().fromArray(normvb as number[]));
    this.vecv_vecb_plane.mesh.visible=false;
    const properPos = vecb.map((p,idx)=>{
      return p/2+vecv[idx]/2;
    })
    this.vecv_vecb_plane.mesh.position.set(...properPos as [number,number,number])


    this.scene.add(this.veca.vector);
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

    const pp = new Parallelepiped(this.scene,this.veca.coord,this.vecb.coord,this.vecv.coord);
    const pp2 = new Parallelepiped(this.scene,this.veca.coord,this.vecbPrime.coord,this.vecv.coord);


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
    this.eventBroker.on('showFig4Triangle',()=>{this.showFig4Triangle()});
    this.eventBroker.on('setRightHand', () => { this.setRightHand() });
    this.eventBroker.on('toggleRightHand', () => {
      if(this.rightHand) this.rightHand.visible=!this.rightHand.visible;
    });
    

  }

  showFig4Triangle(){
    if(!this.fig4triangle){
      this.fig4triangle = new Polygon2D([this.veca.coord,this.vecb.coord,new THREE.Vector3()],'lightgrey')
      this.scene.add(this.fig4triangle.mesh);
    } else {
      this.fig4triangle.mesh.visible = !this.fig4triangle.mesh.visible;
    }

  }



  async setRightHand() {
    const gltfLoader = new GLTFLoader();
    const det = mj.det([this.vecv.coord.toArray(),this.veca.coord.toArray(),this.vecb.coord.toArray()]);
    const loadStr = det > 0 ? 'Positive':'Negative';
    const loadedData = await gltfLoader.loadAsync(`/glbs/rightHand${loadStr}.glb`);
    // console.log(loadedData)
    const model = loadedData.scene.children[0];
    this.rightHand = model;
    model.position.set(0, 0, 0);
    const [vecFrom, vecTo] = [new THREE.Vector3(), new THREE.Vector3()];
    vecFrom.copy(this.vecv.coord);
    vecTo.copy(this.veca.coord);
    const cross = new THREE.Vector3().crossVectors(vecFrom, vecTo);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), cross.normalize());
    const quat1 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.acos(new THREE.Vector3(0, 1, 0).dot(vecFrom.normalize())));
    quat.multiply(quat1);
    model.applyQuaternion(quat);

    model.scale.set(0.1, 0.1, 0.1);
    model.visible = false;


    const clip = loadedData.animations[0];

    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();


    (model as any).tick = (delta: number) => {
      this.fps = 1/(delta);
      if(this.fps>120) mixer.update(delta*10)
      else mixer.update(delta)

    }


    this.scene.add(model);
    this.updatables.push(model as any);
  }

  async setMathMeshes(){
    const mathTexta = await MathText.Init('\\vec{a}=(a_1,a_2,a_3) ','green');
    mathTexta.mesh.position.set(this.veca.coord.x, this.veca.coord.y, this.veca.coord.z);
    this.scene.add(mathTexta.mesh);

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



    // const theta = await Theta.Init(this.veca.coord,this.vecb.coord);
    // this.scene.add(theta.curveMesh);
    // this.scene.add(theta.textMesh.mesh);


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
    // const aspect = this.canvasSize.w / this.canvasSize.h;
    // const frustumSize = 20;





    // const camera = new THREE.OrthographicCamera();
    
    // camera.left = -this.canvasSize.w / 2;
    // camera.right = this.canvasSize.w / 2;
    // camera.top = this.canvasSize.h / 2;
    // camera.bottom = -this.canvasSize.h / 2;
    // camera.near = -1;
    // camera.far = 1;
    // camera.zoom = 1;


    
    // camera.lookAt(new THREE.Vector3(0,0,0))
    // return camera;


    const aspect = this.canvasSize.w / this.canvasSize.h;
    const frustumSize = 20;
    const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 40);
    camera.lookAt(new THREE.Vector3(0,0,0))
    return camera;
  }



}