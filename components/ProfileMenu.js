import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { SelectorIcon } from "@heroicons/react/solid";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
export default function ProfileMenu(props) {
  return (
    <Menu>
      <div className="flex-shrink-0 flex items-center lg:px-2 ">
        <Menu.Button className="group w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-sm text-left font-medium text-gray-700 transition-colors hover:bg-gray-200 ">
          <span className="flex w-full justify-between items-center">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              <img
                className="w-9 h-9 bg-gray-300 rounded-full flex-shrink-0"
                src={props.session.user.image}
                alt=""
              />
              <span className="flex-1 flex flex-col min-w-0">
                <span className="text-gray-900 text-sm font-medium truncate">
                  {props.session.user.name}
                </span>
                <span className="text-gray-500 text-xs truncate">
                  {props.session.user.email}
                </span>
              </span>
            </span>
            <SelectorIcon
              className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" z-50 mx-3 origin-bottom absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none transition-colors">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm transition-colors"
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
                    "block px-4 py-2 text-sm transition-colors"
                  )}
                >
                  Notifications
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm transition-colors"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm transition-colors cursor-pointer"
                  )}
                >
                  Logout
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
