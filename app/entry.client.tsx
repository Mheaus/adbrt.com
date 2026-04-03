import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import { isRouteErrorResponse } from 'react-router';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter
        onError={(error) => {
          if (isRouteErrorResponse(error) && error.status === 404) {
            console.log(`404 - Route not found: ${window.location.pathname}`);
          } else {
            console.error(error);
          }
        }}
      />
    </StrictMode>,
  );
});
