import { NextResponse } from 'next/server';
import cheerio from 'cheerio';

const githubUrl = 'https://github.com';

interface GithubRepo {
  language?: { is?: string; color?: string };
  repo: { description?: string; link?: string; owner?: string; name?: string };
  stars?: { link?: string; count?: number };
  forks?: { count?: number; link?: string };
  todayStars: number;
}

export async function GET() {
  try {
    const data = await fetch('https://github.com/trending?since=daily&spoken_language_code=');
    const text = await data.text();
    const $ = cheerio.load(text);

    const repos = $('article.Box-row')
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

    return NextResponse.json(repos);
    return NextResponse.json({ data: repos, time: new Date().getTime() });
  } catch (err: any) {
    return new NextResponse(`Error while fetching data from GitHub: ${err?.statusText || err?.message || err}`, { status: err?.status || 500 });
  }
}
