import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { BellIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProjectDropdown(props) {
  const [access, setAccess] = useState('');
  useEffect(() => {
    props.members.forEach((item) => {
      if (item.email === props.session.user.email) {
        setAccess(item.access)
      }
    });
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" hover:scale-110 transition-transform   rounded-full hover:brightness-90  ">
    
          <DotsHorizontalIcon
            className={"h-6 text-gray-500 " + (props.grid ? "" : "text-gray-800")}
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
        <Menu.Items className=" z-10 origin-top-right absolute right-0 mt-2 w-52 rounded-lg  shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none  ">

          <Menu.Item>
            {({ active }) => (
              <a
                href={`/projects/${props.projectId}`}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-5 py-3 text-sm transition-colors  cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                )}
              >
                View
              </a>
            )}
          </Menu.Item> 
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-5 py-3 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
                )}
              >
                Notifications
              </a>
            )}
          </Menu.Item>
          {access === "owner" ? (

            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => props.settings(true)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-5 py-3 text-sm transition-colors  cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
          ) : null}




          {access === "owner" ? (
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => props.setDeleteModal(true)}
                  className={classNames(
                    active ? "bg-gray-100 text-red-600" : "text-red-500",
                    "block px-5 py-3 text-sm transition-colors  cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                  )}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
