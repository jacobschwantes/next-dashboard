import ProfileMenu from "./ProfileMenu";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  TerminalIcon,
} from "@heroicons/react/solid";
import Pages from "./Pages";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  SearchIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { signOut } from "next-auth/react";
const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "My tasks", href: "#", icon: ViewListIcon, current: false },
  { name: "Recent", href: "#", icon: ClockIcon, current: false },
];
const teams = [
  { name: "Engineering", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
  { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
];
const projects = [
  {
    id: 1,
    title: "GraphQL API",
    initials: "GA",
    team: "Engineering",
    members: [
      {
        name: "Dries Vincent",
        handle: "driesvincent",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        handle: "courtneyhenry",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        handle: "tomcook",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
    totalMembers: 12,
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-pink-600",
  },
  // More projects...
];
const pinnedProjects = projects.filter((project) => project.pinned);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navigation(props) {
  return (
    <div
      className={
        "  group-hover:w-72     scrollbar white hover:black  flex min-h-0  flex-1 flex-col overflow-y-auto overflow-x-hidden  border-gray-200  bg-white group-hover:bg-opacity-80  px-4 backdrop-blur-sm transition-transform dark:border-gray-800 dark:bg-gray-900 " +
        (props.wideNav
          ? " items-start w-72"
          : " items-center group-hover:items-start")
      }
    >
      <div className="flex items-center justify-start space-x-1   pt-5 md:px-3   ">
        <TerminalIcon className="h-10 w-10 text-blue-500 " />
        <h1
          className={
            " whitespace-nowrap text-2xl  font-medium dark:text-gray-100   " +
            (props.wideNav ? " block" : " hidden group-hover:block")
          }
        >
          next-dashboard
        </h1>
        <a
          className={
            "rounded-full   p-2 transition-all hover:scale-105 hover:bg-gray-100 active:scale-100 " +
            (props.wideNav ? "block" : "hidden group-hover:block")
          }
          onClick={() => props.setWideNav(!props.wideNav)}
        >
          <ChevronDoubleRightIcon
            className={
              "h-6 text-gray-500 transition-all " +
              (props.wideNav ? " -rotate-180" : "")
            }
          />
        </a>
      </div>
      <Menu as="div" className={
                "  py-5 relative    " +
                (props.wideNav ? " w-full" : " group-hover:w-full")
              }>
     
          <Menu.Button className="flex flex-col w-full">
           
              <div
                className={
                  "flex items-center w-full justify-between  rounded-lg bg-opacity-80 py-5   dark:bg-gray-800" +
                  (props.wideNav
                    ? " bg-gray-100 px-3"
                    : " group-hover:bg-gray-100 group-hover:px-3")
                }
              ><span className="flex">
                <img
                
                  src={props.session.user.image}
                  className={
                    " h-10 w-10 rounded-full " +
                    (props.wideNav ? " mr-4" : " group-hover:mr-4")
                  }
                ></img>
                <span
                  className={
                    " flex-col items-start w-36   truncate" +
                    (props.wideNav ? " flex " : " hidden group-hover:flex")
                  }
                >
                  <h1 className="text-sm font-semibold dark:text-gray-100">
                    {props.session.user.name}
                  </h1>
                  <h1 className="text-sm text-gray-600 dark:text-gray-400">
                    {props.session.user.email.length > 16 ? (props.session.user.email.slice(0, 16) + '...') : props.session.user.email}
                  </h1>
                </span></span>
                
                <SelectorIcon
                  className={"h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" + (props.wideNav ? " block" : " hidden group-hover:block")}
                  aria-hidden="true"
                /> 
              </div>
     
          </Menu.Button>
       
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
         <Menu.Items className=" origin-top-right w-full absolute right-0 mt-2  rounded-lg  shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
         
         <Menu.Item>
             {({ active }) => (
               <div
                
                 className=
            
                   " px-5 py-3 text-sm transition-colors flex flex-col border-b  "
     
               >
                 <span className=" font-semibold ">
                 {props.session.user.name}</span>
                 <span className="text-xs truncate overflow-hidden text-gray-500 ">{props.session.user.email}</span>
                 
               </div>
             )}
           </Menu.Item>
           <Menu.Item>
             {({ active }) => (
               <a
                 href="#"
                 className={classNames(
                   active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                   "block px-5 py-3 text-sm transition-colors"
                 )}
               >
                 Settings
               </a>
             )}
           </Menu.Item>
           <Menu.Item>
             {({ active }) => (
               <a
                 href="#"
                 className={classNames(
                   active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                   "block px-5 py-3 text-sm transition-colors"
                 )}
               >
                 Notifications
               </a>
             )}
           </Menu.Item>
        
      
           <Menu.Item>
             {({ active }) => (
               <a
                 href="#"
                 className={classNames(
                   active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                   "block px-5 py-3 text-sm transition-colors"
                 )}
               >
                 Support
               </a>
             )}
           </Menu.Item>
     
   
           <Menu.Item>
             {({ active }) => (
               <a
               href="/"
                 onClick={(e) => {
                   e.preventDefault();
                   signOut({
                     callbackUrl: `${window.location.origin}`
                   });
                   
                 }}
                 className={classNames(
                   active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                   "block px-5 py-3 text-sm transition-colors cursor-pointer border-t rounded-b-lg"
                 )}
               >
                 Logout
               </a>
             )}
           </Menu.Item>
     
       </Menu.Items>
        </Transition>
      </Menu>

      <div className="w-full flex-1   ">
        <Pages setOpen={props.setOpen} wideNav={props.wideNav} active={props.active} />
      </div>
    </div>
  );
}
