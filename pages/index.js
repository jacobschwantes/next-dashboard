import Wrapper from "../components/Wrapper";
import { SessionContext } from "../components/Wrapper";
import EmblaCarousel from "../components/Carousel";
import ApexChart from "../components/LineGraph";
import PieChart from "../components/PieChart";
import MetricsCard from "../components/MetricCard";
import Table from "../components/Table";
import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
export default function App() {
  const { data: session, status } = useSession();
  const SLIDE_COUNT = 2;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  return (
          <div className=" space-y-5 xl:px-10 px-4 py-4   overflow-auto">
            <div className="grid lg:grid-cols-3 gap-5 grid-cols-1  ">
              <div className=" rounded-2xl    border   border-gray-200 md:col-span-2  bg-blue-100 dark:bg-blue-200   col-span-1 ">
                <div className=" p-10 space-y-3  flex md:justify-between justify-start items-center flex-col md:flex-row ">
                  <div className=" flex flex-col items-center md:items-start justify-center md:justify-start space-y-3 ">
                    <h1 className=" 2xl:text-3xl text-2xl font-semibold   text-gray-800 md:text-left text-center ">
                      Welcome back,
                      <br />
                      {session.user.name}!
                    </h1>
                    <p className=" md:text-left text-center pb-2 ">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer vestibulum aliquet condimentum.
                    </p>
                    <button
                      onClick={() => {fetch('/api/testcreate').then(res => console.log(res))}}
                      type="submit"
                      className="  flex justify-center py-2 px-4 border border-transparent rounded-md  bg-blue-500 shadow-lg shadow-blue-500/50 text-sm font-medium text-white   hover:shadow-none transition-all focus:outline-none focus:ring-2  focus:ring-blue-500 hover:scale-105"
                    >
                      View Report
                    </button>
                  </div>

                  <img
                    className="  2xl:max-h-64 max-h-52  "
                    src="dashboard5.svg"
                  ></img>
                </div>
              </div>
              <div className="  col-span-1">
                <EmblaCarousel slides={slides} />
              </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 grid-rows-1 w-full">
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
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5  w-full">
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
App.Layout = DefaultLayout
