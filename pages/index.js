import ApexChart from "./components/LineGraph";
import PieChart from "./components/PieChart";
import MetricsCard from "./components/MetricCard";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Table from "./components/Table";
import { useSession } from "next-auth/react";
import Signin from "./components/Signin";
import ProfileMenu from "./components/ProfileMenu";
import Navigation from "./components/Navigation";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    page_views: null,
    sessions: null,
    avg_session: null,
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch("/api/getAnalyticsData")
      .then((res) => res.json())
      .then((data) => setAnalyticsData(data))
      .catch((err) => console.log(err));
  }, []);
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
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <ProfileMenu session={session} />
                    <Navigation active="app" />
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
          {/* Static sidebar for desktop */}
          <div className="hidden xl:flex xl:w-64 xl:flex-col xl:fixed xl:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <ProfileMenu session={session} />
                <Navigation active="app" />
              </div>
            </div>
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
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <span className="text-2xl font-semibold text-gray-900">
                    Dashboard
                  </span>
                </div>
                <div className=" mx-auto px-4 sm:px-6 md:px-8 max-w-8xl">
                  <div className="lg:py-4 space-y-5">
                    <div className="grid md:grid-cols-3 gap-5 grid-cols-1">
                      <div className=" rounded-2xl    border   border-gray-200 col-span-3 3xl:col-span-2 bg-blue-100 relative hidden lg:block ">
                        <div className="z-10 pt-5 px-10 absolute space-y-3 w-1/3">
                          <h1 className=" text-3xl xl:text-4xl  font-bold  tracking-tight text-gray-800 text-left">
                            Welcome back,
                            <br/>
                            {session.user.name.split(' ')[0]}!
                          </h1>
                          <p></p>
                        </div>
                        <svg
                          className="rounded-2xl"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 25 1440 200"
                        >
                          <path
                            fill="#1E3A8A"
                            fill-opacity="1"
                            d="M0,288L40,261.3C80,235,160,181,240,181.3C320,181,400,235,480,213.3C560,192,640,96,720,58.7C800,21,880,43,960,85.3C1040,128,1120,192,1200,208C1280,224,1360,192,1400,176L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5 grid-rows-1 w-full">
                      <MetricsCard
                        type='count'
                        change={1.5}
                        count={analyticsData.page_views}
                        title="Page Views"
                        down="true"
                      />
                      <MetricsCard
                        type='count'
                        change={-2.5}
                        count={analyticsData.sessions}
                        title="Sessions"
                        down="false"
                      />
                      <MetricsCard
                        type='time'
                        change={3}
                        count={analyticsData.avg_session}
                        title="Avg. Session Length"
                        down={false}
                      />
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5  w-full">
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
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5  w-full">
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
