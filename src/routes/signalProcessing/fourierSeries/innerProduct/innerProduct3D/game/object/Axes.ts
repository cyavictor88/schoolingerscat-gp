import * as THREE from 'three';
import { Line } from './Line';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { linspace } from '../../../../introduction/exampleFunc/Simpson';
import { Vector } from './Vector';
import { Dir } from '../Universe';

export class Axes {
  public xAxisLine: Line;
  public yAxisLine: Line;
  public zAxisLine: Line;

  public xTickMeshArr: THREE.Mesh[] = [];
  public yTickMeshArr: THREE.Mesh[] = [];
  public zTickMeshArr: THREE.Mesh[] = [];

  public xTextMesh!: THREE.Mesh;
  public yTextMesh!: THREE.Mesh;
  public zTextMesh!: THREE.Mesh;
  public font!: Font;
  camera : THREE.Camera;

  constructor(scene: THREE.Scene, x: number, y: number, z: number, camera:THREE.Camera) {
    this.xAxisLine = new Line([-x - 0.1, 0, 0], [x + 0.1, 0, 0], 'black');
    this.yAxisLine = new Line([0, -y - 0.1, 0], [0, y + 0.1, 0], 'black');
    this.zAxisLine = new Line([0, 0, -z - 0.1], [0, 0, z + 0.1], 'black');
    this.camera = camera;

    scene.add(this.xAxisLine.lineMesh);
    scene.add(this.yAxisLine.lineMesh);
    scene.add(this.zAxisLine.lineMesh);

    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      this.xTextMesh = this.makeTextMesh("X", x + 0.6, 0, 0);
      this.yTextMesh = this.makeTextMesh("Y", 0, y + 0.6, 0);
      this.zTextMesh = this.makeTextMesh("Z", 0, 0, z + 0.6);

      scene.add(this.xTextMesh);
      scene.add(this.yTextMesh);
      scene.add(this.zTextMesh);




    });



    this.xTickMeshArr = this.makeTicks(scene, Dir.X, x);
    this.yTickMeshArr = this.makeTicks(scene, Dir.Y, y);
    this.zTickMeshArr = this.makeTicks(scene, Dir.Z, z);





  }

  tick(){
    if(this.xTextMesh && this.yTextMesh && this.zTextMesh) {
      this.xTextMesh.lookAt(this.camera.position);
      this.yTextMesh.lookAt(this.camera.position);
      this.zTextMesh.lookAt(this.camera.position);
    }
  }


  makeTicks(scene: THREE.Scene, dir: Dir, len: number) {
    const geometry = new THREE.RingGeometry(0.01, .1, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const material5 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const numTicks = Array.from({ length: 2 * len + 1 }, (_, idx) => { return idx - len });
    const ticks: THREE.Mesh[] = [];
    numTicks.forEach(coor => {
      let mesh;
      if(coor%5!==0)
        mesh = new THREE.Mesh(geometry, material);
      else
        mesh = new THREE.Mesh(geometry, material5);
      switch (dir) {
        case Dir.X:
          mesh.position.set(coor, 0, 0);
          mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)); //using (0,1,0) because cone initally is pointing (0,1,0)
          break;
        case Dir.Y:
          mesh.position.set(0, coor, 0);
          mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 1, 0)); //using (0,1,0) because cone initally is pointing (0,1,0)
          break;
        case Dir.Z:
          mesh.position.set(0, 0, coor);
        default:
          break;
      }
      ticks.push(mesh);
      scene.add(mesh);
    });
    return ticks;
  }

  makeTextMesh(text: string, x: number, y: number, z: number) {

    const textGeo = new TextGeometry(text, {
      font: this.font!,
      size: 1,
      height: 0.1,
    });
    textGeo.computeBoundingBox();
    const centerOffsetX = - 0.5 * (textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x);
    const centerOffsetY = - 0.5 * (textGeo.boundingBox!.max.y - textGeo.boundingBox!.min.y);
    let materials = [
      new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 0x00ffff }) // side
    ];
    const textMesh = new THREE.Mesh(textGeo, materials);
    textMesh.position.set(x + centerOffsetX, y + centerOffsetY, z);
    return textMesh;
  }


}