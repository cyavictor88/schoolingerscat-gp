import * as THREE from 'three';
import { MathText } from './MathText';


export class Theta {
  public textMesh!: MathText;
  public veca: THREE.Vector3;
  public vecb: THREE.Vector3;
  public curveMesh : THREE.Mesh ;
  constructor(veca: THREE.Vector3, vecb: THREE.Vector3){
    this.veca = veca;
    this.vecb = vecb;
    const theta = Math.acos(this.veca.dot(this.vecb)/ (this.veca.length()*this.vecb.length()) );
    const curveLen = this.veca.length() > this.vecb.length() ? this.vecb.length()/5 :  this.veca.length()/5;
    const strangeOffset = 0.05;
    const geometry = new THREE.RingGeometry(curveLen-0.1, curveLen, 10, 1, strangeOffset , theta );
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    this.curveMesh = new THREE.Mesh(geometry,material);
    const orth = this.veca.clone().cross(this.vecb).normalize();
    this.curveMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),orth);

  }
  public static async Init(vec1: THREE.Vector3, vec2: THREE.Vector3) {
    const veca = vec1.clone();
    const vecb = vec2.clone();
    const obj = new Theta(veca,vecb);
    obj.textMesh = await MathText.Init('\\theta');
    const curveLen = veca.length() > vecb.length() ? vecb.length()/5 :  veca.length()/5;
    const shortVeca = veca.normalize().multiplyScalar(curveLen);
    const shortVecb = vecb.normalize().multiplyScalar(curveLen);
    const textPos = shortVeca.add(shortVecb).multiplyScalar(0.5);
    obj.textMesh.mesh.position.set(textPos.x,textPos.y,textPos.z);
    return obj;
  }
}