import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export class Line {
  public lineMesh: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial | THREE.LineDashedMaterial>;
  public font!: Font;
  public textMesh: THREE.Mesh | null = null;

  
  constructor(p1:[number,number,number], p2:[number,number,number], color:number|string, dash?: boolean, text?:string){
    const points = [];
    points.push(new THREE.Vector3(...p1));
    points.push(new THREE.Vector3(...p2));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create line material
    let lineMaterial:THREE.LineBasicMaterial | THREE.LineDashedMaterial;
    if(!dash)
      lineMaterial = new THREE.LineBasicMaterial({ color: color });
    else
      lineMaterial = new THREE.LineDashedMaterial( {
        color: color,
        linewidth: 1,
        scale: 1,
        dashSize: 0.3,
        gapSize: 0.1,
    });
    this.lineMesh = new THREE.Line( lineGeometry, lineMaterial );
    if(dash)
    this.lineMesh.computeLineDistances();

    if(text){
      this.setText( points[0].add(points[1]).divideScalar(2), text)
    }

  }

  setText(position: THREE.Vector3, text:string){
    // create font
    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      this.textMesh = this.makeTextMesh(text, position);
    });
  }

  setTextPos(position:THREE.Vector3){
    this.textMesh!.position.set(position.x,position.y,position.z);
  }

  makeTextMesh(text: string, position: THREE.Vector3) {
    const x = position.x;
    const y = position.y;
    const z = position.z;
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
    textMesh.position.set(x + centerOffsetX, y + centerOffsetY, z);
    return textMesh;
  }
}
