import { memo } from 'react';
import { Shader, SineWave, SolidColor, Pixelate, Plasma } from 'shaders/react';

const SakugaShaderScene = memo(function SakugaShaderScene() {
  return (
    <Shader className="absolute inset-0">
      <SolidColor color="#09060f" />
      <Pixelate
        gap={{
          type: 'map',
          curve: 0.35,
          source: 'idmmbhthud5inxgebqc',
          channel: 'alphaInverted',
          inputMax: 1,
          inputMin: 0,
          outputMax: 1,
          outputMin: 0.16,
        }}
        roundness={0.2}
        scale={74}
      >
        <Plasma balance={57} colorA="#ff0000" contrast={1.6} density={3.3} intensity={1.8} />
      </Pixelate>
      <SineWave id="idmmbhthud5inxgebqc" amplitude={0.1} angle={44} position={{ x: 0.66, y: 0.54 }} softness={1} thickness={0.9} visible={false} />
    </Shader>
  );
});

export default SakugaShaderScene;
