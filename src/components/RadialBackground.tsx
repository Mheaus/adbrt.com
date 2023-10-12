'use client';

import * as React from 'react';
import { hslToColorString, radialGradient } from 'polished';

import { useInterval } from '../hooks';

interface HueState {
  degree: number;
  mode: 'INCREASE' | 'DECREASE';
}

const RadialBackground = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { children } = props;
  const [hueState, setHueState] = React.useState<HueState>({ degree: 128, mode: 'INCREASE' });

  useInterval(
    () =>
      setHueState((prevState) => {
        if (prevState.degree === 300) return { degree: 299, mode: 'DECREASE' };
        if (prevState.degree === 128) return { degree: 129, mode: 'INCREASE' };

        return { ...prevState, degree: prevState.mode === 'INCREASE' ? prevState.degree + 1 : prevState.degree - 1 };
      }),
    250,
  );

  return (
    <div
      {...props}
      className="flex items-center text-white float-right justify-center relative transition-all duration-1000 h-full w-full min-w-[55%]"
      style={{
        ...radialGradient({
          shape: 'ellipse',
          extent: 'at top right',
          colorStops: [hslToColorString({ hue: hueState.degree, saturation: 0.75, lightness: 0.5 }), hslToColorString({ hue: hueState.degree + 96, saturation: 0.625, lightness: 0.375 })],
        }),
      }}
    >
      {children}
    </div>
  );
};

export default RadialBackground;
