import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import { useNews } from "../lib/utils";
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  ChatIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
} from "@heroicons/react/solid";
import { useRef } from "react";
import ArticleFooter from "../components/articles/ArticleFooter";
import ArticleTags from "../components/articles/ArticleTags";
export default function App({ news }) {
  const redditSlider = useRef();
  const articleSlider = useRef();

  return (
    <div className="scrollbar black scrollbarY space-y-3 overflow-auto   px-4 py-4 xl:px-10">
      <div className="h-partial space-y-4 ">
        <div className="flex items-center justify-between ">
          <h1 className=" text-2xl font-semibold ">Popular on dev.to</h1>

          <div className="flex items-center justify-end space-x-2">
            <button
              className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                articleSlider.current.scrollLeft -= 500;
              }}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                articleSlider.current.scrollLeft += 500;
              }}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          ref={articleSlider}
          className=" scrollbar  scrollbarX snap-x snap-mandatory overflow-auto scroll-smooth md:hidden block "
        >
          <div className=" inline-flex space-x-5 pb-5 ">
            {news
              ? news.articles.map((item, index) => {
                  return (
                    <div
                      id={`article${index}`}
                      className="h-full w-screen p-5 sm:p-0"
                    >
                      <div className="flex snap-end  flex-col rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100  ">
                        <img
                          className="h-1/2 w-full rounded-t-2xl object-cover"
                          src={item.image}
                        ></img>
                        <div className="flex flex-1 flex-col justify-between p-5">
                          <span>
                            <h1 className="text-3xl font-medium">
                              {item.title}
                            </h1>
                            <ArticleTags tags={item.tags} />
                            <p className=" text-lg leading-8 text-gray-600">
                              {item.description}
                            </p>
                          </span>
                          <ArticleFooter
                            url={item.href}
                            readTime={item.reading_time}
                            author={item.author.name}
                            date={item.timestamp}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>

        <div className=" hidden space-x-4  sm:flex 2xl:h-2/3 ">
          {news ? (
            <>
              <div className="flex w-1/3 flex-col rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100  ">
                <img
                  className="h-1/2 w-full rounded-t-2xl object-cover"
                  src={news.articles[0].image}
                ></img>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <span>
                    <h1 className="text-3xl font-medium">
                      {news.articles[0].title}
                    </h1>
                    <ArticleTags tags={news.articles[0].tags} />
                    <p className=" text-lg leading-8 text-gray-600">
                      {news.articles[0].description}
                    </p>
                  </span>
                  <ArticleFooter
                    url={news.articles[0].href}
                    readTime={news.articles[0].reading_time}
                    author={news.articles[0].author.name}
                    date={news.articles[0].timestamp}
                  />
                </div>
              </div>
              <div className="flex  h-full w-1/3 flex-col justify-around space-y-5">
                <div className=" flex h-1/2  flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100">
                  <span>
                    <h1 className="text-3xl font-medium">
                      {news.articles[1].title}
                    </h1>
                    <ArticleTags tags={news.articles[1].tags} />
                    <p className=" text-xl leading-8 text-gray-600">
                      {news.articles[1].description}
                    </p>
                  </span>
                  <ArticleFooter
                    url={news.articles[1].href}
                    readTime={news.articles[1].reading_time}
                    author={news.articles[1].author.name}
                    date={news.articles[1].timestamp}
                  />
                </div>

                <div className=" flex flex-1  flex-grow flex-col rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100 ">
                  <img
                    src={news.articles[2].image}
                    className=" h-32 w-full rounded-t-2xl object-cover"
                  ></img>
                  <div className="flex flex-1 flex-col justify-between p-5 ">
                    <span>
                      <h1 className="text-3xl font-medium">
                        {news.articles[2].title}
                      </h1>
                      <ArticleTags tags={news.articles[2].tags} />
                    </span>
                    <ArticleFooter
                      url={news.articles[2].href}
                      readTime={news.articles[2].reading_time}
                      author={news.articles[2].author.name}
                      date={news.articles[2].timestamp}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-1/3 flex-col rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100  ">
                <img
                  className="h-1/2 w-full rounded-t-2xl object-cover"
                  src={news.articles[3].image}
                ></img>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <span>
                    <h1 className="text-3xl font-medium">
                      {news.articles[3].title}
                    </h1>
                    <ArticleTags tags={news.articles[3].tags} />
                    <p className=" text-lg leading-8 text-gray-600">
                      {news.articles[3].description}
                    </p>
                  </span>
                  <ArticleFooter
                    url={news.articles[3].href}
                    readTime={news.articles[3].reading_time}
                    author={news.articles[3].author.name}
                    date={news.articles[3].timestamp}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className=" flex items-center justify-between">
          <h1 className=" text-2xl font-semibold">Trending on r/webdev</h1>
          <div className="flex items-center space-x-2">
            <button
              className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                redditSlider.current.scrollLeft -= 500;
              }}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                redditSlider.current.scrollLeft += 500;
              }}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          ref={redditSlider}
          className=" scrollbar  scrollbarX  snap-x snap-mandatory overflow-auto scroll-smooth "
        >
          <div className=" inline-flex space-x-5 pb-5 ">
            {news
              ? news.posts.map((item, index) => {
                  return (
                    <div className="h-full w-screen p-5 sm:w-2xl sm:p-0">
                      <a
                        id={`post${index}`}
                        rel="noreferrer"
                        target="_blank"
                        href={`https://www.reddit.com${item.href}`}
                        className=" flex   snap-end  flex-wrap items-center  justify-between rounded-2xl border border-gray-100 p-5 shadow-lg shadow-gray-100   "
                      >
                        <div className="flex ">
                          <span className="mr-3 mt-2 flex flex-col items-center font-semibold">
                            <ArrowCircleUpIcon className="h-5 w-5 text-blue-500" />
                            {item.ups}
                            <ArrowCircleDownIcon className="h-5 w-5 text-blue-500" />
                          </span>
                          <span>
                            <h1 className="text-lg font-medium">
                              {item.title}
                            </h1>
                            <h1 className="flex items-center">
                              <img
                                className="mt-1 mr-1 h-4 w-4"
                                src="https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2"
                              ></img>
                              {item.subreddit}
                            </h1>
                            <span className="flex space-x-1">
                              <h1>by u/{item.author}</h1>
                              <h1 className="">
                                {new Date(
                                  Date.now() - item.created * 1000
                                ).getHours()}{" "}
                                hours ago
                              </h1>
                            </span>
                            <span className="mt-1 flex space-x-2">
                              <h1 className="flex items-center font-semibold">
                                <ChatIcon className="mr-1 h-5 w-5 text-gray-700" />
                                {item.num_comments}
                              </h1>
                              {item.flair ? (
                                <span className="flex items-center rounded-full bg-gray-200 px-2 text-xs  font-medium">
                                  {item.flair}
                                </span>
                              ) : null}
                            </span>
                          </span>
                        </div>
                      </a>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/news");
  const news = await res.json();
  return {
    props: {
      news,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 30, // In seconds
  };
}

App.Layout = DefaultLayout;
