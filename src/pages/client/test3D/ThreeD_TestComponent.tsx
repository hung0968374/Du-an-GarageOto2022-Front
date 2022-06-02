import React, { useCallback, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

const ThreeD_Test = () => {
  const containerRef = useRef<any>();

  const initialize3D = useCallback(({ scene, camera, renderer }) => {
    init();

    function init() {
      scene.background = new THREE.Color(0xa0a0a0);
      scene.fog = new THREE.Fog(0xa0a0a0, 10, 500);

      camera.position.set(-50, 40, 50);
      scene.add(camera);

      //

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 100, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(-0, 40, 50);
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 50;
      dirLight.shadow.camera.bottom = -25;
      dirLight.shadow.camera.left = -25;
      dirLight.shadow.camera.right = 25;
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 200;
      dirLight.shadow.mapSize.set(1024, 1024);
      scene.add(dirLight);

      // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

      //

      const manager = new THREE.LoadingManager();

      const loader = new ThreeMFLoader(manager);
      loader.load('models/truck2.3mf', function (object: any) {
        // loader.load('models/porsche/porsche.obj', function (object: any) {
        object.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)); // z-up conversion

        object.traverse(function (child: any) {
          child.castShadow = true;
        });

        scene.add(object);
      });

      //

      manager.onLoad = function () {
        render();
      };

      //

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }),
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 11;
      ground.receiveShadow = true;
      scene.add(ground);

      //

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      containerRef.current.appendChild(renderer.domElement);

      //

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener('change', render);
      controls.minDistance = 50;
      controls.maxDistance = 200;
      controls.enablePan = false;
      controls.target.set(0, 20, 0);
      controls.update();

      window.addEventListener('resize', onWindowResize);

      render();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }
  }, []);
  React.useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    initialize3D({ scene, camera, renderer });
  }, [initialize3D]);

  return (
    <>
      <div ref={containerRef}></div>
    </>
  );
};

export default ThreeD_Test;
