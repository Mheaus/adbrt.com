import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from '@posthog/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN;
    const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

    if (!token) return;

    posthog.init(token, {
      api_host: host || 'https://eu.i.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
    });

    setReady(true);
  }, []);

  if (!ready) return <>{children}</>;

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
