import DesignerNewsItem from './components/designer-news-item';
import DevTo from './components/dev-to';
import GithubTrend from './components/github-trend';
import HackerNewsItem from './components/hacker-news-item';

const settings = {
  platforms: {
    designernews: {
      dataUrl: 'https://www.designernews.co/api/v2/stories',
      name: 'designernews',
      title: 'Designer News',
      icon: 'ri:newspaper-line',
      component: DesignerNewsItem,
      responseDataKey: 'stories',
      color: '#2d72d9',
      externalLink: 'https://www.designernews.co',
    },
    devto: {
      component: DevTo,
      dataUrl: 'https://dev.to/api/articles?top=1',
      icon: 'ri:code-s-slash-line',
      name: 'devto',
      title: 'DEV Community',
      color: '#0a0a0a',
      externalLink: 'https://dev.to',
    },
    github: {
      dataUrl: '/api/github',
      name: 'github',
      title: 'GitHub Trending',
      icon: 'ri:github-fill',
      component: GithubTrend,
      color: '#25292f',
      externalLink: 'https://github.com/trending',
    },
    hackernews: {
      dataUrl: '/api/hackernews',
      name: 'hackernews',
      title: 'Hacker News',
      icon: 'fa:hacker-news',
      component: HackerNewsItem,
      color: '#fe6501',
      externalLink: 'https://news.ycombinator.com',
    },
  },
} as const;

export type PlatformName = keyof (typeof settings)['platforms'];
export type Platform = (typeof settings)['platforms'][PlatformName];
export default settings;
