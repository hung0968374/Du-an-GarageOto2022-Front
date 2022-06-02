import React, { useRef } from 'react';
import * as THREE from 'three';

const ThreeDcomponent = () => {
  const containerRef = useRef<any>();

  const initialize3D = () => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    containerRef?.current?.appendChild(renderer.domElement);

    function animation(time: any) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  };
  React.useEffect(() => {
    initialize3D();
    console.log('containerRef', containerRef.current);
  }, []);

  return <div ref={containerRef}>ThreeDcomponent</div>;
};

export default ThreeDcomponent;
