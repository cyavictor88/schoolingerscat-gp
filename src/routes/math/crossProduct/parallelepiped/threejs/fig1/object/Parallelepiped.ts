import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { Vector } from './Vector';

export class Parallelepiped {
	geometry : ConvexGeometry;
	material : THREE.MeshBasicMaterial;
	mesh : THREE.Mesh;
	scene: THREE.Scene;
	constructor(scene:THREE.Scene,veca:THREE.Vector3,vecb:THREE.Vector3,vecc:THREE.Vector3,color?:string|number){
		this.scene = scene;
		this.material =  new THREE.MeshBasicMaterial( { color: color?color: 0x00ff00 } );
		
		const points : THREE.Vector3[] = []
		points.push(new THREE.Vector3());
		points.push(new THREE.Vector3(veca.x,veca.y,veca.z));
		points.push(new THREE.Vector3(vecb.x,vecb.y,vecb.z));
		points.push(new THREE.Vector3(vecc.x,vecc.y,vecc.z));
		points.push(new THREE.Vector3(veca.x+vecb.x,veca.y+vecb.y,veca.z+vecb.z));
		points.push(new THREE.Vector3(veca.x+vecc.x,veca.y+vecc.y,veca.z+vecc.z));
		points.push(new THREE.Vector3(vecc.x+vecb.x,vecc.y+vecb.y,vecc.z+vecb.z));
		points.push(new THREE.Vector3(vecc.x+vecb.x+veca.x,vecc.y+vecb.y+veca.y,vecc.z+vecb.z+veca.z));
		this.geometry = new ConvexGeometry(points);
		this.mesh = new THREE.Mesh(this.geometry,this.material);
		this.scene.add(this.mesh)

	}
  // const geometry = new ConvexGeometry( points );
	// 	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// 	const mesh = new THREE.Mesh( geometry, material );
	// 	scene.add( mesh );
}