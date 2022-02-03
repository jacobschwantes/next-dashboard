import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Signin from "../components/Signin";
import Navigation from "../components/Navigation";
import { CogIcon } from "@heroicons/react/outline";
import Notifications from "../components/Notifications";
import ProfileMenu from "../components/ProfileMenu";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  
  if (status === 'authenticated') {
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
                   <Navigation/>
                  </div>
                 
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
          {/* Static sidebar for desktop */}
          <div className="hidden xl:flex xl:w-64 xl:flex-col xl:fixed xl:inset-y-0 xl:z-50">
            {/* Sidebar component, swap this element with another sidebar if you like */}
           <Navigation session={session} active='news'/>
          </div>
          <div className="xl:pl-56 flex flex-col flex-1 ">
            <div className="sticky top-0 z-20 xl:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
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
              <div className="py-3">
              <div className=" py-3 mx-auto px-4 sm:px-6 md:px-16  sticky top-0  z-40 flex justify-between bg-white bg-opacity-60 backdrop-blur   ">
                  <span className="text-2xl font-semibold text-gray-900">
                    News
                  </span>
                  <span className=" space-x-5 flex items-center justify-center ">
                    <button>
                    <CogIcon className="h-7 w-7 text-gray-700 hover:text-gray-800 hover:scale-110" /></button>
                    <Notifications />
                    <ProfileMenu session={session} />
                  </span>
                </div>
                <div className=" mx-auto px-4 sm:px-6 md:px-8 max-w-8xl">
                  <div className="py-4 space-y-5">
                 
                  
                  
                   
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  } if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen w-screen"><img src="loading.svg"></img></div>
  }
  return <Signin />;
}
