import * as React from 'react';

export function meta() {
  return [{ title: 'Stars' }, { name: 'description', content: 'Stars' }];
}

export default function Stars() {
  const [regenerateCounter, regenerate] = React.useReducer((c: number) => c + 1, 0);
  const [amount, setAmount] = React.useState(1000);

  const stars = React.useMemo(() => {
    const result: { x: number; y: number; size: number }[] = [];
    for (let i = 0; i < amount; i += 1) {
      result.push({ x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 });
    }
    return result;
  }, [amount, regenerateCounter]);

  return (
    <div className="h-full w-full bg-black">
      <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
        <label htmlFor="amount" className="flex items-center gap-2">
          Amount :
          <input
            id="amount"
            type="text"
            className="bg-gray-800 text-white"
            defaultValue={amount}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              if (Number.isNaN(value) || value < 10 || value > 10000) return;
              setAmount(value);
            }}
          />
          <span className="text-xs text-gray-300">( 10 - 10000 )</span>
        </label>
      </div>
      <button onClick={() => regenerate()} type="button" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-white">
        regenerate
      </button>
      {stars.map((star, index) => (
        <div
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
}
