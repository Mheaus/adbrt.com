import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useLayoutEffect, useRef } from 'react';

const FluidSimulation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Setup
    const container = containerRef.current;
    const renderer = new THREE.WebGLRenderer();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const scene = new THREE.Scene();
    const controls = new OrbitControls(camera, container);

    // Fluid simulation parameters
    const gridSize = 128;
    const viscosity = 0.1;
    const diffusion = 0.1;
    const dt = 0.1;
    const iterations = 16;

    // Create the fluid simulation geometry
    const fluidGeometry = new THREE.PlaneBufferGeometry(10, 10, gridSize, gridSize);

    // Create the velocity field
    const velocityField = new THREE.DataTexture(
      new Float32Array(gridSize * gridSize * 4),
      gridSize,
      gridSize,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    velocityField.minFilter = THREE.NearestFilter;
    velocityField.magFilter = THREE.NearestFilter;
    velocityField.generateMipmaps = false;

    // Create the pressure field
    const pressureField = new THREE.DataTexture(
      new Float32Array(gridSize * gridSize),
      gridSize,
      gridSize,
      THREE.LuminanceFormat,
      THREE.FloatType
    );
    pressureField.minFilter = THREE.NearestFilter;
    pressureField.magFilter = THREE.NearestFilter;
    pressureField.generateMipmaps = false;

    // Create the material for the fluid simulation
    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        velocityField: { value: velocityField },
        pressureField: { value: pressureField },
        viscosity: { value: viscosity },
        diffusion: { value: diffusion },
        dt: { value: dt },
        gridSize: { value: gridSize },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D velocityField;
        uniform sampler2D pressureField;
        uniform float viscosity;
        uniform float diffusion;
        uniform float dt;
        uniform int gridSize;

        float getVelocity(int x, int y, int z) {
          vec4 velocity = texture2D(velocityField, vec2(float(x) / float(gridSize), float(y) / float(gridSize)));
          if (z == 0) {
            return velocity.x;
          } else if (z == 1) {
            return velocity.y;
          } else {
            return velocity.z;
          }
        }

        void main() {
          float dx = 1.0 / float(gridSize);
          float dtvisc = viscosity * dt / (dx * dx);
          float dtdiff = diffusion * dt / (dx * dx);

          // Compute the Laplacian of
