import { FaDev, FaGithub, FaHackerNewsSquare, FaNewspaper, FaProductHunt } from 'react-icons/fa';

import DesignerNewsItem from './components/DesignerNewsItem';
import DevTo from './components/DevTo';
import GithubTrend from './components/GithubTrend';
import HackerNewsItem from './components/HackerNewsItem';
import ProductHuntItem from './components/ProductHuntItem';

const settings = {
  platforms: {
    designernews: {
      dataUrl: 'https://www.designernews.co/api/v2/stories',
      name: 'designernews',
      title: 'Designer News',
      icon: FaNewspaper,
      component: DesignerNewsItem,
      responseDataKey: 'stories',
      externalLink: 'https://www.designernews.co',
    },
    devto: {
      component: DevTo,
      dataUrl: `https://dev.to/api/articles?top=1`,
      icon: FaDev,
      name: 'devto',
      title: 'DEV Community',

      externalLink: 'https://dev.to',
    },
    github: {
      dataUrl: 'https://devo.ams3.digitaloceanspaces.com/github.json',
      name: 'github',
      title: 'GitHub Trending',
      icon: FaGithub,
      component: GithubTrend,

      externalLink: 'https://github.com/trending',
    },
    hackernews: {
      dataUrl: 'https://devo.ams3.digitaloceanspaces.com/hackernews.json',
      name: 'hackernews',
      title: 'Hacker News',
      icon: FaHackerNewsSquare,
      component: HackerNewsItem,

      externalLink: 'https://news.ycombinator.com',
    },
    producthunt: {
      dataUrl: 'https://devo.ams3.digitaloceanspaces.com/producthunt.json',
      name: 'producthunt',
      title: 'Product Hunt',
      icon: FaProductHunt,
      component: ProductHuntItem,

      externalLink: 'https://www.producthunt.com',
    },
  },
} as const;

export default settings;
