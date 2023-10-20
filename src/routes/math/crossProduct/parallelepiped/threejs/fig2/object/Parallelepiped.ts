import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { Vector } from './Vector';

export class Parallelepiped {
	geometryVol : ConvexGeometry;
	materialVol : THREE.MeshBasicMaterial;
	meshVol : THREE.Mesh;
	veca: THREE.Vector3;
	vecb: THREE.Vector3;
	vecc: THREE.Vector3;
	lineMeshes: THREE.Line[];

	scene: THREE.Scene;
	constructor(scene:THREE.Scene,veca:THREE.Vector3,vecb:THREE.Vector3,vecc:THREE.Vector3,color?:string|number){
		const loader = new THREE.TextureLoader();
		const texture = loader.load( '/threejs/disc.png' );
		texture.colorSpace = THREE.SRGBColorSpace;

		this.veca=veca;
		this.vecb=vecb;
		this.vecc=vecc;
		this.scene = scene;
		this.materialVol =  new THREE.MeshBasicMaterial( { color: color?color: 0x00ff00 ,opacity: 0.5, transparent: true} );
		
		this.lineMeshes = this.createEdges();

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
			color: 0xffff00,
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

	createEdges(){
		const vecs: THREE.Vector3[] = [this.veca,this.vecb,this.vecc];
		const lineMaterial = new THREE.LineBasicMaterial({
			color: 0x222222,
			transparent: true,
			opacity: 0.5
		});
	
		const linePoints = [];
		linePoints.push([vecs[0], vecs[0].clone().add(vecs[1]) ]);
		linePoints.push([vecs[0], vecs[0].clone().add(vecs[2])]);
		linePoints.push([vecs[1], vecs[1].clone().add(vecs[0])]);
		linePoints.push([vecs[1], vecs[1].clone().add(vecs[2])]);
		linePoints.push([vecs[2], vecs[2].clone().add(vecs[0])]);
		linePoints.push([vecs[2], vecs[2].clone().add(vecs[1])]);
		linePoints.push([vecs[0].clone().add(vecs[1]).add(vecs[2]),vecs[2].clone().add(vecs[1])])
		linePoints.push([vecs[0].clone().add(vecs[1]).add(vecs[2]),vecs[0].clone().add(vecs[1])])
		linePoints.push([vecs[0].clone().add(vecs[1]).add(vecs[2]),vecs[2].clone().add(vecs[0])])
		return linePoints.map(ps => {
			const geometry = new THREE.BufferGeometry().setFromPoints( ps );
			const line = new THREE.Line( geometry, lineMaterial );
			this.scene.add( line );
			return line;
		})
		// const points = [];
	// points.push( new THREE.Vector3( - 10, 0, 0 ) );
	// points.push( new THREE.Vector3( 0, 10, 0 ) );
	// points.push( new THREE.Vector3( 10, 0, 0 ) );
	
	// const geometry = new THREE.BufferGeometry().setFromPoints( points );
	
	// const line = new THREE.Line( geometry, material );
	// scene.add( line );

	}
}