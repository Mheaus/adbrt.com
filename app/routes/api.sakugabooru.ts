import type { Route } from './+types/api.sakugabooru';

const BASE = 'https://www.sakugabooru.com';
const LIMIT = 8;
const PLAYABLE = new Set(['mp4', 'webm', 'gif']);
const CACHE_MS = 10 * 60 * 1000;

// Sakugabooru is a community site. Each tag hits it at most once every 10 minutes.
const cache = new Map<string, { expiresAt: number; body: { tag: string; posts: SakugaPost[] } }>();

export interface SakugaPost {
  id: number;
  preview: string;
  file: string;
  ext: string;
  width: number;
  height: number;
  tags: string;
  url: string;
}

interface BooruPost {
  id: number;
  rating: string;
  file_ext: string;
  file_url: string;
  preview_url: string;
  width: number;
  height: number;
  tags: string;
}

/** Turns free text into one booru tag: "Yutaka Nakamura" becomes "yutaka_nakamura". */
function toTag(query: string) {
  return query
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_:().'!-]/g, '')
    .slice(0, 60);
}

async function booru<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { 'User-Agent': 'adbrt.com' }, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Sakugabooru answered ${res.status}`);
  return res.json() as Promise<T>;
}

// The site is public, so the search keeps only the posts that Sakugabooru rates "safe".
async function search(tag: string) {
  const tags = encodeURIComponent(`${tag} rating:s order:score`.trim());
  const posts = await booru<BooruPost[]>(`/post.json?limit=${LIMIT * 2}&tags=${tags}`);
  return posts.filter((p) => p.rating === 's' && PLAYABLE.has(p.file_ext)).slice(0, LIMIT);
}

export async function loader({ request }: Route.LoaderArgs) {
  const tag = toTag(new URL(request.url).searchParams.get('q') ?? '') || 'effects';
  const hit = cache.get(tag);
  if (hit && Date.now() < hit.expiresAt) return Response.json(hit.body, { headers: { 'Cache-Control': 'public, max-age=600, stale-while-revalidate=300' } });
  try {
    let resolved = tag;
    let posts = await search(tag);
    if (!posts.length) {
      const [closest] = await booru<{ name: string }[]>(`/tag.json?limit=1&order=count&name=${encodeURIComponent(`*${tag}*`)}`);
      if (closest) {
        resolved = closest.name;
        posts = await search(closest.name);
      }
    }
    const body = {
      tag: resolved,
      posts: posts.map((p): SakugaPost => ({ id: p.id, preview: p.preview_url, file: p.file_url, ext: p.file_ext, width: p.width, height: p.height, tags: p.tags, url: `${BASE}/post/show/${p.id}` })),
    };
    cache.set(tag, { expiresAt: Date.now() + CACHE_MS, body });
    return Response.json(body, { headers: { 'Cache-Control': 'public, max-age=600, stale-while-revalidate=300' } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: `Sakugabooru est injoignable : ${message}` }, { status: 502 });
  }
}
