import React, { Fragment, useState, createContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, CogIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Signin from "../components/Signin";
import Navigation from "../components/Navigation";
import Notifications from "../components/Notifications";
import ProfileMenu from "../components/ProfileMenu";
import { useRouter } from "next/router";
import Head from "next/head";
const scrollPages = ['/', '/cms'];

export default ({ children }) => {
const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const [wideNav, setWideNav] = useState(false);
  
const getTitle = () => {
    const path = router.asPath.replace('/', '');
    return path === '' ? 'dashboard' : path;
}

if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen w-screen  ">
        <img src="/loading.svg"></img>
      </div>
    )}

  if (status === "authenticated") {
    return (
      <>
      <Head>
        <title>next-dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div className=" flex items-center justify-between  ">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-30 xl:hidden"
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
                <div className="relative flex-1 flex flex-col max-w-xs w-full dark:bg-gray-900 bg-white ">
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

                  <Navigation session={session} active={'app'} />
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
          {/* Static sidebar for desktop */}
          <div className={"hidden xl:flex    border-r h-screen  xl:flex-col xl:inset-y-0  xl:z-50 overflow-hidden group duration-300 transition-all " + (wideNav ? ' xl:w-72 ' : ' xl:hover:w-72 xl:w-24  xl:fixed')}>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <Navigation setWideNav={setWideNav} wideNav={wideNav} session={session} active={router.pathname} />
          </div>
          <div className={" transition-all h-screen flex flex-col overflow-hidden flex-1  " + (wideNav ? "  " : " xl:pl-24")}>
            <div className="sticky top-0  xl:hidden sm:pl-3 sm:pt-3 dark:bg-gray-900 bg-white  flex justify-between items-center p-2">
              <span>
                <button
                  type="button"
                  className="-ml-0.5 -mt-0.5 h-12 w-12 mr-1 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={() => setSidebarOpen(true)}
                >
                
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <span className="text-2xl font-semibold text-gray-900 hidden sm:inline-block">
                  Title
                </span>
              </span>
              <div>
                <span className=" sm:space-x-5 space-x-3 flex items-center justify-center ">
                  <button>
                    <CogIcon className="h-7 w-7 text-gray-700  dark:text-gray-400 hover:text-gray-800 hover:scale-110" />
                  </button>
                  <Notifications />
                  <ProfileMenu session={session} />
                </span>
              </div>
            </div>
            <main className="h-screen flex flex-col overflow-hidden  ">
           
                <div className=" py-3 mx-auto   z-40 xl:flex justify-between w-full bg-white dark:bg-gray-900  hidden xl:px-10   dark:border-none items-center ">
                  <span className="text-2xl capitalize  font-semibold text-gray-900 dark:text-gray-100">
                    { getTitle() }
                  </span>
                  <span className=" space-x-5 flex items-center justify-center ">
                    <button>
                      <CogIcon className="h-7 w-7 text-gray-700 dark:text-gray-400 hover:text-gray-800 hover:scale-110" />
                    </button>
                    <Notifications />
                    <ProfileMenu session={session} />
                  </span>
                </div>
              <div  className={ scrollPages.includes(router.pathname) ? "overflow-auto scrollbar black" : null} >
                
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
}
    
  


  






