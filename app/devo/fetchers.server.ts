import * as cheerio from 'cheerio';
import type { DevToItem, GithubRepo, HackerNewsItem } from '~/types/devo';

const githubUrl = 'https://github.com';

export async function fetchGithubTrending(): Promise<GithubRepo[]> {
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
}

export async function fetchHackerNews(): Promise<HackerNewsItem[]> {
  const data = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  const topStories: string[] = await data.json();

  const items: HackerNewsItem[] = [];
  for (let i = 0; i < 20; i++) {
    const item = await fetch(`https://hacker-news.firebaseio.com/v0/item/${topStories[i]}.json?print=pretty`);
    items.push(await item.json());
  }

  return items;
}

export async function fetchDevTo(): Promise<DevToItem[]> {
  const data = await fetch('https://dev.to/api/articles?top=1');
  return data.json();
}
