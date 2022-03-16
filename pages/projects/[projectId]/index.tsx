import { useRouter } from "next/router";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ProjectBoard from "../../../components/ProjectBoard";
import Wrapper, { SessionContext } from "../../../components/Wrapper";
import { useProject } from "../../../lib/utils";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, PencilAltIcon } from "@heroicons/react/outline";
import {
  DotsHorizontalIcon,
  PlusIcon,
  SortAscendingIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { ClockIcon, UserAddIcon, PencilIcon } from "@heroicons/react/outline";
import Dropdown from "../../../components/Dropdown";
import { useEffect, useState } from "react";

import { Tab } from "@headlessui/react";
import TaskBoard from "../../../components/projects/TaskBoard";
import TeamCards from "../../../components/projects/TeamCards";
import Pagination from "../../../components/Pagintation";
import Issues from "../../../components/projects/Issues";
import ProjectLayout from "../../../layouts/ProjectLayout";

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

  const { projectId } = router.query;
  const { project, isLoading, error } = useProject(`?id=${projectId}`);
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
          issues: project.issues,
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
 
      
    </div>
  );
}
App.Layout = ProjectLayout;
