import { faGithub, faHackerNewsSquare, faProductHunt } from '@fortawesome/free-brands-svg-icons';

import GithubTrend from './components/GithubTrend';
import HackerNewsItem from './components/HackerNewsItem';
import ProductHuntItem from './components/ProductHuntItem';

const MINUTE = 60000;

export default {
  platforms: {
    github: {
      name: 'github',
      title: 'GitHub Trending',
      icon: faGithub,
      component: GithubTrend,

      externalLink: 'https://github.com/trending',
      bodyComponentName: 'GitHubBody',
      updatedAtThreshold: 5 * MINUTE,
    },
    hackernews: {
      name: 'hackernews',
      title: 'Hacker News',
      icon: faHackerNewsSquare,
      component: HackerNewsItem,

      externalLink: 'https://news.ycombinator.com',
      bodyComponentName: 'HackerNewsBody',
      updatedAtThreshold: 5 * MINUTE,
    },
    producthunt: {
      name: 'producthunt',
      title: 'Product Hunt',
      icon: faProductHunt,
      component: ProductHuntItem,

      externalLink: 'https://www.producthunt.com',
      bodyComponentName: 'ProductHuntBody',
      updatedAtThreshold: 30 * MINUTE,
    },
  },
};
