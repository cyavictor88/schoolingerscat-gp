import * as THREE from 'three';
export class Line {
  public line: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial | THREE.LineDashedMaterial>;
  
  constructor(p1:[number,number,number], p2:[number,number,number], color:number|string, dash?: boolean){
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
    this.line = new THREE.Line( lineGeometry, lineMaterial );
    if(dash)
    this.line.computeLineDistances();
    // Create the line
  }


}
