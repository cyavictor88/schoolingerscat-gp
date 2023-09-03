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

const canvasSize = { w: 500, h: 400 };

export class Universe extends THREE.EventDispatcher{
  // export class World extends EventEmitter {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  controls: OrbitControls;
  font!: Font;

  veca : Vector;
  vecb : Vector;
  axes : Axes;

  fig5triangle: Polygon2D | null = null;

  constructor(refCurrent: HTMLDivElement) {
    super();
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
    this.renderer.setSize(canvasSize.w, canvasSize.h);
    refCurrent.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement );

    this.controls.update();

    // universe setup done

    // this.controls.addEventListener('change', () => {
    //   const cameraPosition = this.camera.position.clone();
    //   console.log('Camera Position:', cameraPosition);
    // });

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
    });

    this.showFig5Triangle()


    this.addEventListener('setMathMeshes',()=>{this.setMathMeshes()})


  }

  showFig5Triangle(){
    if(!this.fig5triangle){
      let thirdPoint = new THREE.Vector3().subVectors(this.vecb.coord,this.veca.coord);
      const vecc = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z);
      const vec_ac = new THREE.Vector3().subVectors(vecc,this.veca.coord)
      const vec_bc = new THREE.Vector3().subVectors(vecc,this.vecb.coord)
      const vec_n = vec_bc.clone().cross(vec_ac).normalize();

      const x = this.vecb.coord.z - this.veca.coord.z
      const y = this.vecb.coord.y - this.veca.coord.y
      const angle = Math.atan2(y,x);
      thirdPoint.normalize().multiplyScalar( new THREE.Vector3().subVectors(this.vecb.coord,this.veca.coord).length()*Math.cos(angle) )


      const quat = new THREE.Quaternion().setFromAxisAngle(vec_n,angle);
      thirdPoint.applyQuaternion(quat);


      const translation_mat = new THREE.Matrix4()
      translation_mat.makeTranslation(this.veca.coord);
      thirdPoint.applyMatrix4(translation_mat);

      const newLine = new Line([...new THREE.Vector3().toArray()],[...thirdPoint.toArray()],'black');
      this.scene.add(newLine.lineMesh);


      // const thirdPoint = new THREE.Vector3(this.vecb.coord.x-this.veca.coord.x, this.vecb.coord.y-this.veca.coord.y,this.vecb.coord.z-this.veca.coord.z);
      this.fig5triangle = new Polygon2D([this.veca.coord,this.vecb.coord,thirdPoint],'brown')
      this.scene.add(this.fig5triangle.mesh);
    } else {
      this.fig5triangle.mesh.visible = !this.fig5triangle.mesh.visible;
    }

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