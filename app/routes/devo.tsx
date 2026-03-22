import { fetchDevTo, fetchGithubTrending, fetchHackerNews } from '~/devo/fetchers.server';
import Devo from '~/devo/devo';
import type { Route } from './+types/devo';

export function meta() {
  return [{ title: 'Devo' }, { name: 'description', content: 'Devo is a dashboard for developers to keep up with the latest news from the developer community.' }];
}

export function loader() {
  return {
    github: fetchGithubTrending(),
    hackernews: fetchHackerNews(),
    devto: fetchDevTo(),
  };
}

export default function DevoPage({ loaderData }: Route.ComponentProps) {
  return <Devo loaderData={loaderData} />;
}
