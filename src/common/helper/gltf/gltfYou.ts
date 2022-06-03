import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { MapBrandTo3DValue } from '../../constants/mapBrandToThreeD';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');

type GLTFloader = {
  container: any;
  obj: MapBrandTo3DValue[];
};

export const gltfLoader = ({ container, obj }: GLTFloader) => {
  const brandInfo = obj[0];
  let scene: any,
    camera: any,
    renderer: any,
    car: any,
    ground: any,
    light1: any,
    light2: any,
    light3: any,
    light4: any,
    isMouseDown = false;

  function init() {
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = brandInfo.camera?.position?.x;
    camera.position.y = brandInfo.camera?.position?.y;
    camera.position.z = brandInfo.camera?.position?.z;

    ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100000, 100000),
      new THREE.MeshPhongMaterial({ color: 'rgb(55, 55, 55)', depthWrite: false }),
    );
    ground.position.y = 11;
    ground.receiveShadow = true;
    // scene.add(ground);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);

    // light
    const hlight = new THREE.AmbientLight(0x404040, brandInfo?.directLightIntensity || 50);
    scene.add(hlight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    if (brandInfo.needAdditionalLight) {
      light1 = new THREE.PointLight(0xc4c4c4, 10);
      light1.position.set(0, 300, 500);
      scene.add(light1);

      light2 = new THREE.PointLight(0xc4c4c4, 10);
      light2.position.set(500, 0, 0);
      scene.add(light2);

      light3 = new THREE.PointLight(0xc4c4c4, 10);
      light3.position.set(0, 10, -500);
      scene.add(light3);

      light4 = new THREE.PointLight(0xc4c4c4, 10);
      light4.position.set(-500, 300, 500);
      scene.add(light4);
    }

    container.appendChild(renderer.domElement);

    //
    // load 3d car
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(brandInfo.link, function (gltf) {
      car = gltf.scene.children[0];
      car.scale.set(brandInfo.scale?.x, brandInfo.scale?.y, brandInfo.scale?.z);
      scene.add(gltf.scene);
      animate3dCar();
    });

    //
    // load cloud
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  }
  function onMouseDown() {
    isMouseDown = true;
  }

  function onMouseUp() {
    isMouseDown = false;
  }

  function render() {
    renderer.render(scene, camera);
  }

  function animate3dCar() {
    requestAnimationFrame(animate3dCar);
    if (!isMouseDown) {
      car.rotation.z += 0.005;
    }
    ground.rotation.x = -Math.PI / 2;
    renderer.render(scene, camera);
  }

  init();
};
