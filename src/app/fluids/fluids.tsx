'use client';

import * as React from 'react';
import * as THREE from 'three';

const FluidSimulation = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  const onWindowResize = () => {
    const container = containerRef.current;
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  const init = () => {
    const container = containerRef.current;
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.position.z = 5;

      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // const geometry = new THREE.PlaneGeometry(2, 2);
      // const fluidMesh = new THREE.Mesh(geometry, fluidMaterial); // Utilisation du material

      // scene.add(fluidMesh);

      window.addEventListener('resize', onWindowResize, false);

      animate();
    }
  };

  React.useEffect(() => {
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default FluidSimulation;
