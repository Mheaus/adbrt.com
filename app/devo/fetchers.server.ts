import * as cheerio from 'cheerio';
import type { DevToItem, GithubRepo, HackerNewsItem } from '~/types/devo';

// --- Server-side in-memory cache ---

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (entry && Date.now() < entry.expiresAt) {
    return Promise.resolve(entry.data);
  }

  return fn().then((data) => {
    cache.set(key, { data, expiresAt: Date.now() + ttlMs });
    return data;
  });
}

// --- Fetchers ---

const githubUrl = 'https://github.com';
const FIVE_MINUTES = 1000 * 60 * 5;

export function fetchGithubTrending(): Promise<GithubRepo[]> {
  return cached('github-trending', FIVE_MINUTES, async () => {
    const data = await fetch('https://github.com/trending?since=daily&spoken_language_code=');
    const text = await data.text();
    const $ = cheerio.load(text);

    return $('article.Box-row')
      .get()
      .map((repo): GithubRepo => {
        const $repo = $(repo);
        const $title = $repo.find('h2');

        const [owner, name] = $title.text().replaceAll(' ', '').replaceAll('\n', '').split('/');
        const repoLink = $title.find('a').attr('href');
        const description = $repo.find('p').text().trim();

        const $footer = $repo.find('div.color-fg-muted');
        const $language = $footer.clone().children().eq(0);
        const $stars = $footer.clone().children().eq(1);
        const $forks = $footer.clone().children().eq(2);
        const $todayStars = $footer.clone().children().last();

        return {
          repo: { name, link: repoLink && `${githubUrl}${repoLink}`, owner, description },
          language: {
            is: $language.find(':last-child').text().trim(),
            color: $language.find(':first-child').attr('style')?.replace('background-color: ', ''),
          },
          stars: {
            count: Number($stars.text().trim().replaceAll(',', '')),
            link: $stars.attr('href') && `${githubUrl}${$stars.attr('href')}`,
          },
          forks: {
            count: Number($forks.text().trim().replaceAll(',', '')),
            link: $forks.attr('href') && `${githubUrl}${$forks.attr('href')}`,
          },
          todayStars: Number($todayStars.text().trim().split(' ')[0]),
        };
      });
  });
}

export function fetchHackerNews(): Promise<HackerNewsItem[]> {
  return cached('hackernews', FIVE_MINUTES, async () => {
    const data = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    const topStories: string[] = await data.json();

    // Fetch top 20 items in parallel instead of sequentially
    const items = await Promise.all(topStories.slice(0, 20).map(async (id) => {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
      return res.json() as Promise<HackerNewsItem>;
    }));

    return items;
  });
}

export function fetchDevTo(): Promise<DevToItem[]> {
  return cached('devto', FIVE_MINUTES, async () => {
    const data = await fetch('https://dev.to/api/articles?top=1');
    return data.json();
  });
}
