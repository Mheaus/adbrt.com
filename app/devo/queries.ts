import type { PlatformName } from './settings';
import settings from './settings';

async function fetchPlatform(name: PlatformName) {
  const { dataUrl } = settings.platforms[name];
  const response = await fetch(dataUrl);
  return response.json();
}

export function platformQueryOptions(name: PlatformName) {
  return {
    queryKey: ['devo', name],
    queryFn: () => fetchPlatform(name),
    staleTime: 1000 * 60 * 5, // 5 minutes
  };
}
