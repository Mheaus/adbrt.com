import { isRouteErrorResponse, Links, Meta, Outlet, redirect, Scripts, ScrollRestoration, useNavigate } from 'react-router';

import type { Route } from './+types/root';
import { PostHogProvider } from './posthog';
import './app.css';
import displayFont from '@fontsource/chakra-petch/files/chakra-petch-latin-700-normal.woff2?url';

// Patterns commonly probed by automated scanners and bots
const SCANNER_PATTERNS: RegExp[] = [
  // PHP files (this is not a PHP site)
  /\.php(?:[\/?#]|$)/i,
  // WordPress
  /^\/wp-(?:admin|login|content|includes|json|cron|signup|activate|comments|mail|trackback|register)/i,
  // Environment and version control files
  /^\/\.env(?:[\/?#]|$)/i,
  /^\/\.git(?:[\/?#]|$)/i,
  /^\/\.svn(?:[\/?#]|$)/i,
  /^\/\.hg(?:[\/?#]|$)/i,
  // Web server config files
  /^\/\.htaccess(?:[\/?#]|$)/i,
  /^\/\.htpasswd(?:[\/?#]|$)/i,
  /^\/web\.config(?:[\/?#]|$)/i,
  // Common CMS admin panels
  /^\/administrator(?:[\/?#]|$)/i,
  // Database management tools
  /^\/(?:phpmyadmin|pma|myadmin|adminer|mysql|dbadmin)(?:[\/?#]|$)/i,
  // CGI and legacy server paths
  /^\/cgi-bin(?:[\/?#]|$)/i,
  /^\/boaform(?:[\/?#]|$)/i,
  // Server status endpoints
  /^\/server-(?:status|info)(?:[\/?#]|$)/i,
  // Backup and temporary directories
  /^\/(?:backup|bak|old|temp|tmp)(?:[\/?#]|$)/i,
  // Common config file names
  /^\/(?:config|configuration|settings|setup)\.(?:php|yml|yaml|xml|ini|bak)/i,
  // AWS and cloud metadata probes
  /^\/(?:latest\/meta-data|\.aws|\.azure)/i,
];

async function scannerTrapMiddleware(...[{ request }, next]: Parameters<Route.MiddlewareFunction>) {
  const trapUrl = process.env.TRAP_URL;
  if (trapUrl) {
    const { pathname } = new URL(request.url);
    if (SCANNER_PATTERNS.some((pattern) => pattern.test(pathname))) {
      throw redirect(trapUrl, 302);
    }
  }
  return next();
}

export const middleware: Route.MiddlewareFunction[] = [scannerTrapMiddleware];

export const links: Route.LinksFunction = () => [{ rel: 'preload', href: displayFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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

function NotFoundVideo() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      <button className="flex items-center justify-center w-full h-full bg-black" onClick={toggleMute} type="button">
        <video height="100%" className="object-cover w-full h-full" src="/assets/videos/game_over.mp4" ref={videoRef} autoPlay muted onEnded={() => navigate('/')}>
          <track kind="captions" />
        </video>
      </button>
      <button className="absolute text-3xl text-white bottom-4 right-4" onClick={toggleMute} type="button">
        {isMuted ? '🔇' : '🔊'}
      </button>
    </>
  );
}

import * as React from 'react';

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundVideo />;
  }

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
