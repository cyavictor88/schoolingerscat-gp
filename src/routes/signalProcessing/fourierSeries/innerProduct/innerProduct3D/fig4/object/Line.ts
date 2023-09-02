import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js';

export class Line {
  public lineMesh: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial | THREE.LineDashedMaterial>;
  public font!: Font;
  public textMesh: THREE.Mesh | null = null;
  public points: THREE.Vector3[] =[]
  
  constructor(p1:[number,number,number], p2:[number,number,number], color:number|string, dash?: boolean){
    this.points.push(new THREE.Vector3(...p1));
    this.points.push(new THREE.Vector3(...p2));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(this.points);

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


  }

  setText(font: Font, text: string, position?: THREE.Vector3){
    // create font
    this.font = font;
    let textPosition = this.points[0].add(this.points[1]).divideScalar(2);
    if(position)textPosition=position;
    this.textMesh = this.makeTextMesh(text, textPosition);

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
      size: 0.5,
      height: 0.05,
    });
    textGeo.computeBoundingBox();
    const centerOffsetX = - 0.5 * (textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x);
    const centerOffsetY = - 0.5 * (textGeo.boundingBox!.max.y - textGeo.boundingBox!.min.y);
    let materials = [
      new THREE.MeshPhongMaterial({ color: 'brown', flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 'brown' }) // side
    ];
    const textMesh = new THREE.Mesh(textGeo, materials);
    textMesh.position.set(x + centerOffsetX, y + centerOffsetY, z);
    return textMesh;
  }
}
