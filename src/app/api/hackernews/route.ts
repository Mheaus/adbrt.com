import { HackerNewsItem } from '@/types/devo';

export async function GET() {
  try {
    let timer = Date.now();

    const data = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', {
      next: {
        revalidate: 60 * 60 * 4, // 4 hour
        tags: ['hackernews'],
      },
    });

    const responseDate = new Date(data.headers.get('date') as string);

    console.info('api/hackernews: cache ' + (timer > responseDate.getTime() ? 'HIT' : 'MISS'));

    /**
     * @type {string[]} topStories - Up to 500 top and new stories.
     */
    const topStories: string[] = await data.json();

    const items: HackerNewsItem[] = [];

    // get last 20 items
    for (let i = 0; i < 20; i++) {
      const item = await fetch(`https://hacker-news.firebaseio.com/v0/item/${topStories[i]}.json?print=pretty`);

      const itemData = await item.json();

      items.push(itemData);
    }

    return Response.json(items);
  } catch (err: any) {
    return new Response(`Error while fetching data from HackerNews: ${err?.statusText || err?.message || err}`, { status: err?.status || 500 });
  }
}
