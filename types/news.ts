export type Article = {
  title: string;
  description: string;
  href: URL;
  comments: number;
  timestamp: number;
  image: URL;
  reading_time: number;
  tags: Array<string>;
  author: string;
};
export type RedditPost = {
  title: string;
  body: string;
  author: string;
  subreddit: string;
  ups: number;
  flair: string;
  image: URL;
  created: number;
  num_comments: number;
  href: URL;
  url: URL;
};
