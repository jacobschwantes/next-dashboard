import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { BellIcon } from "@heroicons/react/outline";
import Image from "next/image";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
export default function ProfileMenu(props) {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div >
        <Menu.Button className=" hover:scale-110 transition-transform   rounded-full hover:brightness-90  ">
          
      <Image src={props.session.user.image} className="h-9 w-9 rounded-full inline-block "></Image>
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
    
        <Menu.Items className=" origin-top-right absolute right-0 mt-2 w-52 rounded-lg  shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
         
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
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
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
  );
}