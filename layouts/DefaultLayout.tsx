import React, { Fragment, useState, createContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, CogIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Signin from "../components/Signin";
import Navigation from "../components/Navigation";
import Notifications from "../components/Notifications";
import ProfileMenu from "../components/ProfileMenu";
import { useRouter } from "next/router";
import Pages from "../components/Pages";
import Head from "next/head";
import { TerminalIcon } from "@heroicons/react/solid";
import Link from "next/link";
const scrollPages = ["/", "/cms"];

export default ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const [wideNav, setWideNav] = useState(false);

  const getTitle = () => {
    const path = router.asPath.replace("/", "");
    return path === "" ? "dashboard" : path;
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center  ">
        <img src="/loading.svg"></img>
      </div>
    );
  }

  if (status === "authenticated") {
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
                <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900 p-3 ">
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

                  <div className="flex items-center justify-start space-x-1   md:px-3 mb-2   ">
                    <TerminalIcon className="h-10 w-10 text-blue-500 " />
                    <h1
                      className=
                        " whitespace-nowrap text-2xl  font-medium dark:text-gray-100 "
                       
                    
                    >
                      next-dashboard
                    </h1>
                  </div>
                  <Pages setOpen={setSidebarOpen} wideNav={true} active={router.pathname} />
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
            <div className="sticky top-0 z-30  flex items-center justify-between bg-white p-2  dark:bg-gray-900 sm:pl-3 sm:pt-3 xl:hidden">
              <span>
                <button
                  type="button"
                  className="-ml-0.5 -mt-0.5 mr-1 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <span className="hidden text-2xl font-semibold text-gray-900 sm:inline-block">
                  Title
                </span>
              </span>
              <div>
                <span className=" flex items-center justify-center space-x-3 sm:space-x-5 ">
                  <Link href="/settings">
                    <CogIcon className="h-7 w-7 text-gray-700  hover:scale-110 hover:text-gray-800 dark:text-gray-400 cursor-pointer" />
                  </Link>
                  <Notifications />
                  <ProfileMenu session={session} />
                </span>
              </div>
            </div>
            <main className="flex h-screen flex-col overflow-hidden  ">
              <div className=" z-40 mx-auto   hidden w-full items-center justify-between bg-white py-3  dark:border-none dark:bg-gray-900   xl:flex xl:px-10 ">
                <span className="text-2xl font-semibold  capitalize text-gray-900 dark:text-gray-100">
                  {getTitle()}
                </span>
                <span className=" flex items-center justify-center space-x-5 ">
                <Link href="/settings">
                    <CogIcon className="h-7 w-7 text-gray-700  hover:scale-110 hover:text-gray-800 dark:text-gray-400 cursor-pointer" />
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
                {children}

                {/* /End replace */}
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }

  return <Signin />;
};
