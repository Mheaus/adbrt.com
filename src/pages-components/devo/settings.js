import { faGithub, faHackerNewsSquare, faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import DesignerNewsItem from './components/DesignerNewsItem';
import GithubTrend from './components/GithubTrend';
import HackerNewsItem from './components/HackerNewsItem';
import ProductHuntItem from './components/ProductHuntItem';

export default {
  platforms: {
    designernews: {
      dataUrl: 'https://www.designernews.co/api/v2/stories',
      name: 'designernews',
      title: 'Designer News',
      icon: faNewspaper,
      component: DesignerNewsItem,
      responseDataKey: 'stories',
      externalLink: 'https://www.designernews.co',
    },
    github: {
      dataUrl: 'https://devo.burakkarakan.com/api/github',
      name: 'github',
      title: 'GitHub Trending',
      icon: faGithub,
      component: GithubTrend,

      externalLink: 'https://github.com/trending',
    },
    hackernews: {
      dataUrl: 'https://devo.burakkarakan.com/api/hackernews',
      name: 'hackernews',
      title: 'Hacker News',
      icon: faHackerNewsSquare,
      component: HackerNewsItem,

      externalLink: 'https://news.ycombinator.com',
    },
    producthunt: {
      dataUrl: 'https://devo.burakkarakan.com/api/producthunt',
      name: 'producthunt',
      title: 'Product Hunt',
      icon: faProductHunt,
      component: ProductHuntItem,

      externalLink: 'https://www.producthunt.com',
    },
  },
};
