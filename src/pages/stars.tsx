import * as React from 'react';

import { SEO } from '../components';

const Stars = () => {
  const [regenerateCounter, regenerate] = React.useReducer((c) => c + 1, 0);
  const [amount, setAmount] = React.useState(1000);

  // ramdomly generate little dots
  const stars = React.useMemo(() => {
    const result: { x: number; y: number; size: number }[] = [];

    for (let i = 0; i < amount; i += 1) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2;

      result.push({ x, y, size });
    }
    return result;
  }, [amount, regenerateCounter]);

  return (
    <div className="bg-black">
      <SEO title="stars" />
      <div className="absolute flex flex-col items-start gap-2 top-4 left-4">
        <label htmlFor="amount" className="flex items-center gap-2">
          Amount :
          <input
            id="amount"
            type="text"
            className="text-white bg-gray-800"
            defaultValue={amount}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);

              if (Number.isNaN(value) || value < 10 || value > 10000) {
                return;
              }

              setAmount(value);
            }}
          />
          <span className="text-xs text-gray-300">( 10 - 10000 )</span>
        </label>
      </div>
      <button
        onClick={() => regenerate()}
        type="button"
        className="absolute px-2 py-1 text-white -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded top-1/2 left-1/2"
      >
        regenerate
      </button>
      {stars.map((star, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="absolute animate-ping"
          style={{
            animation: `ping ${Math.random() * 10000 + 5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: 'white',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
