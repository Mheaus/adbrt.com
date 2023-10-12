import { useRef, useEffect } from 'react';

function useInterval(callback: () => any, delay: number) {
  const savedCallback = useRef<() => any>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }

    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
