import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useLayoutEffect, useRef } from 'react';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec3 pos = position.xyz;

  // // Apply fluid transformation
  // float noise1 = cnoise(vec3(pos * 0.8, uTime * 0.2));
  // float noise2 = cnoise(vec3(pos * 1.5, uTime * 0.5));
  // float noise3 = cnoise(vec3(pos * 2.5, uTime * 0.3));
  // vec3 noiseVec = vec3(noise1, noise2, noise3);
  // pos += noiseVec * 0.1;

  // // Add mouse displacement
  // float dist = distance(gl_Vertex.xy / uResolution.xy, uMouse);
  // pos.z += smoothstep(0.2, 0.0, dist) * 0.5;

  // Set position and UV
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform float uDensity;
uniform float uWeight;
uniform float uRadius;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vUv;

void main() {
  vec3 color = vec3(0.0);

  // Calculate fluid density
  for (float x = -uRadius; x < uRadius; x += uWeight) {
    for (float y = -uRadius; y < uRadius; y += uWeight) {
      float dist = length(vec2(x, y));
      if (dist < uRadius) {
        float density = 1.0 - pow(dist / uRadius, 2.0);
        density *= uDensity;
        color += mix(uColor1, uColor2, vUv.x) * density;
        color += mix(uColor2, uColor3, vUv.y) * density;
      }
    }
  }

  // Apply post-processing
  color *= 1.0 - pow(abs(vUv.x - 0.5), 10.0);
  color *= 1.0 - pow(abs(vUv.y - 0.5), 10.0);
  color *= smoothstep(0.0, 0.1, length(vUv - vec2(0.5)));

  // Set fragment color
  gl_FragColor = vec4(color, 1.0);
}
`;

const fluidMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uMouse: { value: new THREE.Vector2(10000, 10000) },
    uDensity: { value: 0.4 },
    uWeight: { value: 0.02 },
    uRadius: { value: 0.1 },
    uColor1: { value: new THREE.Color('#ff9966') },
    uColor2: { value: new THREE.Color('#f44242') },
    uColor3: { value: new THREE.Color('#4227f4') },
  },
  vertexShader,
  fragmentShader,
});

const FluidSimulation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

      const geometry = new THREE.PlaneGeometry(2, 2);
      const fluidMesh = new THREE.Mesh(geometry, fluidMaterial); // Utilisation du material

      scene.add(fluidMesh);

      window.addEventListener('resize', onWindowResize, false);

      animate();
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default FluidSimulation;
