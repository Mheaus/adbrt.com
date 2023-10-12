interface GithubRepo {
  language?: { is?: string; color?: string };
  repo: { description?: string; link?: string; owner?: string; name?: string };
  stars?: { link?: string; count?: number };
  forks?: { count?: number; link?: string };
  todayStars: number;
}

interface HackerNewsItem {
  id: number; // 37854115; // The item's unique id.
  by: string; // The username of the item's author.
  descendants?: number; // The total comment count.
  kids?: number[]; // The ids of the item's comments, in ranked display order.
  score?: number; // The story's score,.
  text?: string; // The story text. HTML.
  time: number; // Creation date of the item, in .
  title?: string; // The title of the story.
  type?: 'story'; // The type of item
  url?: string; // The URL of the story.
}

interface DevToItem {
  comments_count: string;
  positive_reactions_count: string;
  published_at: string;
  tag_list: string[];
  title: string;
  url: string;
  user: { name: string; username: string };
}

interface DesignerNewsItem {
  id: string;
  hostname?: string | null;
  url: string;
  created_at: string;
  title: string;
  vote_count: number;
  comment_count: number;
}

export type { DesignerNewsItem, DevToItem, GithubRepo, HackerNewsItem };
