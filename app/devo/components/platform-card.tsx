import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import Icon from '~/components/icon';

import Loader from './loader';
import PlatformSelect from './platform-select';
import settings from '../settings';
import type { PlatformName } from '../settings';
import { platformQueryOptions } from '../queries';

interface PlatformCardProps {
  style?: React.CSSProperties;
  platform: keyof typeof settings.platforms;
  serverData?: Promise<unknown[]> | unknown[];
}

export default function PlatformCard({ style, platform, serverData }: PlatformCardProps) {
  const [selectedPlatform, setSelectedPlatform] = React.useState(settings.platforms[platform]);

  // Resolve the streamed promise from the loader (triggers Suspense boundary above)
  const resolvedServerData = serverData instanceof Promise ? React.use(serverData) : serverData;

  const isDefaultPlatform = selectedPlatform.name === platform;

  const { data, isLoading, refetch } = useQuery({
    ...platformQueryOptions(selectedPlatform.name as PlatformName),
    // Seed the cache with server data for the default platform
    ...(isDefaultPlatform && resolvedServerData ? { initialData: resolvedServerData } : {}),
  });

  const { icon, externalLink, component } = selectedPlatform;
  const platformColor = settings.platforms[platform].color;

  return (
    <div style={style} className="flex h-full w-full flex-col overflow-hidden rounded-md shadow-md">
      <div className="flex shrink-0 items-center gap-2 px-4 py-2 text-left text-base" style={{ backgroundColor: platformColor, color: '#fff' }}>
        <Icon icon={icon} className="h-8 w-8" />
        <PlatformSelect onChange={(name) => setSelectedPlatform(settings.platforms[name])} selectedPlatform={selectedPlatform} />
        <div className="ml-auto flex items-center gap-4">
          <a href={externalLink} target="_blank" rel="noopener noreferrer" className="text-current no-underline hover:cursor-pointer">
            <Icon icon="ri:external-link-line" />
          </a>
          <button type="button" className="text-white hover:cursor-pointer" onClick={() => refetch()}>
            <Icon icon="ri:refresh-line" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <Loader color={platformColor} />
      ) : (
        <div className="grow overflow-y-auto bg-white px-4 text-gray-700">
          {(data as Record<string, unknown>[])?.map((rowData) => (rowData ? React.createElement(component as React.ComponentType<Record<string, unknown>>, { ...rowData, key: Math.random() }) : null))}
        </div>
      )}
    </div>
  );
}
