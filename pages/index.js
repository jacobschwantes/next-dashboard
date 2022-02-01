import ApexChart from "../components/LineGraph";
import PieChart from "../components/PieChart";
import MetricsCard from "../components/MetricCard";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon, TerminalIcon } from "@heroicons/react/outline";
import Table from "../components/Table";
import { useSession } from "next-auth/react";
import Signin from "../components/Signin";
import ProfileMenu from "../components/ProfileMenu";
import Navigation from "../components/Navigation";
import { useAnalytics } from "../lib/utils";
import EmblaCarousel from "../components/Carousel";


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    page_views: null,
    sessions: null,
    avg_session: null,
  });
  const { data: session, status } = useSession();
  const SLIDE_COUNT = 2;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  if (status === "authenticated") {
    return (
      <>
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 xl:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                 
                    <Navigation session={session} active='app'/>
                  </div>
                
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
          {/* Static sidebar for desktop */}
          <div className="hidden xl:flex xl:w-72 xl:flex-col xl:fixed xl:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <Navigation session={session} active='app' />
          </div>
          <div className="xl:pl-64 flex flex-col flex-1 ">
            <div className="sticky top-0 z-10 xl:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <main className="flex-1">
              <div className="py-6">
                <div className=" mx-auto px-4 sm:px-6 md:px-20">
                  <span className="text-2xl font-semibold text-gray-900">
                    Dashboard
                  </span>
                </div>
                <div className=" mx-auto px-4 sm:px-6 md:px-20 md:py-4 ">
                  <div className="lg:py-4 space-y-5">
                    <div className="grid lg:grid-cols-3 gap-5 grid-cols-1   pt-4">
                      <div className=" rounded-2xl    border   border-gray-200 md:col-span-2  bg-blue-50   col-span-1 ">
                        <div className=" p-10 space-y-3  flex md:justify-between justify-start items-center flex-col md:flex-row ">
                          <div className=" flex flex-col items-center md:items-start justify-center md:justify-start space-y-4 ">
                            <h1 className=" text-3xl   font-bold  tracking-tight text-gray-800 md:text-left text-center ">
                              Welcome back,
                              <br />
                              {session.user.name}!
                            </h1>
                            <p className=" md:text-left text-center  ">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Integer vestibulum aliquet condimentum.{" "}
                            </p>
                            <button
                              type="submit"
                              className="  flex justify-center py-2 px-4 border border-transparent rounded-md  bg-blue-500 shadow-lg shadow-blue-500/50 text-sm font-medium text-white  hover:bg-blue-400 hover:shadow-none transition-all focus:outline-none focus:ring-2  focus:ring-blue-500"
                            >
                              View Report
                            </button></div>
                          
                          <img className="  max-h-64 " src="saly-10.png"></img>
                        </div>
                      </div>
                      <div className="  col-span-1">
                        <EmblaCarousel slides={slides}/>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 grid-rows-1 w-full">
                      <MetricsCard
                        type="count"
                        change={1.5}
                        value="page_views"
                        title="Page Views"
                        down="true"
                      />
                      <MetricsCard
                        type="count"
                        change={-2.5}
                        value="sessions"
                        title="Sessions"
                        down="false"
                      />
                      <MetricsCard
                        type="time"
                        change={3}
                        value="avg_session"
                        title="Avg. Session Length"
                        down={false}
                      />
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5  w-full">
                      <div>
                        <PieChart
                          label="Sessions by Device"
                          mobileUsers={10}
                          tabletUsers={20}
                          desktopUsers={40}
                          otherUsers={50}
                        />
                      </div>
                      <div className="col-span-2">
                        <ApexChart />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5  w-full">
                      <div className=" col-span-2">
                        <Table />
                      </div>
                    </div>
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <img src="loading.svg"></img>
      </div>
    );
  }
  return <Signin />;
}
