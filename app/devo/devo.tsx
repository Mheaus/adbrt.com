import * as React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { DevToItem, GithubRepo, HackerNewsItem } from '~/types/devo';
import context from './context';
import Header from './components/header';
import PlatformCard from './components/platform-card';
import Loader from './components/loader';

export interface DevoLoaderData {
  github: Promise<GithubRepo[]> | GithubRepo[];
  hackernews: Promise<HackerNewsItem[]> | HackerNewsItem[];
  devto: Promise<DevToItem[]> | DevToItem[];
}

interface DevoProps {
  loaderData: DevoLoaderData;
}

export default function Devo({ loaderData }: DevoProps) {
  const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } } }));
  const [isNightMode, setNightMode] = React.useState(false);

  const contextValue = React.useMemo(() => ({ isNightMode, setNightMode }), [isNightMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <context.Provider value={contextValue}>
        <div
          className={clsx(
            isNightMode && 'bg-[#25292f]',
            'flex h-screen flex-col justify-between overflow-hidden px-8 py-7 text-[#484b4f] antialiased bg-gray-100',
            "font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Helvetica,Arial,sans-serif,'Apple_Color_Emoji']",
          )}
        >
          <Header />
          <div className="my-7 grid h-[calc(100%-7.125rem)] grid-cols-2 grid-rows-2 gap-2">
            <div style={{ gridArea: '1 / 1 / 3 / 1' }}>
              <React.Suspense fallback={<Loader color="#25292f" />}>
                <PlatformCard platform="github" serverData={loaderData.github} />
              </React.Suspense>
            </div>
            <React.Suspense fallback={<Loader color="#fe6501" />}>
              <PlatformCard platform="hackernews" serverData={loaderData.hackernews} />
            </React.Suspense>
            <React.Suspense fallback={<Loader color="#0a0a0a" />}>
              <PlatformCard platform="devto" serverData={loaderData.devto} />
            </React.Suspense>
          </div>

          <footer className="flex items-center justify-between font-light text-gray-600">
            <Link className="no-underline text-inherit hover:underline" to="/">
              Go back to home
            </Link>
          </footer>
        </div>
      </context.Provider>
    </QueryClientProvider>
  );
}
