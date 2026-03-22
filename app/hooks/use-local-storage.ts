import { useState } from 'react';

export function useLocalStorage<V>(key: string, initialValue: V | null = null): [V | null, (value: V) => void] {
  const [storedValue, setStoredValue] = useState<V | null>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: V) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // silently fail
    }
  };

  return [storedValue, setValue];
}
