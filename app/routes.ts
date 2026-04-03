import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('devo', 'routes/devo.tsx'),
  route('stars', 'routes/stars.tsx'),
  route('fluids', 'routes/fluids.tsx'),
  route('sakuga', 'routes/sakuga.tsx'),
  route('svafa', 'routes/svafa.tsx'),
  route('api/github', 'routes/api.github.ts'),
  route('api/hackernews', 'routes/api.hackernews.ts'),
  route('api/image', 'routes/api.image.ts'),
] satisfies RouteConfig;
