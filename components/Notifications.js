import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { BellIcon, ClockIcon, MailIcon, CalendarIcon } from "@heroicons/react/outline";
import {  CheckIcon,  } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function findTime(time) {
    let now = Date.now();
    let difference = now / 1000 - time;
    if (difference < 3600) {
        return `${Math.round(difference / 60)} minutes ago`
    } if (difference < 86400) {
        return `about ${Math.round(difference / 3600)} hours ago`
    } else {
        return `${(difference / 86400).toFixed(0)} days ago`
    }
}
const unread = [
  {
    icon: MailIcon,
    message: "You have a new message",
    submessage: "7 unread messages.",
    timestamp: 1643689162,
  },
  {
    icon: CalendarIcon,
    message: "You have a new message",
    submessage: "7 unread messages.",
    timestamp: 1643689162,
  },
];
const read = [];
export default function Notifications(props) {
  return (
    <Menu as="div" className=" xs:relative   inline-block text-left">
      <div className="flex items-center">
        <Menu.Button className=" hover:scale-110 transition-transform ">
          <span className=" absolute z-10 bg-red-500 font-semibold text-white rounded-xl px-1 text-xs ">
            3
          </span>

          <BellIcon
            className="h-7 w-7 text-gray-700 hover:text-gray-800"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" origin-top-right absolute w-screen left-0 xs:right-0 xs:left-auto  mt-2 xs:w-80 rounded-md  shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div className=" px-4 py-2 transition-colors font-semibold flex justify-between items-center border-b">
                  <div className="flex flex-col ">
                    Notifications
                    <span className="text-sm text-gray-500 font-normal">
                      You have 2 unread messages
                    </span>
                  </div>
                  <CheckIcon className="h-6 w-6 hover:scale-110 text-blue-500 hover:text-blue-600 cursor-pointer" />
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
               <div
               href="#"
               className=
              
                 "block   text-sm transition-colors"
               
             >
               <h1 className="font-semibold text-gray-500 text-sm px-3 py-1">NEW</h1>
               {unread.map((item, index) => {
                 return (
                   <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-100 bg-blue-50 cursor-pointer">
                     <item.icon
                       className=
                         "flex-shrink-0 h-10 w-10 rounded-full  transition-colors text-blue-500"
                       
                       aria-hidden="true"
                     />
                     <div className="flex flex-col space-y-1">
                       
                      
                         <h1 className="font-semibold">
                           {item.message + " "}<span className="font-normal text-gray-500">{item.submessage}</span>
                         </h1>
                         <h1 className="flex items-center text-gray-400 text-xs"><ClockIcon className="h-3 w-3 mr-1 text-gray-400"/> {findTime(item.timestamp)}</h1>
                         
                     
                     </div>
                   </div>
                 );
               })}
             </div>
              )}
            </Menu.Item>
          </div>
          <div className="">
            <Menu.Item>
              {({ active }) => (
                 <div
                 href="#"
                 className=
                
                   "block   text-sm transition-colors"
                 
               >
                 <h1 className="font-semibold text-gray-500 text-sm px-3 py-1">RECENT</h1>
                 {unread.map((item, index) => {
                   return (
                     <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer">
                       <item.icon
                         className=
                           "flex-shrink-0 h-10 w-10 rounded-full  transition-colors text-blue-500"
                         
                         aria-hidden="true"
                       />
                       <div className="flex flex-col space-y-1">
                         
                        
                           <h1 className="font-semibold">
                             {item.message + " "}<span className="font-normal text-gray-500">{item.submessage}</span>
                           </h1>
                           <h1 className="flex items-center text-gray-400 text-xs"><ClockIcon className="h-3 w-3 mr-1 text-gray-400"/> {findTime(item.timestamp)}</h1>
                           
                       
                       </div>
                     </div>
                   );
                 })}
               </div>
              )}
            </Menu.Item>
          </div>
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm transition-colors cursor-pointer border-t text-center"
                  )}
                >
                  View All
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
