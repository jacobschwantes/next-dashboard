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
            priority: 2,
            members: [],
            description:
              "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          },
          {
            task: "get approval for base endpoints",
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
  const { pid } = router.query;
  console.log(pid);
  const { project, isLoading, error } = useProject(`?id=${pid}`);

  return (
    <div className="space-y-5 overflow-auto px-4 py-4   xl:px-10 ">
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
      <dl className="mt-6  w-1/2">
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
                          <span className="mt-2 h-5 w-5 rounded-full border-2 border-gray-400  p-2 "></span>
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
                                    active='High'
                                    options={[ {option: "Low"}, {option: "Normal"},{ option: "High" }, {option: "Urgent"}]}
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
                                            <span className="mt-1 h-5 w-5 rounded-full border-2 border-gray-400  p-2 "></span>

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
                                    active='High'
                                    options={[ {option: "Low"}, {option: "Normal"}, { option: "High" },{option: "Urgent"}]}
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
