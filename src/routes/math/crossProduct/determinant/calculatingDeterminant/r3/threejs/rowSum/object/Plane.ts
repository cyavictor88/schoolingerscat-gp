import * as THREE from 'three';

export class Plane {
  mesh : THREE.Mesh;
	geometry : THREE.PlaneGeometry;
	material : THREE.MeshBasicMaterial;
  center : THREE.Vector3Tuple = [0,0,0];
  width: number=1;
  length: number=1;
  normalVec: THREE.Vector3 = new THREE.Vector3(0,0,1);
  defaultNormalVec: THREE.Vector3 = new THREE.Vector3(0,0,1);
  constructor();
  constructor(scene: THREE.Scene, center: THREE.Vector3Tuple,length:number,width:number,normalVec: THREE.Vector3 );
  constructor(scene?: THREE.Scene, center?: THREE.Vector3Tuple,length?:number,width?:number, normalVec?: THREE.Vector3, planeColor?:string){
    if(center && width && length && normalVec){
      this.center = center;
      this.width = width;
      this.length = length;
      this.normalVec = normalVec;
    }
    // if(points){
    //   this.center = pointer.map
    // }

    const color = planeColor ?? 0xffff00;
    this.material =  new THREE.MeshBasicMaterial( {color, side: THREE.DoubleSide,opacity: 0.5, transparent: false} );
    this.geometry = new THREE.PlaneGeometry( this.width, this.length );
    const planeMesh = new THREE.Mesh( this.geometry, this.material );
    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(this.defaultNormalVec.normalize(),this.normalVec.normalize());
    planeMesh.applyQuaternion(quat);
    this.mesh = planeMesh;
    scene!.add( planeMesh );
  }

}

