import * as React from 'react';
import { DesignerNewsItem, DevToItem, GithubRepo, HackerNewsItem } from '@/types/devo';

interface DevoContext {
  state: {
    designernews?: DesignerNewsItem[];
    devto?: DevToItem[];
    github?: GithubRepo[];
    hackernews?: HackerNewsItem[];
  };
  setState: React.Dispatch<React.SetStateAction<DevoContext['state']>>;
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
