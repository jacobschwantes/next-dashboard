import { useRouter } from "next/router";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProjectBoard from "../../components/ProjectBoard";
import Wrapper, { SessionContext } from "../../components/Wrapper";
import { useProject } from "../../lib/utils";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, PencilAltIcon } from "@heroicons/react/outline";
import {
  DotsHorizontalIcon,
  PlusIcon,
  SortAscendingIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { ClockIcon, UserAddIcon, PencilIcon } from "@heroicons/react/outline";
import Dropdown from "../../components/Dropdown";
import { useState } from "react";

import { Tab } from "@headlessui/react";

const sampleTasks = [
  {
    group: "Completed",
    tasks: [
      {
        task: "Implement authentication",
        members: [
          {
            name: "Jacob Schwantes",
            image:
              "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
          },
          {
            name: "Aquas Motion",
            image:
              "https://lh3.googleusercontent.com/a-/AOh14GhLYOqpqb-0FA-K-6s0wnxq8G5vpGkqEz2i1WbjTQ=s96-c",
          },
        ],
        description:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        priority: 0,
        subtasks: [
          {
            task: "Wireframe design",
            priority: 1,
            members: [],
            description:
              "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          },
          {
            task: "get approval for base endpoints",
            priority: 0,
            members: [
              {
                name: "Jacob Schwantes",
                image:
                  "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
              },
            ],
            description:
              "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          },
        ],
      },
      {
        task: "Implement authentication",
        priority: 3,
        members: [
          {
            name: "Jacob Schwantes",
            image:
              "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
          },
          {
            name: "Aquas Motion",
            image:
              "https://lh3.googleusercontent.com/a-/AOh14GhLYOqpqb-0FA-K-6s0wnxq8G5vpGkqEz2i1WbjTQ=s96-c",
          },
        ],
        description:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        subtasks: [
          {
            task: "Wireframe design",
            complete: true,
            priority: 2,
            members: [],
            description:
              "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          },
          {
            task: "get approval for base endpoints",
            complete: true,
            priority: 3,
            members: [
              {
                name: "Jacob Schwantes",
                image:
                  "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
              },
            ],
            description:
              "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          },
        ],
      },
    ],
  },
  // More groups...
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PriorityTag = (props) => {
  switch (props.priority) {
    case 0:
      return (
        <span className="rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-600">
          Low priority
        </span>
      );
    case 1:
      return "";
    case 2:
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-600">
          High priority
        </span>
      );
    case 3:
      return (
        <span className="rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-600">
          Urgent
        </span>
      );
    default:
      return "";
  }
};
export default function App() {
  const router = useRouter();
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });
  const { pid } = router.query;
  console.log(pid);
  const { project, isLoading, error } = useProject(`?id=${pid}`);
  return (
    <div className="scrollbar black scrollbarY h-partial space-y-5 overflow-auto px-4 py-4  xl:px-10 ">
      <Breadcrumbs
        pages={[
          { name: "Projects", href: "/projects", current: false },
          {
            name: project ? project.name : error ? "Error" : "Loading",
            href: `/projects/${pid}`,
            current: true,
          },
        ]}
      />
      <div className="w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-white p-3",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                <ul>
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="hover:bg-coolGray-100 relative rounded-md p-3"
                    >
                      <h3 className="text-sm font-medium leading-5">
                        {post.title}
                      </h3>

                      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                        <li>{post.date}</li>
                        <li>&middot;</li>
                        <li>{post.commentCount} comments</li>
                        <li>&middot;</li>
                        <li>{post.shareCount} shares</li>
                      </ul>

                      <a
                        href="#"
                        className={classNames(
                          "absolute inset-0 rounded-md",
                          "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <dl className="mt-6  w-2/3 ">
        {sampleTasks.map((item) => (
          <Disclosure as="div" key={item.group} className="pt-6 ">
            {({ open }) => (
              <>
                <dt className="flex w-full items-center justify-between space-x-3 text-left text-lg ">
                  <Disclosure.Button className=" flex flex-1 items-center space-x-3 text-gray-400 ">
                    <span className="flex h-7 items-center">
                      <ChevronDownIcon
                        className={classNames(
                          open ? "rotate-0" : "-rotate-90",
                          "h-6 w-6 transform "
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-medium text-gray-900 ">
                      {item.group}
                    </span>
                    <span className=" flex-1 border border-gray-200"></span>
                  </Disclosure.Button>
                  {open ? (
                    <span className="flex space-x-2">
                      <button className=" flex  items-center rounded-lg border-2  border-gray-200 p-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <SortAscendingIcon className="mr-1 h-4 w-4" />
                        Date (asc)
                      </button>
                      <button className=" flex  items-center rounded-lg border-2  border-gray-200 p-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <SortAscendingIcon className="mr-1 h-4 w-4" /> Priority
                        (asc)
                      </button>
                    </span>
                  ) : null}
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 ">
                  <div className=" flex flex-col space-y-4">
                    {item.tasks.map((taskItem) => {
                      return (
                        <div className="flex space-x-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100  ">
                          <input
                            checked={taskItem.subtasks.every(
                              (item) => item.complete
                            )}
                            id="candidates"
                            aria-describedby="candidates-description"
                            name="candidates"
                            type="checkbox"
                            className="mt-2 h-6 w-6 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                          />

                          <div className="flex-1">
                            <div className="mb-3">
                              <div className=" flex items-center justify-between   ">
                                <p className="text-xl font-medium ">
                                  {taskItem.task}
                                </p>
                                <div className=" flex items-center space-x-2">
                                  <Dropdown
                                    icon={PencilIcon}
                                    title="Priority"
                                    active="High"
                                    options={[
                                      { option: "Low" },
                                      { option: "Normal" },
                                      { option: "High" },
                                      { option: "Urgent" },
                                    ]}
                                  />
                                  <button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700">
                                    <DotsHorizontalIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                              <span>
                                <p className="text-base text-gray-500">
                                  {taskItem.description}
                                </p>
                              </span>
                            </div>
                            <h1 className="text-lg font-medium">Sub-Tasks</h1>

                            <dl className="  ">
                              {taskItem.subtasks.map((subTaskItem) => (
                                <div className="space-y-3 border-b py-4 pb-4 first:pt-2  last:border-white">
                                  <Disclosure
                                    as="div"
                                    key={subTaskItem.task}
                                    className=" "
                                  >
                                    {({ open }) => (
                                      <>
                                        <dt className="flex w-full items-center justify-between text-lg ">
                                          <div className="flex items-center space-x-3">
                                            <input
                                              id="candidates"
                                              aria-describedby="candidates-description"
                                              name="candidates"
                                              type="checkbox"
                                              className="h-6 w-6 rounded-full border-gray-300  text-blue-600 focus:ring-blue-500"
                                            />

                                            <span className="font-medium capitalize text-gray-600 ">
                                              {subTaskItem.task}
                                            </span>
                                            <PriorityTag
                                              priority={subTaskItem.priority}
                                            />

                                            <Disclosure.Button>
                                              <h1 className="text-sm font-medium text-blue-700">
                                                {open
                                                  ? "Show less"
                                                  : "Show more"}
                                              </h1>
                                            </Disclosure.Button>
                                          </div>
                                          <div className=" flex items-center space-x-2">
                                            <Dropdown
                                              icon={PencilIcon}
                                              title="Priority"
                                              active="High"
                                              options={[
                                                { option: "Low" },
                                                { option: "Normal" },
                                                { option: "High" },
                                                { option: "Urgent" },
                                              ]}
                                            />
                                            <button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700">
                                              <DotsHorizontalIcon className="h-5 w-5" />
                                            </button>
                                          </div>
                                        </dt>
                                        <Disclosure.Panel
                                          as="dd"
                                          className="ml-8 "
                                        >
                                          <p className="pt-1 text-base text-gray-500">
                                            {subTaskItem.description}
                                          </p>
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                  <div className="flex items-center justify-between">
                                    <div className="ml-8 flex items-center space-x-3 ">
                                      <div className="flex -space-x-2 overflow-hidden">
                                        {subTaskItem.members.map((item) => {
                                          return (
                                            <img
                                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                              src={item.image}
                                              alt=""
                                            />
                                          );
                                        })}
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 ring-2 ring-white hover:bg-gray-300">
                                          <UserAddIcon className="h-5 w-5" />
                                        </span>
                                      </div>

                                      <span className="flex items-center font-medium text-gray-600">
                                        <ClockIcon className=" mr-1 h-5 w-5" />{" "}
                                        02:45:25
                                      </span>
                                    </div>

                                    <div></div>
                                  </div>
                                </div>
                              ))}
                            </dl>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}
App.Layout = DefaultLayout;
