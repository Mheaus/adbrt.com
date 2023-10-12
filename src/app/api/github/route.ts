import cheerio from 'cheerio';
import { GithubRepo } from '@/types/devo';

const githubUrl = 'https://github.com';

export async function GET() {
  try {
    let timer = Date.now();

    const data = await fetch('https://github.com/trending?since=daily&spoken_language_code=', {
      next: {
        revalidate: 60 * 60 * 4, // 4 hour
        tags: ['github'],
      },
    });

    const responseDate = new Date(data.headers.get('date') as string);

    console.info('api/github: cache ' + (timer > responseDate.getTime() ? 'HIT' : 'MISS'));

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

    return Response.json(repos);
    // return Response.json({ data: repos, time: new Date().getTime() });
  } catch (err: any) {
    return new Response(`Error while fetching data from GitHub: ${err?.statusText || err?.message || err}`, { status: err?.status || 500 });
  }
}
