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
  canvasSize = canvasSize;

  veca : Vector;
  vecb : Vector;
  axes : Axes;

  fig6triangle: Polygon2D | null = null;
  fig6triangleLine1: Line | null = null;
  fig6triangleLine2: Line | null = null;

  dLine!: Line;

  theta!: Theta;

  vecaMM! : MathText;
  vecbMM! : MathText;
  azbzMM! : MathText;
  aybyMM! : MathText;
  axbxMM! : MathText;

  constructor(refCurrent: HTMLDivElement) {
    super();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightblue');
    this.camera = this.initCamera();
    this.camera.position.set( 18.5607, 10.5107793, 19.5605527 );


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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement );

    this.controls.update();

    // universe setup done

    this.veca = new Vector(9,-4,8,0xff0000);
    this.vecb = new Vector(4,8,-5,0x0000ff);
    this.scene.add(this.veca.vector);
    this.scene.add(this.vecb.vector);
    this.axes = new Axes(this.scene,10,10,10,this.camera);

    this.tickingWorld.updatables.push(this.axes);


    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      const d = new Line(this.veca.coord.toArray(),this.vecb.coord.toArray(),'brown',true);
      d.setText(this.font,'d');
      d.textMesh?.scale.set(1.5,1.5,1.5);
      this.scene.add(d.lineMesh,d.textMesh!);
      this.dLine = d;
    });

    this.showFig6Triangle()


    this.addEventListener('setMathMeshes',()=>{this.setMathMeshes()})


    

  }

  showFig6Triangle(){
    if(!this.fig6triangle){
      // simple method
      let thirdPoint = new THREE.Vector3();
      thirdPoint= new THREE.Vector3(this.veca.coord.x,this.vecb.coord.y,this.veca.coord.z)
      const line1 = new Line([...this.veca.coord.toArray()],[...this.veca.coord.clone().addScaledVector(new THREE.Vector3(0,0,this.vecb.coord.z-this.veca.coord.z),1).toArray()],'brown',true) 
      const line2 = new Line([...thirdPoint.toArray()],[...thirdPoint.clone().addScaledVector(new THREE.Vector3(this.vecb.coord.x-this.veca.coord.x,0,0),-1).toArray()],'brown',true) 
      this.scene.add(line1.lineMesh,line2.lineMesh)
      this.fig6triangleLine1 = line1;
      this.fig6triangleLine2 = line2;

      this.fig6triangle = new Polygon2D([this.veca.coord,this.vecb.coord,thirdPoint],'brown')
      this.scene.add(this.fig6triangle.mesh);
      } 
  }

  async setMathMeshes(){
    const theta = await Theta.Init(this.veca.coord,this.vecb.coord);
    this.scene.add(theta.curveMesh);
    this.scene.add(theta.textMesh.mesh);
    this.theta= theta;


    const mathText = await MathText.Init('\\vec{a} \\\\ (a_x,a_y,a_z)','red');
    mathText.mesh.position.set(this.veca.coord.x, this.veca.coord.y, this.veca.coord.z);
    this.scene.add(mathText.mesh);

    const mathText2 = await MathText.Init('\\vec{b} \\\\ (b_x,b_y,b_z)','blue');
    mathText2.mesh.position.set(this.vecb.coord.x, this.vecb.coord.y, this.vecb.coord.z)
    this.scene.add(mathText2.mesh);

    let thirdPoint = new THREE.Vector3();
    // if(this.vecb.coord.y<this.veca.coord.y)
    // thirdPoint= new THREE.Vector3(this.veca.coord.x,this.vecb.coord.y,this.veca.coord.z)
    // else
    thirdPoint= new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z)
    const line1 = new Line([...this.veca.coord.toArray()],[...this.veca.coord.clone().addScaledVector(new THREE.Vector3(0,0,this.vecb.coord.z-this.veca.coord.z),1).toArray()],'brown',true) 
    const line2 = new Line([...thirdPoint.toArray()],[...thirdPoint.clone().addScaledVector(new THREE.Vector3(this.vecb.coord.x-this.veca.coord.x,0,0),-1).toArray()],'brown',true) 

    const offset = 0.2

    const mathText3 = await MathText.Init('| \\vec{a_z} - \\vec{b_z} |','brown');
    let pos = new THREE.Vector3();
    line1.points.forEach(p=>{
      const parr = p.toArray();
      pos.x += parr[0] + offset
      pos.y += parr[1]
      pos.z += parr[2] 
    })
    mathText3.mesh.position.set(...pos.multiplyScalar(0.5).toArray());
    mathText3.mesh.rotation.setFromVector3(new THREE.Vector3(3*Math.PI/2,0,0));


    const mathText4 = await MathText.Init('| \\vec{a_x} - \\vec{b_x} |','brown');
    let pos2 = new THREE.Vector3();
    line2.points.forEach(p=>{
      const parr = p.toArray();
      pos2.x += parr[0]
      pos2.y += parr[1]
      pos2.z += parr[2] - offset
    })
    mathText4.mesh.position.set(...pos2.multiplyScalar(0.5).toArray());
    mathText4.mesh.rotation.setFromVector3(new THREE.Vector3(3*Math.PI/2,0,Math.PI/2));
    // mathText4.mesh.rotation.setFromVector3(new THREE.Vector3(0,0,Math.PI/2));


    const mathText5 = await MathText.Init('| \\vec{a_y} - \\vec{b_y} |','brown');
    let pos3 = new THREE.Vector3(thirdPoint.x+this.vecb.coord.x, thirdPoint.y+this.vecb.coord.y,-offset+thirdPoint.z+this.vecb.coord.z);
    mathText5.mesh.position.set(...pos3.multiplyScalar(0.5).toArray());
    mathText5.mesh.rotation.setFromVector3(new THREE.Vector3(0,Math.PI/2,0));


    this.scene.add(mathText3.mesh);
    this.scene.add(mathText4.mesh);
    this.scene.add(mathText5.mesh);

    this.azbzMM = mathText3;
    this.axbxMM = mathText4;
    this.aybyMM = mathText5;

    this.vecaMM = mathText;
    this.vecbMM = mathText2;

  }


  changeBrownTriangleMathTextCoord(x0:number,y0:number,z0:number, x1:number,y1:number,z1:number){

    this.veca.coord = new THREE.Vector3().fromArray([x0,y0,z0]);
    this.vecb.coord = new THREE.Vector3().fromArray([x1,y1,z1]);
    // let thirdPoint = new THREE.Vector3();
    // if(this.vecb.coord.y<this.veca.coord.y)
    // thirdPoint= new THREE.Vector3(this.veca.coord.x,this.vecb.coord.y,this.veca.coord.z)
    // else
    // thirdPoint= new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z)

    let thirdPoint = new THREE.Vector3();
    // if(this.vecb.coord.x<this.veca.coord.x)
    thirdPoint= new THREE.Vector3(this.veca.coord.x,this.veca.coord.y,this.vecb.coord.z)
    // else
    // thirdPoint= new THREE.Vector3(this.vecb.coord.x,this.vecb.coord.y,this.veca.coord.z)



    const offset = 0.2


    let p1 = this.vecb.coord.clone();
    let p2 = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z);
    let final = p1.multiplyScalar(0.5).addScaledVector(p2,0.5);
    final.setX(final.x+offset)
    this.aybyMM.changeCoordSimple(...final.toArray())

    p1 = thirdPoint.clone();
    p2 = new THREE.Vector3(this.vecb.coord.x,this.veca.coord.y,this.vecb.coord.z);
    final = p1.multiplyScalar(0.5).addScaledVector(p2,0.5);
    final.setZ(final.z-offset)
    this.axbxMM.changeCoordSimple(...final.toArray())


    let pos3 = new THREE.Vector3(thirdPoint.x+this.veca.coord.x, thirdPoint.y+this.veca.coord.y,-offset+thirdPoint.z+this.veca.coord.z);
    this.azbzMM.changeCoordSimple(...pos3.multiplyScalar(0.5).toArray())



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