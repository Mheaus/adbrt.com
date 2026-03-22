export interface GithubRepo {
  language?: { is?: string; color?: string };
  repo: { description?: string; link?: string; owner?: string; name?: string };
  stars?: { link?: string; count?: number };
  forks?: { count?: number; link?: string };
  todayStars: number;
}

export interface HackerNewsItem {
  id: number;
  by: string;
  descendants?: number;
  kids?: number[];
  score?: number;
  text?: string;
  time: number;
  title?: string;
  type?: 'story';
  url?: string;
}

export interface DevToItem {
  comments_count: string;
  positive_reactions_count: string;
  published_at: string;
  tag_list: string[];
  title: string;
  url: string;
  user: { name: string; username: string };
}

export interface DesignerNewsItem {
  id: string;
  hostname?: string | null;
  url: string;
  created_at: string;
  title: string;
  vote_count: number;
  comment_count: number;
}
