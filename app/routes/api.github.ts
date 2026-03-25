import { fetchGithubTrending } from '~/devo/fetchers.server';

export async function loader() {
  try {
    const repos = await fetchGithubTrending();
    return Response.json(repos, {
      headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=60' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(`Error while fetching data from GitHub: ${message}`, { status: 500 });
  }
}
