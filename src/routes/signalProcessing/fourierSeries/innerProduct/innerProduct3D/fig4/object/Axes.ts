import * as THREE from 'three';
import { Line } from './Line';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export class Axes {
  public xAxisLine: Line;
  public yAxisLine: Line;
  public zAxisLine: Line;

  // public xTicks : Line[];
  // public yTicks : Line[];
  // public zTicks : Line[];

  public xTextMesh: THREE.Mesh | null = null;
  public yTextMesh: THREE.Mesh | null = null;
  public zTextMesh: THREE.Mesh | null = null;
  public font: Font | null = null;

  constructor(scene: THREE.Scene, x: number, y: number, z: number) {
    this.xAxisLine = new Line([-x, 0, 0], [x, 0, 0], 'black');
    this.yAxisLine = new Line([0, -y, 0], [0, y, 0], 'black');
    this.zAxisLine = new Line([0, 0, -z], [0, 0, z], 'black');

    scene.add(this.xAxisLine.line);
    scene.add(this.yAxisLine.line);
    scene.add(this.zAxisLine.line);

    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      this.xTextMesh = this.makeTextMesh("X", x + 0.5, 0, 0);
      this.yTextMesh = this.makeTextMesh("Y", 0, y + 0.5, 0);
      this.zTextMesh = this.makeTextMesh("Z", 0, 0, z + 0.5);

      scene.add(this.xTextMesh);
      scene.add(this.yTextMesh);
      scene.add(this.zTextMesh);


    });




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
      new THREE.MeshPhongMaterial({ color: 0xff00ff, flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 0x00ffff }) // side
    ];
    const textMesh = new THREE.Mesh(textGeo, materials);
    textMesh.position.set(x + centerOffsetX, y+centerOffsetY, z);
    return textMesh;
  }


}