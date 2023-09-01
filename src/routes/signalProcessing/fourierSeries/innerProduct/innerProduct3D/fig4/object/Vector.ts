import { tickStep } from 'd3';
import * as THREE from 'three';


export class Vector {
  public arrow : THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  public line: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial>;
  public vector: THREE.Group;
  public matLine : THREE.LineBasicMaterial;
  public matDashLine : THREE.LineDashedMaterial;

  constructor( x:number,y:number,z:number, color:string|number){
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
    this.line=line;

    // Create arrowhead geometry
    const arrowheadGeometry = new THREE.ConeGeometry(0.2, 0.5, 10);
    const arrowheadMaterial = new THREE.MeshBasicMaterial({ color: color });
    const arrowhead = new THREE.Mesh(arrowheadGeometry, arrowheadMaterial);
    arrowhead.position.copy(points[1]);
    const direction = new THREE.Vector3();
    direction.subVectors(points[1], points[0]).normalize();
    arrowhead.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); //using (0,1,0) because cone initally is pointing (0,1,0)
    this.arrow = arrowhead;
    this.vector = new THREE.Group();
    this.vector.add(this.arrow,this.line);
  } 

  setDash(){
    this.line.material = this.matDashLine;
    this.line.computeLineDistances();
  }


  setHelper(){
    
  }


}