import * as React from 'react';

function useProgressiveState<R>(state: R[]) {
  const [items, setItems] = React.useState<R[]>([]);

  React.useEffect(() => {
    let buffer: R[] = [];

    const interval = setInterval(() => {
      if (state[buffer.length]) {
        buffer = [...buffer, state[buffer.length]];
        setItems(buffer);
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [state]); // eslint-disable-line

  return items;
}

export { useProgressiveState };
