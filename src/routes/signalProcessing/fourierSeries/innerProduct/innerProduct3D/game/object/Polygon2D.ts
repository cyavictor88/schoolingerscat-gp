import * as THREE from 'three';
import type { Line } from './Line';

export class Polygon2D {
  mesh: THREE.Mesh;
  points: THREE.Vector3[];
  color: string|number = 'black';
  constructor(points:THREE.Vector3[], color?:string|number){
    this.points = points;
    if(color)this.color=color;
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.MeshBasicMaterial({ color: this.color, side:THREE.DoubleSide, transparent: true, opacity: 0.5 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.visible = true;
  }

  changeCoord(x0:number,y0:number,z0:number, x1:number,y1:number,z1:number, line1:Line,line2:Line){
    let thirdPoint = new THREE.Vector3();
    // if(x1<x0)
    thirdPoint= new THREE.Vector3(x0,y0,z1)
    // else
    // thirdPoint= new THREE.Vector3(x1,y1,z0)

    const pos = this.mesh.geometry.getAttribute('position')
    pos.setXYZ(0,x0,y0,z0);
    pos.setXYZ(1,x1,y1,z1);
    pos.setXYZ(2,...thirdPoint.toArray());
		pos.needsUpdate = true; 


    const newVeca = new THREE.Vector3().fromArray([x0,y0,z0]);
    const newVecb = new THREE.Vector3().fromArray([x1,y1,z1]);

    line1.changeCoord(x1,y1,z1,...newVecb.clone().addScaledVector(new THREE.Vector3(0,newVecb.y-newVeca.y,0),-1).toArray() )
    line2.changeCoord(...thirdPoint.toArray(),...thirdPoint.clone().addScaledVector(new THREE.Vector3(newVecb.x-newVeca.x,0,0),1).toArray())




  }
}