import { getSession } from "next-auth/react";
import { Article, RedditPost } from "../../../types/news";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    const redditPosts = await fetch(
      "https://www.reddit.com/r/webdev/hot.json?limit=10"
    )
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .catch((e) => console.log(e));
    const posts = [];
    redditPosts.data.children.forEach((post) => {
      if (!post.data.pinned && !post.data.stickied) {
        const parsed: RedditPost = {
          title: post.data.title,
          body: post.data.selftext,
          author: post.data.author,
          subreddit: post.data.subreddit_name_prefixed,
          ups: post.data.ups,
          flair: post.data.link_flair_text,
          image: post.data.thumbnail,
          created: post.data.created,
          num_comments: post.data.num_comments,
          href: post.data.permalink,
          url: post.data.url,
        };
        posts.push(parsed);
      }
    });
    const articlesResponse = await fetch(
      "https://dev.to/api/articles?top=3&per_page=4&tags=javascript"
    ).then((res) => {
      return res.json();
    });
    const articles = [];
    articlesResponse.forEach((article) => {
      const parsed: Article = {
        title: article.title,
        description: article.description,
        href: article.url,
        comments: article.comments_count,
        timestamp: article.readable_publish_date,
        image: article.cover_image,
        reading_time: article.reading_time_minutes,
        tags: article.tag_list,
        author: article.user,
      };
      console.log(parsed);
      articles.push(parsed);
    });
    res.status(200).json({ posts, articles });
  } else {
    res.status(400).send("unauthorized");
  }
}
