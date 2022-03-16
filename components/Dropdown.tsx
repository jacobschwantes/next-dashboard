/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  CheckIcon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown(props) {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        {props.shortButton ? (
          <Menu.Button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            {props.orientation === 'horizontal' ? <DotsHorizontalIcon className="h-5 w-5" /> : <DotsVerticalIcon className="h-5 w-5" />}
          </Menu.Button>
        ) : (
          <Menu.Button className="inline-flex w-full items-center justify-center rounded-lg border-2 border-gray-200 bg-white px-2  py-1 text-sm font-medium text-gray-700 hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-offset-gray-900">
            <props.icon className="mr-1 h-4 w-4" /> {props.title}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-6 w-6"
              aria-hidden="true"
            />
          </Menu.Button>
        )}
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
        <Menu.Items className=" absolute right-0 z-30 mt-2 w-40 origin-top-right rounded-lg shadow-lg   ring-1 ring-black ring-opacity-5 focus:outline-none">
          {props.options.map((item, index) => {
            return (
              <Menu.Item key={index}>
                {({ active }) => (
                  <div
                    onClick={() => props.update(item.id)}
                    className={classNames(
                      active
                        ? " bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300"
                        : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-400",
                      " flex cursor-pointer items-center justify-between px-4 py-2 text-sm capitalize first:rounded-t-lg last:rounded-b-lg "
                    )}
                  >
                    {item.option}
                    {props.active === item.option ? (
                      <CheckIcon className="ml-1 h-5 w-5 text-blue-500" />
                    ) : null}
                  </div>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
