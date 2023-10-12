import { useEffect, useState } from 'react';

// const mediaQueries = [
//   { name: 'large', width: '1024' },
//   { name: 'small', width: '680' },
// ] as const;

function useMedia(queries) {
  const [value, setValue] = useState(queries[0]);

  const matchedMediaQueries = queries.map(({ width }) => typeof window !== 'undefined' && window.matchMedia(`(min-width: ${width}px)`));

  const getValue = () => {
    const index = matchedMediaQueries.findIndex(({ matches }) => matches);

    return typeof queries[index] !== 'undefined' ? queries[index] : queries[queries.length - 1];
  };

  useEffect(() => {
    const handler = () => setValue(getValue);

    matchedMediaQueries.forEach((mediaQuery) => mediaQuery.addEventListener('change', handler));
    return () => matchedMediaQueries.forEach((mediaQuery) => mediaQuery.removeEventListener('change', handler));
  }, []);

  return value;
}

export default useMedia;
