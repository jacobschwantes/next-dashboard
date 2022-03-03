import {
  BookOpenIcon,
  ChartBarIcon,
  DotsHorizontalIcon,
  ExternalLinkIcon,
  PlusIcon,
  ViewGridIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import DefaultLayout from "../layouts/DefaultLayout";
import CircleProgress from "../components/CircleProgress";
import Input from "../components/Input";
import Wrapper, { SessionContext } from "../components/Wrapper";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import ProjectModal from "../components/ProjectModal";
import ProjectDropdown from "../components/ProjectDropdown";
import DeleteModal from "../components/DeleteModal";
import ProjectCard from "../components/ProjectCard2";
import { useProjects } from "../lib/utils";
import useSWR, { useSWRConfig } from "swr";
import ProjectLoadingState from "../components/ProjectLoadingState";
import TaskTable from "../components/TaskTable";
import { Fragment } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
async function getLoadingStates() {
  return ["1", "2", "3", "4", "5", "6"];
}
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        let text = await res.text();
        throw new Error(text);
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
  return response; // parses JSON response into native JavaScript objects
}
const filterOptions = [
  { option: "active", id: "active" },
  { option: "in-progress", id: "in-progress" },
  { option: "completed", id: "completed" },
  { option: "all", id: null },
];

export default function App() {
  const { data: session, status } = useSession();
  const [slideOpen, setSlideOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { projects, isLoading, error } = useProjects();
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState(null);
  const [grid, setGrid] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  let searchProjects =
    isLoading || error
      ? null
      : projects.filter((item) => {
          let lowercase = item.name.toLowerCase();
          return lowercase.includes(search);
        });
  let filteredProjects =
    isLoading || error
      ? null
      : searchProjects.filter((item) => item.status === filter);
  return (
    <div className=" flex  space-x-3 px-4 py-4 ">
      <ProjectModal
        setActive={setActive}
        verb="Create"
        heading="Create Project"
        open={open}
        setOpen={setOpen}
        session={session}
        update={() => mutate("/api/projects/getprojects")}
        project={{
          name: "",
          category: "",
          description: "",
          tags: [],
          members: [
            {
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
              access: "owner",
            },
          ],
          theme: {
            name: "Blue",
            bgColor: "bg-blue-500",
            selectedColor: "ring-blue-500",
          },
          privacy: {
            id: "team",
            name: "Private to Project Members",
            description: "Only members of this project would be able to access",
          },
        }}
      />
      <div className=" h-partial 3xl:w-1/4 flex w-full flex-col space-y-2 overflow-hidden rounded-2xl border border-gray-100   bg-white p-6 shadow-lg shadow-gray-100 dark:bg-gray-900 lg:w-1/3 ">
        <div className=" flex items-center justify-between  space-x-2 ">
          <Input
            setInput={setSearch}
            value={search}
            type="search"
            name="search"
            id="search"
            placeholder="Search"
          />
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="flex  items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="mr-1 h-4" />
            Create Project
          </button>
        </div>

        <div className=" scrollbar black flex-1 scrollbarY   space-y-3 overflow-auto ">
          {isLoading
            ? ["1", "2", "3", "4", "5", "6"].map((item) => {
                return <ProjectLoadingState index={item} grid={grid} />;
              })
            : (search && !filter
                ? searchProjects
                : filter
                ? filteredProjects
                : projects
              ).map((item, index) => {
                return (
                  <ProjectCard
                    index={index}
                    setActive={setActive}
                    setSlideOpen={setSlideOpen}
                    active={index === active}
                    update={() => mutate("/api/projects/getprojects")}
                    delete={async () => {
                      setActive(0);
                      await postData("/api/projects/deleteproject", item).then(
                        () => mutate("/api/projects/getprojects")
                      );
                    }}
                    session={session}
                    grid={grid}
                    project={item}
                  />
                );
              })}
        </div>
      </div>

      {projects && projects.length > 0 ? (
        <Transition.Root show={slideOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden lg:hidden"
            onClose={setSlideOpen}
          >
            <div className="absolute inset-0 overflow-hidden ">
              <Dialog.Overlay className="absolute inset-0" />

              <div className="fixed inset-y-0 right-0  flex max-w-full ">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-2xl">
                    <div className="relative flex h-full  flex-col bg-white ">
                      <div className="absolute top-4 left-0 right-0 z-20 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className=" rounded-md bg-gray-50 text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              onClick={() => {
                                setSlideOpen(false);
                                setActive(0);
                              }}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>{" "}
                          <Dialog.Title className="text-lg font-medium text-gray-500"></Dialog.Title>
                        </div>
                      </div>
                      <div className=" relative flex-1 ">
                        {/* Replace with your content */}

                        <div className="       ">
                          {isLoading || error ? null : (
                            <div className="flex flex-col overflow-hidden    bg-white dark:border-gray-800 dark:bg-gray-900 lg:pb-14  ">
                              <div className="flex items-center justify-between bg-blue-200 p-10 ">
                                <div className="flex items-center space-x-6">
                                  <div
                                    className={
                                      " flex h-16  w-16 items-center justify-center rounded-full bg-blue-600 " +
                                        searchProjects.length >
                                      0
                                        ? searchProjects[active].theme.bgColor
                                        : ""
                                    }
                                  >
                                    <ChartBarIcon className="h-8 text-white" />
                                  </div>
                                  <span className="">
                                    <h1 className="text-3xl font-semibold  dark:text-gray-100">
                                      {searchProjects.length > 0
                                        ? searchProjects[active].name
                                        : null}
                                    </h1>
                                    <h1 className="text-2xl font-medium capitalize text-gray-600 dark:text-gray-300">
                                      {searchProjects.length > 0
                                        ? searchProjects[active].category
                                        : null}
                                    </h1>
                                  </span>
                                </div>
                                <button className=" flex items-center rounded-full bg-gray-700 px-3  py-1 text-lg font-medium text-gray-50 ">
                                  View <ExternalLinkIcon className="ml-1 h-5" />
                                </button>
                              </div>
                              <div className=" space-y-6 px-4 py-6  ">
                                <h1 className="text-2xl font-semibold ">
                                  Project Overview
                                </h1>
                                <p className="text-gray-500">
                                  {searchProjects.length > 0
                                    ? searchProjects[active].description
                                    : null}
                                </p>
                                <h1 className="text-2xl font-semibold ">
                                  Objective List
                                </h1>
                              </div>
                              <div className=" flex-1 overflow-auto px-4">
                                {searchProjects.length > 0 ? (
                                  <TaskTable project={searchProjects[active]} />
                                ) : null}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* /End replace */}
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}

      <div className=" lg:w-2/3  2xl:w-3/4     ">
        {isLoading || error || searchProjects.length === 0 ? null : (
          <div className="h-partial    hidden flex-col overflow-hidden rounded-2xl border border-l border-gray-100 bg-white pb-14 shadow-lg shadow-gray-100 lg:flex ">
            <div
              className={
                "flex items-center justify-between p-10 " +
                (searchProjects.length > 0
                  ? searchProjects[active].theme.bgColor
                  : null)
              }
            >
              <div className="flex items-center space-x-6">
                <span className="">
                  <h1 className="text-3xl font-semibold text-white  ">
                    {searchProjects.length > 0
                      ? searchProjects[active].name
                      : null}
                  </h1>
                  <h1 className="text-2xl font-medium capitalize text-white dark:text-gray-300">
                    {searchProjects.length > 0
                      ? searchProjects[active].category
                      : null}
                  </h1>
                </span>
              </div>
              <a
                href={
                  searchProjects.length > 0
                    ? `/projects/${searchProjects[active]._id}`
                    : null
                }
                className=" flex items-center rounded-full bg-gray-50 px-4 py-1   text-lg font-medium hover:bg-gray-200 "
              >
                View <ExternalLinkIcon className="ml-1 h-5" />
              </a>
            </div>
            <div className="scrollbar scrollbarY black overflow-auto">
              <div className="space-y-6 px-10 py-6   ">
                <h1 className="text-2xl font-semibold ">Project Overview</h1>
                <p className="text-gray-500">
                  {searchProjects.length > 0
                    ? searchProjects[active].description
                    : null}
                </p>
                <Disclosure defaultOpen as="div" className=" ">
                  {({ open }) => (
                    <>
                      <dt className="flex w-full items-center justify-between text-lg ">
                        <div className="flex items-center space-x-3">

                          <h1 className="text-2xl font-semibold ">
                            Objective List
                          </h1>

                          <Disclosure.Button>
                            <h1 className=" text-base font-medium text-blue-700">
                              {open ? "Hide" : "Show"}
                            </h1>
                          </Disclosure.Button>
                        </div>

                  
                      </dt>
                      
     
                      <Disclosure.Panel as="dd" className="">
                        <p className="pt-1 text-base text-gray-500">
                            {searchProjects.length > 0 ? (
                              <TaskTable project={searchProjects[active]} />
                            ) : null}
                         
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

App.Layout = DefaultLayout;
