import { isRouteErrorResponse } from 'react-router';
import type { HandleErrorFunction } from 'react-router';
import type { AppLoadContext, EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';
import { renderToReadableStream } from 'react-dom/server';
import { isbot } from 'isbot';

export const handleError: HandleErrorFunction = (error, { request }) => {
  if (request.signal.aborted) return;

  if (isRouteErrorResponse(error) && error.status === 404) {
    console.log(`404 - Route not found: ${new URL(request.url).pathname}`);
  } else {
    console.error(error);
  }
};

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  const userAgent = request.headers.get('user-agent');

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        if (request.signal.aborted) {
          return;
        }

        if (isRouteErrorResponse(error)) {
          if (error.status === 404) {
            console.log(`404 - Route not found: ${new URL(request.url).pathname}`);
            return;
          }

          if (responseStatusCode >= 400 && responseStatusCode < 500) {
            return;
          }
        }

        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(userAgent ?? '')) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
