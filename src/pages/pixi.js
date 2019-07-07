import React, { useEffect, useRef, useMemo } from 'react';
// import * as pixi from 'pixi.js';
import styled from 'styled-components';

const Container = styled.div`
  background: #fff;
  height: 100%;
  width: 100%;
`;

// function keyboard(value) {
//   const key = {};
//
//   key.value = value;
//   key.isDown = false;
//   key.isUp = true;
//   key.press = undefined;
//   key.release = undefined;
//   // The `downHandler`
//   key.downHandler = event => {
//     if (event.key === key.value) {
//       if (key.isUp && key.press) key.press();
//       key.isDown = true;
//       key.isUp = false;
//       event.preventDefault();
//     }
//   };
//
//   // The `upHandler`
//   key.upHandler = event => {
//     if (event.key === key.value) {
//       if (key.isDown && key.release) key.release();
//       key.isDown = false;
//       key.isUp = true;
//       event.preventDefault();
//     }
//   };
//
//   // Attach event listeners
//   const downListener = key.downHandler.bind(key);
//   const upListener = key.upHandler.bind(key);
//
//   window.addEventListener('keydown', downListener, false);
//   window.addEventListener('keyup', upListener, false);
//
//   // Detach event listeners
//   key.unsubscribe = () => {
//     window.removeEventListener('keydown', downListener);
//     window.removeEventListener('keyup', upListener);
//   };
//
//   return key;
// }
//
// function hitTestRectangle(r1, r2) {
//   // Define the variables we'll need to calculate
//   let hit;
//
//   let combinedHalfWidths;
//
//   let combinedHalfHeights;
//
//   let vx;
//
//   let vy;
//
//   // hit will determine whether there's a collision
//   hit = false;
//
//   // Find the center points of each sprite
//   r1.centerX = r1.x + r1.width / 2;
//   r1.centerY = r1.y + r1.height / 2;
//   r2.centerX = r2.x + r2.width / 2;
//   r2.centerY = r2.y + r2.height / 2;
//
//   // Find the half-widths and half-heights of each sprite
//   r1.halfWidth = r1.width / 2;
//   r1.halfHeight = r1.height / 2;
//   r2.halfWidth = r2.width / 2;
//   r2.halfHeight = r2.height / 2;
//
//   // Calculate the distance vector between the sprites
//   vx = r1.centerX - r2.centerX;
//   vy = r1.centerY - r2.centerY;
//
//   // Figure out the combined half-widths and half-heights
//   combinedHalfWidths = r1.halfWidth + r2.halfWidth;
//   combinedHalfHeights = r1.halfHeight + r2.halfHeight;
//
//   // Check for a collision on the x axis
//   if (Math.abs(vx) < combinedHalfWidths) {
//     // A collision might be occurring. Check for a collision on the y axis
//     if (Math.abs(vy) < combinedHalfHeights) {
//       // There's definitely a collision happening
//       hit = true;
//     } else {
//       // There's no collision on the y axis
//       hit = false;
//     }
//   } else {
//     // There's no collision on the x axis
//     hit = false;
//   }
//
//   // `hit` will be either `true` or `false`
//   return hit;
// }
//
// const { Graphics, Application } = pixi;
//
// const rectangle = new Graphics();
//
// rectangle.lineStyle(4, 0xff3300, 1);
// rectangle.beginFill(0x66ccff);
// rectangle.drawRect(0, 0, 64, 64);
// rectangle.endFill();
// rectangle.x = 170;
// rectangle.y = 170;
//
// const circle = new Graphics();
//
// circle.beginFill(0x9966ff);
// circle.drawCircle(0, 0, 32);
// circle.endFill();
// circle.x = 64;
// circle.y = 130;
//
// const keyLeft = keyboard('ArrowLeft');
// const keyUp = keyboard('ArrowUp');
// const keyRight = keyboard('ArrowRight');
// const keyDown = keyboard('ArrowDown');

function Pixi() {
  const containerRef = useRef();
  // const app = useMemo(
  //   () =>
  //     new Application({
  //       width: 500,
  //       height: 500,
  //       antialias: true, // default: false
  //       transparent: false, // default: false
  //       resolution: 1,
  //     }),
  //   []
  // );
  //
  // useEffect(() => {
  //   if (containerRef.current && containerRef.current.childElementCount === 0) {
  //     containerRef.current.appendChild(app.view);
  //
  //     app.stage.addChild(rectangle);
  //     app.stage.addChild(circle);
  //
  //     keyLeft.press = () => (circle.x -= 5);
  //     keyUp.press = () => (circle.y -= 5);
  //     keyRight.press = () => (circle.x += 5);
  //     keyDown.press = () => (circle.y += 5);
  //
  //     let counter = 0;
  //
  //     app.ticker.add(delta => {
  //       if (hitTestRectangle(circle, rectangle)) {
  //         if (counter === 0) {
  //           alert('collision');
  //           counter += 1;
  //         }
  //       } else if (counter !== 0) {
  //         counter = 0;
  //       }
  //     });
  //   }
  //
  //   () => containerRef.current.removeChild(containerRef.current.firstChild);
  // }, [containerRef.current]);

  return <Container ref={containerRef} />;
}

export default Pixi;
