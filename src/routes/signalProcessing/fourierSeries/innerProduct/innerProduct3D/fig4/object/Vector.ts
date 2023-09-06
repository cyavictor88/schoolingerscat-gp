import * as THREE from 'three';
import { Line } from './Line';


export class Vector {
  public arrowMesh : THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  public lineMesh: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial>;
  public vector: THREE.Group;
  public matLine : THREE.LineBasicMaterial;
  public matDashLine : THREE.LineDashedMaterial;


  public coord: THREE.Vector3;
  public line2XY: Line;
  public line2Y: Line;
  public line2X: Line;

  constructor( x:number,y:number,z:number, color:string|number){
    this.coord = new THREE.Vector3(x,y,z);
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
    const coneLen = 0.5
    const arrowheadGeometry = new THREE.ConeGeometry(0.2, 0.5, 10);
    const arrowheadMaterial = new THREE.MeshBasicMaterial({ color: color });
    const arrowhead = new THREE.Mesh(arrowheadGeometry, arrowheadMaterial);
    const arrowPosLen = points[1].length() - coneLen/2;
    const direction = new THREE.Vector3();
    direction.subVectors(points[1], points[0]).normalize();

    const arrowPos = new THREE.Vector3();
    arrowPos.subVectors(points[1], points[0]).normalize();

    arrowhead.position.copy(arrowPos.multiplyScalar(arrowPosLen));
    arrowhead.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); //using (0,1,0) because cone initally is pointing (0,1,0)
    this.arrowMesh = arrowhead;
    this.vector = new THREE.Group();
    this.vector.add(this.arrowMesh,this.lineMesh);
    // this.line2XY = new Line([x,0,z],[x,y,z],'grey',true);
    // this.line2Y = new Line([x,0,z],[x,0,0],'grey',true);
    // this.line2Z = new Line([x,0,z],[0,0,z],'grey',true);

    this.line2XY = new Line([x,y,0],[x,y,z],'grey',true);
    this.line2Y = new Line([x,y,0],[0,y,0],'grey',true);
    this.line2X = new Line([x,y,0],[x,0,0],'grey',true);
    this.vector.add(this.line2X.lineMesh);
    this.vector.add(this.line2XY.lineMesh);
    this.vector.add(this.line2Y.lineMesh);
  } 

  setDash(){
    this.lineMesh.material = this.matDashLine;
    this.lineMesh.computeLineDistances();
  }


  setHelper(){

  }


}