import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export function try1(divContent: HTMLDivElement, canvas: HTMLCanvasElement) {

  let renderer: THREE.WebGLRenderer;
  const scenes: THREE.Scene[] = [];
  init();
  function init() {
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.5, 12, 8),
      new THREE.DodecahedronGeometry(0.5),
      new THREE.CylinderGeometry(0.5, 0.5, 1, 12)
    ];

    for (let i = 0; i < 50; i++) {

      const scene = new THREE.Scene();

      // make a list item
      const element = document.createElement('div');
      element.className = 'list-item';

      const sceneElement = document.createElement('div');
      element.appendChild(sceneElement);

      const descriptionElement = document.createElement('div');
      descriptionElement.innerText = 'Scene ' + (i + 1);
      element.appendChild(descriptionElement);

      // the element that represents the area we want to render the scene
      scene.userData.element = sceneElement;
      divContent.appendChild(element);

      const camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
      camera.position.z = 2;
      scene.userData.camera = camera;

      const controls = new OrbitControls(scene.userData.camera, scene.userData.element);
      controls.minDistance = 2;
      controls.maxDistance = 5;
      controls.enablePan = false;
      controls.enableZoom = false;
      scene.userData.controls = controls;

      // add one random mesh to each scene
      const geometry = geometries[geometries.length * Math.random() | 0];

      const material = new THREE.MeshStandardMaterial({

        color: new THREE.Color().setHSL(Math.random(), 1, 0.75, THREE.SRGBColorSpace),
        roughness: 0.5,
        metalness: 0,
        flatShading: true

      });

      scene.add(new THREE.Mesh(geometry, material));

      scene.add(new THREE.HemisphereLight(0xaaffaa, 0xaa4444, 3));

      const light = new THREE.DirectionalLight(0xff00ff, 1.5);
      light.position.set(1, 1, 1);
      scene.add(light);

      scenes.push(scene);

    }


    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor(0xaaffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    animate();

  }

  function updateSize() {

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {

      renderer.setSize(width, height, false);

    }

  }

  function animate() {

    render();
    requestAnimationFrame(animate);

  }

  function render() {
    // console.log('multi scenes reander')
    updateSize();

    // canvas.style.transform = `translateY(${window.scrollY}px)`;

    renderer.setClearColor(0xffffaa);
    renderer.setScissorTest(false);
    renderer.clear();

    renderer.setClearColor(0xe0e0e0);
    renderer.setScissorTest(true);

    let vicbutt = 100;
    scenes.forEach(function (scene) {

      // so something moves
      scene.children[0].rotation.y = Date.now() * 0.001;

      // get the element that is a place holder for where we want to
      // draw the scene
      const element = scene.userData.element;

      // get its position relative to the page's viewport
      const rect = element.getBoundingClientRect();
      // check if it's offscreen. If so skip it
      if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
        rect.right < 0 || rect.left > renderer.domElement.clientWidth) {
          console.log('it off screen')
        return; // it's off screen  

      }

      // set the viewport
      const width = rect.right - rect.left;
      const height = 100;//rect.bottom - rect.top;
      const left = rect.left;
      const bottom = vicbutt;//renderer.domElement.clientHeight - rect.bottom;
      console.log('dims',left,bottom,width,height)

      renderer.setViewport(left, bottom, width, height);
      renderer.setScissor(left, bottom, width, height);

      const camera = scene.userData.camera;

      camera.aspect = width / height; // not changing in this example
      camera.updateProjectionMatrix();

      scene.userData.controls.update();

      renderer.render(scene, camera);
      vicbutt+=100;

    });

  }
}