import * as THREE from 'three';
import { MathText } from './MathText';
import { Vector } from './Vector';
import { linspace } from '../../../../intro/exampleFunc/Simpson';


export class Theta {
  public textMesh!: MathText;
  public veca: THREE.Vector3;
  public vecb: THREE.Vector3;
  public curveMesh! : THREE.Mesh  | THREE.Line;
  public theta: number;
  constructor(veca: THREE.Vector3, vecb: THREE.Vector3){
    this.veca = veca;
    this.vecb = vecb;
    this.theta = Math.acos(this.veca.dot(this.vecb)/ (this.veca.length()*this.vecb.length()) );

    // this.setCurveWithQuaternion();
    this.setCurveWithChangeOfBasis();
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

  setCurveWithChangeOfBasis(){
    const veca_n = this.veca.clone().normalize();
    const vecb_n = this.vecb.clone().normalize();
    const vecn_n = this.veca.clone().cross(this.vecb).normalize();
    //change of basis matrix
    const cob_mat = new THREE.Matrix3(veca_n.x,vecb_n.x,vecn_n.x,veca_n.y,vecb_n.y,vecn_n.y,veca_n.z,vecb_n.z,vecn_n.z );
    const curvePoints = linspace(0,Math.PI/2,10).map(angle=>new THREE.Vector3(Math.cos(angle),Math.sin(angle),0));
    curvePoints.forEach(p=>p.applyMatrix3(cob_mat));
    const material = new THREE.MeshBasicMaterial({ color: 'darkgrey', side: THREE.DoubleSide });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    this.curveMesh = new THREE.Line( lineGeometry, material );
  }


  setCurveWithQuaternion(){
    const curveLen = this.veca.length() > this.vecb.length() ? this.vecb.length()/5 :  this.veca.length()/5;
    const geometry = new THREE.RingGeometry(curveLen-0.1, curveLen, 10, 1, 0 , this.theta );
    const material = new THREE.MeshBasicMaterial({ color: 'grey', side: THREE.DoubleSide });
    this.curveMesh = new THREE.Mesh(geometry,material);
    const orthAB = this.veca.clone().cross(this.vecb).normalize();
    const unitVeca = this.veca.clone().normalize();
    const angleXZ = Math.atan(unitVeca.z/unitVeca.x);
    const angleXY = Math.atan(unitVeca.y/unitVeca.x);

    const orthAY = this.veca.clone().cross(new THREE.Vector3(0,1,0)).normalize();

    const quatY_1 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),-angleXZ)
    // const quatY_1 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,0,0), veca.clone().normalize())
    const quatZ_2 = new THREE.Quaternion().setFromAxisAngle(orthAY, angleXY);
    const quatX_3 = new THREE.Quaternion().setFromUnitVectors(orthAY, orthAB);

    const allQuat = new THREE.Quaternion().multiplyQuaternions(quatX_3,quatZ_2);
    allQuat.multiply(quatY_1);
    this.curveMesh.setRotationFromQuaternion(allQuat);

  }
}