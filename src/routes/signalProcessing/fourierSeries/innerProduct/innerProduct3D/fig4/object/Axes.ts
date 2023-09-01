import * as THREE from 'three';
import { Line } from './Line';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export class Axes {
  public xAxisLine: Line; 
  public yAxisLine: Line; 
  public zAxisLine: Line;
  
  // public xTicks : Line[];
  // public yTicks : Line[];
  // public zTicks : Line[];

  public xTextMesh: THREE.Mesh | null = null;

  constructor(scene:THREE.Scene, x:number,y:number,z:number) {
    this.xAxisLine = new Line([-x,0,0],[x,0,0],'0x000000');
    this.yAxisLine = new Line([0,-y,0],[0,y,0],'0x000000');
    this.zAxisLine = new Line([0,0,-z],[0,0,z],'0x000000');

    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (response)=>{
      console.log(response);
      const font = response;
      const textGeo =  new TextGeometry( 'X', {

        font: font,
  
        size: 70,
        height: 20,
        curveSegments: 4,
  
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelEnabled: true
  
      } );
      textGeo.computeBoundingBox();
      let materials = [
        new THREE.MeshPhongMaterial( { color: 0xff00ff, flatShading: true } ), // front
        new THREE.MeshPhongMaterial( { color: 0x00ffff } ) // side
      ];
      this.xTextMesh = new THREE.Mesh( textGeo, materials );
      this.xTextMesh.position.set(0,0,0);
      this.xTextMesh.scale.set(0.02,0.02,0.02);
      scene.add(this.xTextMesh);
    });



  }

  
}