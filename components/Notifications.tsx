import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import {
  BellIcon,
  ClockIcon,
  MailIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import { useNotifications } from "../lib/utils";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function findTime(time) {
  let now = Date.now();
  let difference = now / 1000 - time;
  if (difference < 3600) {
    return `${Math.round(difference / 60)} minutes ago`;
  }
  if (difference < 86400) {
    return `about ${Math.round(difference / 3600)} hours ago`;
  } else {
    return `${(difference / 86400).toFixed(0)} days ago`;
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
  const { notifications, isLoading, isError } = useNotifications();
  !isLoading ? console.log(notifications) : null
  return (
    <Menu as="div" className=" inline-block  text-left xs:relative">
      <div className="flex items-center">
        <Menu.Button className=" transition-transform hover:scale-110 ">
          <span className=" absolute z-10 rounded-xl bg-red-500 px-1 text-xs font-semibold text-white ">
            3
          </span>

          <BellIcon
            className="h-7 w-7 text-gray-700 hover:text-gray-800 dark:text-gray-400"
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
        <Menu.Items className=" absolute left-0 z-10 mt-2 w-screen origin-top-right rounded-md  bg-white shadow-lg ring-1  ring-black  ring-opacity-5 focus:outline-none dark:bg-gray-800 xs:right-0 xs:left-auto xs:w-80 ">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div className=" flex items-center justify-between border-b px-4 py-2 font-semibold transition-colors dark:border-gray-700 dark:text-gray-100">
                  <div className="flex flex-col ">
                    Notifications
                    <span className="text-sm font-normal text-gray-500">
                     {isLoading ? 'loading..' : `You have ${notifications.unreadNotifications.length} unread messages`}
                    </span>
                  </div>
                  <CheckIcon className="h-6 w-6 cursor-pointer text-blue-500 hover:scale-110 hover:text-blue-600" />
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div href="#" className="block   text-sm transition-colors">
                  <h1 className="px-3 py-1 text-sm font-semibold text-gray-500">
                    NEW
                  </h1>
                  {!isLoading ? notifications.unreadNotifications.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center space-x-3 bg-blue-50 p-3 hover:bg-gray-100 dark:bg-blue-700 dark:bg-opacity-25 dark:hover:bg-gray-700"
                      >
                        <MailIcon
                          className="h-10 w-10 flex-shrink-0 rounded-full  text-blue-500 transition-colors"
                          aria-hidden="true"
                        />
                        <div className="flex flex-col space-y-1">
                          <h1 className="font-semibold dark:text-gray-200">
                            {item.event.user.name + " completed "}
                            <span className="font-normal text-gray-500 dark:text-gray-400">
                              {item.payload.taskName + ' ' + item.event.id}
                            </span>
                          </h1>
                          <h1 className="flex items-center text-xs text-gray-400">
                            <ClockIcon className="mr-1 h-3 w-3 text-gray-400" />{" "}
                            {findTime(item.timestamp / 1000)}
                          </h1>
                        </div>
                      </div>
                    );
                  }): null}
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <div href="#" className="block   text-sm transition-colors">
                  <h1 className="px-3 py-1 text-sm font-semibold text-gray-500">
                    RECENT
                  </h1>
                  {unread.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <item.icon
                          className="h-10 w-10 flex-shrink-0 rounded-full  text-blue-500 transition-colors"
                          aria-hidden="true"
                        />
                        <div className="flex flex-col space-y-1">
                          <h1 className="font-semibold dark:text-gray-200">
                            {item.message + " "}
                            <span className="font-normal text-gray-500 dark:text-gray-400">
                              {item.submessage}
                            </span>
                          </h1>
                          <h1 className="flex items-center text-xs text-gray-400">
                            <ClockIcon className="mr-1 h-3 w-3 text-gray-400" />{" "}
                            {findTime(item.timestamp)}
                          </h1>
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
                    active
                      ? "bg-gray-700 text-gray-900 dark:text-gray-300"
                      : "text-gray-700 dark:text-gray-200",
                    "block cursor-pointer rounded-b-lg border-t px-4 py-2 text-center text-sm transition-colors dark:border-gray-700"
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
