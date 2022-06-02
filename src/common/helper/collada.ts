import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

let stats: any, clock: any;
let camera: any, scene: any, renderer: any, elf: any;
export const Collada = (container: any) => {
  init(container);
  animate();

  function init(container: any) {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 3, 0);

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    // loading manager

    const loadingManager = new THREE.LoadingManager(function () {
      scene.add(elf);
    });

    // collada

    const loader = new ColladaLoader(loadingManager);
    loader.load('/models/ford.blend', function (collada) {
      elf = collada.scene;
    });

    //

    const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('rgb(255, 255, 255)', 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    //

    renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container?.appendChild(renderer.domElement);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    stats = new Stats();
    container?.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
  }

  function render() {
    const delta = clock.getDelta();

    if (elf !== undefined) {
      elf.rotation.z += delta * 0.5;
    }

    renderer.render(scene, camera);
  }
};
