import * as React from 'react';
import styled from 'styled-components';
import Particles from 'react-particles-js';

import { SEO } from '../components';

const Container = styled.div`
  background-color: black;
`;

const StyledParticles = styled(Particles)`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const Stars = () => (
  <Container>
    <SEO title="stars" />
    <StyledParticles
      params={{
        particles: {
          number: {
            value: 512,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: '#fff',
          },
          shape: {
            type: 'circle',
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.75,
            random: false,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.125,
              sync: false,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: true,
              speed: 0.25,
              size_min: 1,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.0375,
            direction: 'top',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'bubble',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 128,
              size: 1,
              duration: 2,
              opacity: 0.875,
              speed: 5,
            },
          },
        },
        retina_detect: true,
      }}
    />
  </Container>
);

export default Stars;
