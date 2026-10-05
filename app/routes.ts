import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('devo', 'routes/devo.tsx'),
  route('stars', 'routes/stars.tsx'),
  route('fluids', 'routes/fluids.tsx'),
  route('sakuga', 'routes/sakuga.tsx'),
  route('svafa', 'routes/svafa.tsx'),
  route('api/github', 'routes/api.github.ts'),
  route('api/hackernews', 'routes/api.hackernews.ts'),
  route('api/image', 'routes/api.image.ts'),
  route('api/sakugabooru', 'routes/api.sakugabooru.ts'),
  // The home page and every experience share one route, so a shuffle keeps the page mounted.
  route(':experience?', 'routes/home.tsx'),
] satisfies RouteConfig;
