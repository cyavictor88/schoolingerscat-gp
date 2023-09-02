import { tickStep } from 'd3';
import * as THREE from 'three';
import { Line } from './Line';


export class Vector {
  public arrowMesh : THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  public lineMesh: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial>;
  public vector: THREE.Group;
  public matLine : THREE.LineBasicMaterial;
  public matDashLine : THREE.LineDashedMaterial;


  public coords: THREE.Vector3;
  public line2XZ: Line;
  public line2Z: Line;
  public line2X: Line;

  constructor( x:number,y:number,z:number, color:string|number){
    this.coords = new THREE.Vector3(x,y,z);
    const points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(x, y, z));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create line material
    this.matLine = new THREE.LineBasicMaterial({ color: color });
    this.matDashLine  = new THREE.LineDashedMaterial( {
      color: color,
      linewidth: 1,
      scale: 1,
      dashSize: 0.5,
      gapSize: 0.2,
  });

    // Create the line
    const line = new THREE.Line(lineGeometry, this.matLine);
    this.lineMesh=line;

    // Create arrowhead geometry
    const arrowheadGeometry = new THREE.ConeGeometry(0.2, 0.5, 10);
    const arrowheadMaterial = new THREE.MeshBasicMaterial({ color: color });
    const arrowhead = new THREE.Mesh(arrowheadGeometry, arrowheadMaterial);
    arrowhead.position.copy(points[1]);
    const direction = new THREE.Vector3();
    direction.subVectors(points[1], points[0]).normalize();
    arrowhead.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); //using (0,1,0) because cone initally is pointing (0,1,0)
    this.arrowMesh = arrowhead;
    this.vector = new THREE.Group();
    this.vector.add(this.arrowMesh,this.lineMesh);
    this.line2XZ = new Line([x,0,z],[x,y,z],'grey',true);
    this.line2X = new Line([x,0,z],[x,0,0],'grey',true);
    this.line2Z = new Line([x,0,z],[0,0,z],'grey',true);
    this.vector.add(this.line2X.lineMesh);
    this.vector.add(this.line2XZ.lineMesh);
    this.vector.add(this.line2Z.lineMesh);
  } 

  setDash(){
    this.lineMesh.material = this.matDashLine;
    this.lineMesh.computeLineDistances();
  }


  setHelper(){

  }


}