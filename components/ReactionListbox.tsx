import { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import {
  EmojiHappyIcon,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  ThumbUpIcon,
  XIcon,
  ThumbDownIcon,
  SparklesIcon,
} from "@heroicons/react/solid";
import { Listbox, Transition, Menu } from "@headlessui/react";
const reactions = [
  {
    name: "fire",
    icon: FireIcon,
    color: "text-red-500",
  },
  {
    name: "heart",
    icon: HeartIcon,
    color: "text-pink-400",
  },
  {
    name: "smile",
    icon: EmojiHappyIcon,
    color: "text-green-400",
  },
  {
    name: "frown",
    icon: EmojiSadIcon,
    color: "text-yellow-400",
  },
  {
    name: "thumbsup",
    icon: ThumbUpIcon,
    color: "text-blue-500",
  },
  {
    name: "thumbsdown",
    icon: ThumbDownIcon,
    color: "text-gray-400",
  },
  {
    name: "sparkles",
    icon: SparklesIcon,
    color: "text-yellow-400",
  },
];
const getIcon = (name: string) => {
  return reactions.find((item) => item.name === name);
};
const sampleData = [
  {
    name: "fire",
    users: [
      {
        name: "jacob schwantes",
        email: "jacobschwantes@gmail.com",
        timestamp: 1649720199,
      },
    ],
  },
  {
    name: "heart",
    users: [
      {
        name: "jacob schwantes",
        email: "jacobschwantes@gmail.com",
        timestamp: 1649720199,
      },
    ],
  },
  {
    name: "thumbsup",
    users: [],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ReactionListbox(props) {
  const [selected, setSelected] = useState(reactions[5]);
  const { data: session, status } = useSession();
  return (
    <div className="flex">
      <Menu as="div" className="relative flex items-center">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 bottom-8  origin-bottom-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex items-center p-1 ">
              {reactions.map((item) => {
                return (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-200 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <item.icon
                          className={classNames(
                            item.color,
                            item.iconColor,
                            "h-5 rounded-full"
                          )}
                        />
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>{" "}
        <Menu.Button className="mr-1">
          <EmojiHappyIcon className="h-6 text-gray-400" />
        </Menu.Button>
      </Menu>
      <div className="flex space-x-1">
        {sampleData.map((item) => {
          const icon = getIcon(item.name);
          const userReacted = item.users.find(
            (item) => item.email === session?.user?.email
          );
          return (
            <button
              className={classNames(
                userReacted
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-400 bg-gray-50",
                "flex rounded-full border px-2 py-0.5 text-sm "
              )}
            >
              <icon.icon
                className={classNames(icon?.color, "mr-1 h-5 rounded-full")}
              />
              {item.users.length}
            </button>
          );
        })}
      </div>
    </div>
  );
}
