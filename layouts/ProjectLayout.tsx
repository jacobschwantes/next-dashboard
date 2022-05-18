import React, { Fragment, useState, createContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  CogIcon,
  AdjustmentsIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChatAlt2Icon,
  ExclamationIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Signin from "../components/Signin";
import Navigation from "../components/Navigation";
import Notifications from "../components/Notifications";
import ProfileMenu from "../components/ProfileMenu";
import { useRouter } from "next/router";
import { useProject } from "../lib/utils";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import Head from "next/head";
import { TerminalIcon } from "@heroicons/react/solid";
import Pages from "../components/Pages";
const scrollPages = ["/", "/cms"];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function App({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const [wideNav, setWideNav] = useState(false);
  const projectTabs = [
    { name: "overview", icon: GlobeAltIcon },
    { name: "tasks", icon: BriefcaseIcon },
    { name: "insights", icon: ChartBarIcon },
    { name: "team", icon: UserGroupIcon },
    { name: "discussions", icon: ChatAlt2Icon },
    { name: "issues", icon: ExclamationIcon },
    { name: "settings", icon: CogIcon },
    { name: "log", icon: ArchiveIcon },
  ];
  const { projectId, issueId } = router.query;
  const { project, isLoading, error } = useProject(projectId);

  const getBreadcrumbs = () => {
    const crumbs = [];
    const paths = router.route.split("/");

    paths.forEach((path) => {
      if (path !== "") {
        switch (path) {
          case "[projectId]":
            crumbs.push({
              name: project ? project.name : error ? "Error" : "Loading",
              href: `/projects/${projectId}`,
            });
            break;
          case "[issueId]":
            crumbs.push({
              name: issueId,
              href: `/projects/${projectId}/issues/${issueId}`,
            });
            break;
          case "projects":
            crumbs.push({
              name: "projects",
              href: "/projects",
            });
            break;
          default:
            crumbs.push({
              name: path,
              href: `/projects/${projectId}/${path}`,
            });
            break;
        }
      }
    });
    return crumbs;
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center  ">
        <img src="/loading.svg"></img>
      </div>
    );
  }

  if (status === "authenticated") {
    {
 
    }
    return (
      <>
        <Head>
          <title>next-dashboard</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className=" flex items-center justify-between  ">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-30 flex xl:hidden"
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
                <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900 ">
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
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

                  <div className="mb-2 flex items-center justify-start   space-x-1 md:px-3   ">
                    <TerminalIcon className="h-10 w-10 text-blue-500 " />
                    <h1 className=" whitespace-nowrap text-2xl  font-medium dark:text-gray-100 ">
                      next-dashboard
                    </h1>
                  </div>
                  <Pages
                    setOpen={setSidebarOpen}
                    wideNav={true}
                    active={router.pathname}
                  />
                </div>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
          {/* Static sidebar for desktop */}
          <div
            className={
              "group hidden    h-screen overflow-hidden  border-r transition-all  duration-300 xl:inset-y-0 xl:z-50 xl:flex xl:flex-col " +
              (wideNav ? " xl:w-72 " : " xl:fixed xl:w-24  xl:hover:w-72")
            }
          >
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <Navigation
              setOpen={setSidebarOpen}
              setWideNav={setWideNav}
              wideNav={wideNav}
              session={session}
              active={router.pathname}
            />
          </div>
          <div
            className={
              " flex h-screen flex-1 flex-col overflow-hidden transition-all  " +
              (wideNav ? "  " : " xl:pl-24")
            }
          >
            <div className="sticky top-0  flex items-center justify-between bg-white p-2  dark:bg-gray-900 sm:pl-3 sm:pt-3 xl:hidden">
              <span>
                <button
                  type="button"
                  className="-ml-0.5 -mt-0.5 mr-1 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <span className="text-md hidden font-semibold text-gray-900 sm:inline-block">
                  <Breadcrumbs pages={getBreadcrumbs()} />
                </span>
              </span>
              <div>
                <span className=" flex items-center justify-center space-x-3 sm:space-x-5 ">
                  <Link href="/settings">
                    <CogIcon className="h-7 w-7 cursor-pointer  text-gray-700 hover:scale-110 hover:text-gray-800 dark:text-gray-400" />
                  </Link>
                  <Notifications />
                  <ProfileMenu session={session} />
                </span>
              </div>
            </div>
            <main className="flex h-screen flex-col overflow-hidden  ">
              <div className=" z-40 mx-auto   hidden w-full items-center justify-between bg-white py-3  dark:border-none dark:bg-gray-900   xl:flex xl:px-10 ">
                <span className="text-xl font-semibold  text-gray-900 dark:text-gray-100">
                  <Breadcrumbs pages={getBreadcrumbs()} />
                </span>
                <span className=" flex items-center justify-center space-x-5 ">
                  <Link href="/settings">
                    <CogIcon className="h-7 w-7 cursor-pointer  text-gray-700 hover:scale-110 hover:text-gray-800 dark:text-gray-400" />
                  </Link>
                  <Notifications />
                  <ProfileMenu session={session} />
                </span>
              </div>
              <div
                className={
                  scrollPages.includes(router.pathname)
                    ? "scrollbar black overflow-auto"
                    : null
                }
              >
                <div className=" space-y-4  px-2 py-4  xl:px-10 2xl:w-2/3 h-partial overflow-auto">
                  {isLoading ? (
                    "loading "
                  ) : error ? (
                    error.info
                  ) : (
                    <>
                      <div className="flex space-x-2 rounded-xl bg-gray-100 p-1  ">
                        {projectTabs.map((tab) => {
                          return (
                            <Link
                              key={tab.name}
                              href={
                                tab.name === "overview"
                                  ? `/projects/${projectId}`
                                  : `/projects/${projectId}/${tab.name}`
                              }
                            >
                              <a
                                key={tab.name}
                                className={classNames(
                                  "flex w-full items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 ",
                                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                  router.asPath.includes(tab.name) ||
                                    (router.asPath ===
                                      `/projects/${projectId}` &&
                                      tab.name === "overview")
                                    ? "bg-white text-blue-700 shadow"
                                    : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-600"
                                )}
                              >
                                <h1 className="hidden sm:block">{tab.name}</h1>{" "}
                                <tab.icon className="h-5 sm:hidden" />
                              </a>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="rounded-xl bg-white">{children}</div>
                    </>
                  )}
                </div>

                {/* /End replace */}
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }

  return <Signin />;
}
