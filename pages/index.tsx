import EmblaCarousel from "../components/Carousel";
import ApexChart from "../components/charts/LineGraph";
import PieChart from "../components/charts/PieChart";
import MetricsCard from "../components/MetricCard";
import Table from "../components/Table";
import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import { useNews } from "../lib/utils";
export default function App({news}) {
  const { data: session, status } = useSession();
  const slides = [
    { heading: 'breaking news', title: "Ethereum hits new highs", subtitle: "Prices soared to more than $4,000 on wednesday.", src: "media1.jpg" },
    { heading: 'trending on r/webdev', title: "Building permits blocked", subtitle: "Sky rise permits in north Chicago were blocked by Gov. Newson.dsfsdfdsfsdfsdfsdfsdfsdfsdf", src: "media2.jpg" },
    { heading: 'Popular on dev.to', title: "Technology REST API", subtitle: "Get tech prices, news, and more.", src: "media3.jpg" },
  ];
  return (
    <div className=" space-y-5 overflow-auto px-4 py-4   xl:px-10  mx-auto">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3  ">
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
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-1 gap-5 lg:grid-cols-3">
        <MetricsCard
          type="count"
          change={1.5}
          value="page_views"
          title="Page Views"
          down="true"
          theme="palette1"
        />
        <MetricsCard
          type="count"
          change={-2.5}
          value="sessions"
          title="Sessions"
          down="false"
          theme="palette4"
        />
        <MetricsCard
          type="time"
          change={3}
          value="avg_session"
          title="Avg. Session Length"
          down={false}
          theme="palette3"
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-5  lg:grid-cols-3">
        <div>
          <PieChart
            dark={false}
            label="Sessions by Device"
            mobileUsers={78343}
            tabletUsers={12244}
            desktopUsers={53345}
            otherUsers={44323}
          />
        </div>
        <div className="col-span-2">
          <ApexChart dark={false} />
        </div>
      </div>
    </div>
  );
}


export async function getStaticProps() {
  const res = await fetch('https://dashboard.jasch.dev/api/news')
  const news = await res.json()
  return {
    props: {
      news,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}
App.Layout = DefaultLayout;
