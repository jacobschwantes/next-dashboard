import EmblaCarousel from "../components/Carousel";
import ApexChart from "../components/charts/LineGraph";
import PieChart from "../components/charts/PieChart";
import MetricsCard from "../components/MetricCard";
import Table from "../components/Table";
import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import { useNews } from "../lib/utils";
import { ArrowUpIcon } from "@heroicons/react/outline";
import { DateTime } from "luxon";
export default function App({ news }) {
  const { data: session, status } = useSession();
  const slides = [
    {
      heading: "breaking news",
      title: "Ethereum hits new highs",
      subtitle: "Prices soared to more than $4,000 on wednesday.",
      src: "media1.jpg",
    },
    {
      heading: "trending on r/webdev",
      title: "Building permits blocked",
      subtitle:
        "Sky rise permits in north Chicago were blocked by Gov. Newson.dsfsdfdsfsdfsdfsdfsdfsdfsdf",
      src: "media2.jpg",
    },
    {
      heading: "Popular on dev.to",
      title: "Technology REST API",
      subtitle: "Get tech prices, news, and more.",
      src: "media3.jpg",
    },
  ];
  return (
    <div className=" mx-auto space-y-8 overflow-auto px-4   py-4  xl:px-10">
      <div className="space-y-2">
        <h2 className="text-xl">
          Welcome back,{" "}
          <span className="font-medium">{session.user.name.split(" ")[0]}</span>
        </h2>
        {/* <div className="grid grid-cols-1 gap-5 lg:grid-cols-3  ">
        <div className=" col-span-1    rounded-2xl   border border-gray-200  bg-blue-100 dark:bg-blue-200   md:col-span-2 ">
          <div className=" flex flex-col  items-center justify-start space-y-3 p-10 md:flex-row md:justify-between ">
            <div className=" flex flex-col items-center justify-center space-y-3 md:items-start md:justify-start ">
              <h1 className=" text-center text-2xl font-semibold   text-gray-800 md:text-left 2xl:text-3xl ">
                Welcome back,
                <br />
                {session.user.name}!
              </h1>
              <p className=" pb-2 text-center md:text-left ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                vestibulum aliquet condimentum.
              </p>
              <button
                onClick={() => {
                  fetch("/api/testcreate").then((res) => console.log(res));
                }}
                type="submit"
                className="  flex justify-center rounded-md border border-transparent bg-blue-500 py-2  px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/50   transition-all hover:scale-105 hover:shadow-none focus:outline-none  focus:ring-2 focus:ring-blue-500"
              >
                View Report
              </button>
            </div>

            <img
              className="  max-h-52 2xl:max-h-64  "
              src="dashboard5.svg"
            ></img>
          </div>
        </div>
        <div className="  col-span-1">
          <EmblaCarousel slides={news.articles} />
        </div>
      </div> */}
        <p className="text-sm text-zinc-600">
          {DateTime.now().toLocaleString({
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-5  lg:grid-cols-3">
        <div className="bg-white col-span-3 flex divide-x rounded-2xl  border border-gray-100  p-7 dark:border-zinc-900 dark:bg-black  ">
          <div className="flex-1 pr-7">
            <ApexChart seriesOption="1w" dark={false} />
          </div>

          <div className="flex min-w-[30%] flex-col justify-evenly pl-7   ">
            <div className="space-y-2  ">
              <h1 className=" flex items-center text-zinc-500">
                MRR
                <span className="ml-2 flex items-center rounded bg-lime-500 bg-opacity-30 px-1 py-0.5 text-sm text-lime-700">
                  <ArrowUpIcon className="mr-1 h-4 rotate-45" /> 1.2%
                </span>
              </h1>
              <p className="text-2xl font-medium">$5345.54</p>
            </div>
            <span className="border-t" />
            <div className="space-y-2 ">
              <h1 className=" flex items-center text-zinc-500">
                Weekly sign up
                <span className="ml-2 flex items-center rounded bg-red-500 bg-opacity-30 px-1 py-0.5 text-sm text-red-700">
                  <ArrowUpIcon className="mr-1 h-4 rotate-[135deg]" /> 5.1%
                </span>
              </h1>
              <p className="text-2xl font-medium">21</p>
            </div>
            <span className="border-t" />
            <div className="space-y-2">
              <h1 className=" flex items-center text-zinc-500">
                Avg. page load time
                <span className="ml-2 flex items-center rounded bg-lime-500 bg-opacity-30 px-1 py-0.5 text-sm text-lime-700">
                  <ArrowUpIcon className="mr-1 h-4 rotate-45" /> 0.7%
                </span>
              </h1>
              <p className="text-2xl font-medium">1.6s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://dashboard.jacobschwantes.com/api/news");
  const news = await res.json();
  return {
    props: {
      news,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}
App.Layout = DefaultLayout;
