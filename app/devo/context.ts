import { createContext } from 'react';

export interface DevoContext {
  isNightMode: boolean;
  setNightMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const context = createContext<DevoContext>({
  isNightMode: false,
  setNightMode: () => {},
});

export default context;
