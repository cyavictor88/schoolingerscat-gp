import * as THREE from 'three';
import { TickingWorld } from './TickingWorld';
import EventEmitter from 'eventemitter3';
import { mathmesh } from '$lib/mathmesh/mathmesh';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector } from './object/Vector';
import { Axes } from './object/Axes';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { MathText } from './object/MathText';
import { Polygon2D } from './object/Polygon2D';
import { Parallelepiped } from './object/Parallelepiped';
import { Plane } from './object/Plane';
import TWEEN from '@tweenjs/tween.js';
import { Line } from './object/Line';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'



export enum Dir {
  X,
  Y,
  Z
}

export const unitVec = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
}

export class Universe {
  // export class World extends EventEmitter {
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  tickingWorld: TickingWorld;
  eventBroker: EventEmitter;
  controls: OrbitControls;
  font!: Font;
  canvasSize = { w: 500, h: 400 };




  veca: Vector;
  vecb: Vector;
  vecv: Vector;
  axes: Axes;

  v1Line: Line;

  fig4triangle: Polygon2D | null = null;
  zoomIn: boolean = false;
  scale: number = 1;

  timePass = 0;

  fps = 0;



  constructor(refCurrent: HTMLDivElement, veca: [number, number, number], vecb: [number, number, number], vecc: [number, number, number], zoomIn: boolean) {
    this.zoomIn = zoomIn;
    if (this.zoomIn) this.scale = 5;
    this.eventBroker = new EventEmitter();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightblue');
    this.camera = this.initCamera();
    if (!zoomIn) {
      this.camera.position.set(5.44, 18., 22);
      this.camera.position.set(0, 18., 0);
      this.camera.zoom = 2.06;
      this.camera.updateProjectionMatrix()
    } else {
      this.camera.position.set(5.44, 18., 22);
      this.camera.position.set(5, 5, 5);
      this.camera.zoom = 2.06;
      this.camera.updateProjectionMatrix()
    }

    // const mainLight = new THREE.PointLight('green', 2, 50);
    // mainLight.position.set(0, 5, 0);
    // this.scene.add(mainLight);


    // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    // const helper = new THREE.HemisphereLightHelper( light, 5 );
    // scene.add( helper );

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(light);


    // const helper = new THREE.AxesHelper(10);
    // helper.position.set(0, 0, 0);
    // const ghelper = new THREE.GridHelper(10, 10);
    // ghelper.rotation.x = Math.PI / 2;
    // ghelper.position.set(0, 0, 0);
    // this.scene.add(ghelper);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true, //https://discourse.threejs.org/t/how-to-save-rendering-scene-to-img/41858/3
    });
    this.tickingWorld = new TickingWorld(this.camera, this.scene, this.renderer);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);
    refCurrent.appendChild(this.renderer.domElement);
    this.eventBroker.on("hello", (data) => { console.log(data) });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.update();

    // universe setup done

    // this.controls.addEventListener('change', () => {
    //   const cameraPosition = this.camera.position.clone();

    //   console.log('Camera Position:', cameraPosition,this.camera.zoom);
    // });
    const plane = new Plane(this.scene, [0, 0, 0], 18, 18, new THREE.Vector3(1, 0, 0));
    plane.mesh.visible = false;

    // this.veca = new Vector(-1,2,3,0x008800);
    // this.vecb = new Vector(4,3,5,0x0000ff);
    // this.vecv = new Vector(-4,4,-5,0xff0000);
    if (!zoomIn) {
      this.veca = new Vector(...veca, 0xff0000);
      this.vecb = new Vector(...vecb, 0x0000ff);
      this.vecv = new Vector(...vecc, 0x008800);
    } else {
      this.veca = new Vector(veca[0] * this.scale, veca[1] * this.scale, veca[2] * this.scale, 0xff0000);
      this.vecb = new Vector(vecb[0] * this.scale, vecb[1] * this.scale, vecb[2] * this.scale, 0x0000ff);
      this.vecv = new Vector(vecc[0] * this.scale, vecc[1] * this.scale, vecc[2] * this.scale, 0x008800);
    }


    // this.vecvrossProduct = new Vector(cp.x,cp.y,cp.z,0xff0000);

    this.scene.add(this.veca.vector);
    this.scene.add(this.vecb.vector);
    this.scene.add(this.vecv.vector);
    this.axes = this.zoomIn ? new Axes(this, 10, 10, 10, this.scale) : new Axes(this, 10, 10, 10, 1);
    this.v1Line = new Line([this.vecv.coord.x, 0, this.vecv.coord.z], [0, 0, this.vecv.coord.z], 'red', true);
    this.scene.add(this.v1Line.lineMesh);
    this.v1Line.lineMesh.visible = false;


    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      this.v1Line.setText(font, 'V1', new THREE.Vector3(this.vecv.coord.x / 2, 0, this.vecv.coord.z));
      this.scene.add(this.v1Line.textMesh!);
      this.v1Line.textMesh!.visible = false;
    });



    const pp = new Parallelepiped(this.scene, this.veca.coord, this.vecb.coord, this.vecv.coord);


    this.eventBroker.on('toggleShowHeight', () => {
      plane.mesh.visible = false;
      this.v1Line.lineMesh.visible = true;
      this.v1Line.textMesh!.visible = true;
      const duration = 1000;
      const cameraPodTween = new TWEEN.Tween(this.camera.position)
        .to(new THREE.Vector3(0, 20, 0), duration)
        .easing(TWEEN.Easing.Quadratic.Out) // You can choose a different easing function
        .onUpdate(() => {
          this.camera.lookAt(new THREE.Vector3());
          this.camera.updateProjectionMatrix();
          this.v1Line.textMesh!.lookAt(this.camera.position)

        })
        .start()
        .onComplete(() => {
          // Animation is complete
          this.camera.lookAt(new THREE.Vector3());
          // this.camera.rotation.set(0,0,0);
        });

      const zoomProp = { zoom: 1 }
      const cameraZoomTween = new TWEEN.Tween(zoomProp)
        .to({ zoom: 0.8 }, duration)
        .easing(TWEEN.Easing.Quadratic.Out) // You can choose a different easing function
        .onUpdate((val) => {
          this.camera.zoom = val.zoom;
          this.camera.updateProjectionMatrix();
        })
        .start()
        .onComplete(() => {
          // Animation is complete
          console.log('zoom tween complete');
        });
    });


    this.eventBroker.on('toggleYZPlane', () => {
      plane.mesh.visible = !plane.mesh.visible;
      this.v1Line.lineMesh.visible = false;
      this.v1Line.textMesh!.visible = false;

      const duration = 1000;
      const cameraPodTween = new TWEEN.Tween(this.camera.position)
        .to(new THREE.Vector3(20, 0, 0), duration)
        .easing(TWEEN.Easing.Quadratic.Out) // You can choose a different easing function
        .onUpdate(() => {
          this.camera.lookAt(new THREE.Vector3());
        })
        .start()
        .onComplete(() => {
          // Animation is complete
          console.log('Animation complete');
          this.camera.lookAt(new THREE.Vector3());
          this.camera.zoom = 0.8 * this.camera.zoom;
          this.camera.updateProjectionMatrix()
        });

      const zoomProp = { zoom: 1 }
      const cameraZoomTween = new TWEEN.Tween(zoomProp)
        .to({ zoom: 0.8 }, duration)
        .easing(TWEEN.Easing.Quadratic.Out) // You can choose a different easing function
        .onUpdate((val) => {
          this.camera.zoom = val.zoom;
          this.camera.updateProjectionMatrix();
        })
        .start()
        .onComplete(() => {
          // Animation is complete
          console.log('zoom tween complete');
        });

    });
    (TWEEN as any).tick = () => {
      TWEEN.update();
    }
    this.tickingWorld.updatables.push(TWEEN)

    // const loader = new FontLoader();
    // loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    //   this.font = font;
    //   const d = new Line(this.veca.coord.toArray(),this.vecb.coord.toArray(),'brown',true);
    //   d.setText(this.font,'d');
    //   this.scene.add(d.lineMesh,d.textMesh!);

    //   // playing with updateable in tickingworld
    //   (d.textMesh as any).scaler = 1.1;
    //   (d.textMesh as any).cnt = 0;
    //   (d.textMesh as any).tick = function(delta:number){
    //     (d.textMesh as any).cnt += 1;
    //     (d.textMesh as any).cnt %= 5;
    //     if((d.textMesh as any).cnt>0) return
    //     const scale = d.textMesh!.scale.clone();
    //     if(scale.length()>2.5) (d.textMesh as any).scaler-=0.1;
    //     if(scale.length()<1.5) (d.textMesh as any).scaler+=0.1;
    //     d.textMesh!.scale.set(...scale.multiplyScalar((d.textMesh as any).scaler).toArray());
    //   }
    //   this.tickingWorld.updatables.push(d.textMesh);
    // });




    this.eventBroker.on('setMathMeshes', () => { this.setMathMeshes() });
    this.eventBroker.on('setRightHand', () => { this.setRightHand() });
    this.eventBroker.on('showFig4Triangle', () => { this.showFig4Triangle() });


  }

  showFig4Triangle() {
    if (!this.fig4triangle) {
      this.fig4triangle = new Polygon2D([this.veca.coord, this.vecb.coord, new THREE.Vector3()], 'lightgrey')
      this.scene.add(this.fig4triangle.mesh);
    } else {
      this.fig4triangle.mesh.visible = !this.fig4triangle.mesh.visible;
    }

  }

  async setRightHand() {
    const gltfLoader = new GLTFLoader();

    const loadedData = await gltfLoader.loadAsync('/glbs/rightHand2.glb');
    // console.log(loadedData)
    const model = loadedData.scene.children[0];
    model.position.set(0, 0, 0);
    const [veca, vecb] = [new THREE.Vector3(), new THREE.Vector3()];
    veca.copy(this.veca.coord);
    vecb.copy(this.vecb.coord);
    const cross = new THREE.Vector3().crossVectors(veca, vecb);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), cross.normalize());
    const quat1 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.acos(new THREE.Vector3(0, 1, 0).dot(veca.normalize())));
    quat.multiply(quat1);
    model.applyQuaternion(quat);

    if (!this.zoomIn) {
      model.scale.set(0.1, 0.1, 0.1);
    } else {
      model.scale.set(0.1, 0.1, 0.1);
    }
    model.visible = true;


    const clip = loadedData.animations[0];

    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();


    (model as any).tick = (delta: number) => {
      this.fps = 1/(delta);
      this.eventBroker.emit('fps',this.fps.toFixed())
      if(this.fps>120) mixer.update(delta*10)
      else mixer.update(delta)

    }


    this.scene.add(model);
    this.tickingWorld.updatables.push(model);
  }

  async setMathMeshes() {
    const scale = this.scale;
    const mathTexta = await MathText.Init(`\\vec{v_1}=(${this.veca.coord.x / scale},${this.veca.coord.y / scale},${this.veca.coord.z / scale}) `, 'red');
    mathTexta.mesh.position.set(this.veca.coord.x, this.veca.coord.y, this.veca.coord.z);
    this.scene.add(mathTexta.mesh);

    const mathTextb = await MathText.Init(`\\vec{v_2}=(${this.vecb.coord.x / scale},${this.vecb.coord.y / scale},${this.vecb.coord.z / scale}) `, 'blue');
    mathTextb.mesh.position.set(this.vecb.coord.x, this.vecb.coord.y, this.vecb.coord.z)
    this.scene.add(mathTextb.mesh);

    const mathTextv = await MathText.Init(`\\vec{v_3}=(${this.vecv.coord.x / scale},${this.vecv.coord.y / scale},${this.vecv.coord.z / scale})`, 'green');
    mathTextv.mesh.position.set(this.vecv.coord.x, this.vecv.coord.y, this.vecv.coord.z)
    this.scene.add(mathTextv.mesh);



    // const theta = await Theta.Init(this.veca.coord,this.vecb.coord);
    // this.scene.add(theta.curveMesh);
    // this.scene.add(theta.textMesh.mesh);


  }

  async addMathMesh() {
    const mm = await mathmesh("\\int_{a}^{b}x^2 \\,dx \\frac{3}{4} \\vec{a}");
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(mm.vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);
  }



  initCamera() {
    const aspect = this.canvasSize.w / this.canvasSize.h;

    const frustumSize = 40;
    const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 40);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    return camera;
  }

  start() {
    this.tickingWorld.start();
  }

  stop() {
    this.tickingWorld.stop();
  }

}