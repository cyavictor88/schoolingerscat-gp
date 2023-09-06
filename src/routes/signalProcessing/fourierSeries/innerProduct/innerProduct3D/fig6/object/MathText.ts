import { mathmesh } from '$lib/mathmesh/mathmesh';
import * as THREE from 'three';

export class MathText {

  math: string ='';
  mesh!: THREE.Mesh;
  color: string|number = 'black'
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;
  constructor(math:string, color?:string | number){
    if(color)this.color=color;
    this.math = math;
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.MeshBasicMaterial({ color: this.color, side:THREE.DoubleSide });
  }
  public static Init = async (math:string, color?:string | number) => {
    const obj = new MathText(math, color ?? undefined);
    const mathMesh = await mathmesh(math);
    obj.geometry?.setAttribute('position', new THREE.BufferAttribute(mathMesh.vertices,3));
    obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
    return obj;
 };


 changeCoordSimple(x0:number,y0:number,z0:number){
  this.mesh.position.set(x0,y0,z0)
 }

  // const mm = await mathmesh("\\int_{a}^{b}x^2 \\,dx \\frac{3}{4} \\vec{a}");
  // const geometry = new THREE.BufferGeometry()
  // geometry.setAttribute('position', new THREE.BufferAttribute(mm.vertices, 3));
  // const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, side:THREE.DoubleSide });
  // const mesh = new THREE.Mesh(geometry, material);


}