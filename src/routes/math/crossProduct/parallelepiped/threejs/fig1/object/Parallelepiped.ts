import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { Vector } from './Vector';

export class Parallelepiped {
	geometryVol : ConvexGeometry;
	materialVol : THREE.MeshBasicMaterial;
	meshVol : THREE.Mesh;
	scene: THREE.Scene;
	constructor(scene:THREE.Scene,veca:THREE.Vector3,vecb:THREE.Vector3,vecc:THREE.Vector3,color?:string|number){
		const loader = new THREE.TextureLoader();
		const texture = loader.load( '/threejs/disc.png' );
		texture.colorSpace = THREE.SRGBColorSpace;

		this.scene = scene;
		this.materialVol =  new THREE.MeshBasicMaterial( { color: color?color: 0x00ff00 ,opacity: 0.5, transparent: true} );
		
		const vertices : THREE.Vector3[] = []
		vertices.push(new THREE.Vector3());
		vertices.push(new THREE.Vector3(veca.x,veca.y,veca.z));
		vertices.push(new THREE.Vector3(vecb.x,vecb.y,vecb.z));
		vertices.push(new THREE.Vector3(vecc.x,vecc.y,vecc.z));
		vertices.push(new THREE.Vector3(veca.x+vecb.x,veca.y+vecb.y,veca.z+vecb.z));
		vertices.push(new THREE.Vector3(veca.x+vecc.x,veca.y+vecc.y,veca.z+vecc.z));
		vertices.push(new THREE.Vector3(vecc.x+vecb.x,vecc.y+vecb.y,vecc.z+vecb.z));
		vertices.push(new THREE.Vector3(vecc.x+vecb.x+veca.x,vecc.y+vecb.y+veca.y,vecc.z+vecb.z+veca.z));


		const pointsMaterial = new THREE.PointsMaterial( {
			color: 0x000000,
			size: 8,
			alphaTest: 0.5,
			transparent:true,
			opacity: 0.8,
			map: texture,
		} );

		const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

		const points = new THREE.Points( pointsGeometry, pointsMaterial );

		this.scene.add(points)


		this.geometryVol = new ConvexGeometry(vertices);
		this.meshVol = new THREE.Mesh(this.geometryVol,this.materialVol);
		this.scene.add(this.meshVol)

	}
  // const geometry = new ConvexGeometry( points );
	// 	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// 	const mesh = new THREE.Mesh( geometry, material );
	// 	scene.add( mesh );
}