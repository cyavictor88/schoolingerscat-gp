import * as THREE from 'three';
import { MathText } from './MathText';
import { Vector } from './Vector';


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
    const geometry = new THREE.RingGeometry(curveLen-0.1, curveLen, 10, 1, 0 , theta );
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    this.curveMesh = new THREE.Mesh(geometry,material);
    const orth = this.veca.clone().cross(this.vecb).normalize();
    // this.curveMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),orth);
    // this.curveMesh.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0), veca.clone().normalize());
    const unitVeca = this.veca.clone().normalize();
    const angleXZ = Math.atan(unitVeca.z/unitVeca.x);
    const angleXY = Math.atan(unitVeca.y/unitVeca.x);

    const angles = new THREE.Euler(0,-angleXZ,angleXY);
    const quatvvvY = new THREE.Quaternion().setFromEuler(angles);
    // this.curveMesh.setRotationFromQuaternion(quatvvvY);
    // this.curveMesh.quaternion.setFromAxisAngle( new THREE.Vector3(0,1,0), -angleXZ );
    // this.curveMesh.quaternion.setFromAxisAngle( new THREE.Vector3(0,0,1), angleYZ );
    
    console.log("curve rotated position",this.curveMesh.rotation)

    // console.log("curve rotated position",this.curveMesh.rotation)

    // this.curveMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),orth);

    const directionVector = new THREE.Vector3();
    directionVector.subVectors(this.vecb, this.veca);
    directionVector.normalize();
    // const quaternion = new THREE.Quaternion();
    // quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), orth);
    const orth2 = this.veca.clone().cross(new THREE.Vector3(0,1,0)).normalize();

    const quatY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),-angleXZ)
    // const quatY = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,0,0), veca.clone().normalize())
    const quatZ = new THREE.Quaternion().setFromAxisAngle(orth2,angleXY );
    const quatX = new THREE.Quaternion().setFromUnitVectors(orth2,orth );

    const allQuat = new THREE.Quaternion().multiplyQuaternions(quatX,quatZ);
    allQuat.multiply(quatY);
    this.curveMesh.setRotationFromQuaternion(allQuat);



    const quat = new THREE.Quaternion();

    const quat2 = new THREE.Quaternion().setFromUnitVectors(orth2, orth);
    // quat.multiplyQuaternions(quat2, quatvvvY)

    // this.curveMesh.setRotationFromQuaternion(quat);


    // this.curveMesh.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0),veca.clone().normalize());
    // const curvePos = this.curveMesh.rotation.clone();
    // console.log("curve turned position",this.curveMesh.quaternion..toArray())

    // this.curveMesh.quaternion.setFromAxisAngle(orth,)

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