import * as THREE from 'three';
import { TickingWorld } from './TickingWorld';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MathText } from './MathText';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

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

const canvasSize = { w: 250, h: 50 };

export class Universe extends THREE.EventDispatcher{
  // export class World extends EventEmitter {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  canvasSize = canvasSize;
  font!: Font;
  public textMesh!:  THREE.Mesh;

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


    // this.addEventListener('setMathMeshes',()=>{this.setMathMeshes()})

    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font =font;
      
      const textMesh = this.makeTextMesh('schoolingerscat@gmail', new THREE.Vector3(78,6,0));
      this.textMesh = textMesh;
      this.scene.add(this.textMesh);
      // add to updateables, changing color
      (textMesh as any).cnt = 0;
      (textMesh as any).tick = function(delta:number){
        // if(delta%10!=0) return;
        (textMesh as any).cnt += 1;
        (textMesh.material as any).color.setHex((textMesh as any).cnt);
        if((textMesh as any).cnt % 255 === 0) (textMesh as any).cnt = 0;
        // if((textMesh as any).cnt % 51 === 0) {
        //   (textMesh.material as any).color.setHex( 0xff0000);
        // } else if ((textMesh as any).cnt % 101 === 0){
        //   (textMesh.material as any).color.setHex( 0x0000ff );
        //   (textMesh as any).cnt = 1
        // }
      }
      this.tickingWorld.updatables.push(textMesh);
    });


  }
  makeTextMesh(text: string, position: THREE.Vector3) {
    const x = position.x;
    const y = position.y;
    const z = position.z;
    const textGeo = new TextGeometry(text, {
      font: this.font!,
      size: 5.5,
      height: 5.5,
    });
    textGeo.computeBoundingBox();
    const centerOffsetX = - 0.5 * (textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x);
    const centerOffsetY = - 0.5 * (textGeo.boundingBox!.max.y - textGeo.boundingBox!.min.y);
    let materials = [
      new THREE.MeshPhongMaterial({ color: 'brown', flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 'brown' }) // side
    ];
    const textMesh = new THREE.Mesh(textGeo, new THREE.MeshPhongMaterial({ color: 0xff0000 }));
    textMesh.position.set(x + centerOffsetX, y + centerOffsetY, z);
    return textMesh;
  }

  async setMathMeshes(){
    const mathText = await MathText.Init('schoolingerscat @ g\\Mu \\alpha \\iota \\lfloor \\cdot \\subset \\varnothing \\Mu','blue');
    mathText.mesh.position.set(0,0,0);
    mathText.mesh.scale.set(10,10,10);
    this.scene.add(mathText.mesh);
    this.mathText = mathText;

    // add to updateables, changing color
    (mathText.mesh as any).cnt = 1;
    (mathText.mesh as any).tick = function(delta:number){
      (mathText.mesh as any).cnt += 1;
      if((mathText.mesh as any).cnt % 51 === 0) {
        (mathText.mesh.material as any).color.setHex( 0xff0000);
      } else if ((mathText.mesh as any).cnt % 101 === 0){
        (mathText.mesh.material as any).color.setHex( 0x009900 );
        (mathText.mesh as any).cnt = 1
      }
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