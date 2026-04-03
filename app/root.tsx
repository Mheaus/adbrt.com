import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import { PostHogProvider } from './posthog';
import './app.css';

const colors = {
  black: '#171d2b',
  white: '#fff',
  lighterBlue: '#bbd1ea',
  lightBlue: '#68bff4',
  darkBlue: '#252638',
  lightGray: '#dae3e5',
  primary: '#0079df',
  secondary: '#a1c6ea',
} as const;

const colorVars = Object.entries(colors).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`--color-${key}`]: value,
  }),
  {} as Record<string, string>,
);

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{ ...colorVars, fontFamily: 'Inter, sans-serif' }}>
        <PostHogProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </PostHogProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

import * as React from 'react';

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = String(error.status);
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container p-4 pt-16 mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
