import * as React from 'react';

interface DevoContext {
  state: { [key: string]: any };
  setState: React.Dispatch<React.SetStateAction<any>>;
  isNightMode: boolean;
  setNightMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const context = React.createContext<DevoContext>({
  state: {},
  setState: () => {},
  isNightMode: false,
  setNightMode: () => {},
});

export default context;
