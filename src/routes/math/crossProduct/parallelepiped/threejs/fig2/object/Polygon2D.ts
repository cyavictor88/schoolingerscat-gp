import * as THREE from 'three';

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
}