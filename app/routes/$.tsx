import { redirect } from 'react-router';

import type { Route } from './+types/$';

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

function isScannerPath(pathname: string): boolean {
  return SCANNER_PATTERNS.some((pattern) => pattern.test(pathname));
}

export async function loader({ request }: Route.LoaderArgs) {
  const { pathname } = new URL(request.url);

  const trapUrl = process.env.TRAP_URL;
  if (trapUrl && isScannerPath(pathname)) {
    throw redirect(trapUrl, 302);
  }

  throw new Response(null, { status: 404, statusText: 'Not Found' });
}
