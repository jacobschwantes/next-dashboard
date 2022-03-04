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
import { useEffect, useState } from "react";

import { Tab } from "@headlessui/react";
import TaskBoard from "../../components/projects/TaskBoard";
import TeamCards from "../../components/projects/TeamCards";
import Pagination from "../../components/Pagintation";
import Issues from "../../components/projects/Issues";

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

export default function App() {
  const router = useRouter();

  const { pid } = router.query;
  console.log(pid);
  const { project, isLoading, error } = useProject(`?id=${pid}`);
  let [categories, setCategories] = useState({});

  useEffect(() => {
    project ? 
    setCategories({
      Tasks: {
        data: {
          tasks: sampleTasks,
        },
        component: TaskBoard,
      },
      Insights: {
        data: {
          tasks: sampleTasks,
        },
        component: TaskBoard,
      },
      Team: {
        data: {
          team: project.members,
        },
        component: TeamCards,
      },
      Discussion: {
        data: {
          tasks: sampleTasks,
        },
        component: TaskBoard,
      },
      Issues: {
        data: {
          tasks: sampleTasks,
        },
        component: Issues,
      },

      Settings: {
        data: {
          tasks: sampleTasks,
        },
        component: TaskBoard,
      },
      Log: {
        data: {
          tasks: sampleTasks,
        },
        component: TaskBoard,
      },
    }) : null;
  }, [project]);

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
      <div className="w-2/3 px-2  sm:px-0">
        {isLoading ? (
          "loading "
        ) : (
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-600"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((item, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    "rounded-xl bg-white p-3",
                    ""
                  )}
                >
                  <item.component data={item.data} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        )}
      </div>
    </div>
  );
}
App.Layout = DefaultLayout;
