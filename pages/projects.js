import {
  DotsHorizontalIcon,
  ViewGridIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import CircleProgress from "../components/CircleProgress";
import Input from "../components/Input";
import Wrapper, { SessionContext } from "../components/Wrapper";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import ProjectModal from "../components/ProjectModal";
import ProjectDropdown from "../components/ProjectDropdown";
import DeleteModal from "../components/DeleteModal";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../lib/utils";
import useSWR, { useSWRConfig } from "swr";
import ProjectLoadingState from "../components/ProjectLoadingState";

async function getLoadingStates() {
  return ['1', '2', '3', '4', '5', '6'] 
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
      console.log(e.message)
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
  const { mutate } = useSWRConfig();
  const { projects, isLoading, error } = useProjects();
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
    <Wrapper title="Projects" active="projects">
      <SessionContext.Consumer>
        {(session) => (
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 min-h-screen relative pb-10 ">
            <ProjectModal
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
            <div className="     2xl:col-span-4 xl:col-span-3 bg-white  ">
              <div className=" flex  flex-col sm:flex-row sm:justify-between  py-4 2xl:px-8 xl:px-3 px-3 space-y-2 ">
                <div className="flex items-center space-x-4 justify-between sm:justify-start ">
                  <Dropdown
                    title="Filter by"
                    options={filterOptions}
                    update={setFilter}
                  />
                  <span className=" space-x-2 flex items-center">
                    <button onClick={() => setGrid(true)}>
                      <ViewGridIcon
                        className={
                          "h-6 hover:scale-105 transition-all hover:text-blue-500" +
                          (grid ? " text-blue-500" : " text-gray-500")
                        }
                      />
                    </button>
                    <button onClick={() => setGrid(false)}>
                      <ViewListIcon
                        className={
                          "h-6 hover:scale-105 transition-all hover:text-blue-500" +
                          (!grid ? " text-blue-500" : " text-gray-500")
                        }
                      />
                    </button>
                  </span>
                </div>
                <div className="  sm:flex block w-full sm:w-auto space-y-2 sm:space-y-0 items-center sm:space-x-3">
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
                    className="  w-full sm:w-auto items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Project
                  </button>
                </div>
              </div>

              <div
                className={
                  " sm:px-3 px-2 2xl:px-8 xl:px-3" +
                  (grid
                    ? " grid 2xl:grid-cols-4 xl:grid-cols-3  grid-cols-1 2xl:gap-8 lg:gap-5 gap-5"
                    : " flex flex-col space-y-5")
                }
              >
                {isLoading
                  ? ['1', '2', '3', '4', '5', '6'].map((item) => {
                    return (
                      <ProjectLoadingState index={item} grid={grid}/>
                    )
                  })
                  : (search && !filter
                      ? searchProjects
                      : filter
                      ? filteredProjects
                      : projects
                    ).map((item) => {
                      return (
                        <ProjectCard
                        update={() => mutate('/api/projects/getprojects')}
                        delete={async () => await postData('/api/projects/deleteproject', item).then(() =>mutate('/api/projects/getprojects'))}
                          session={session}
                          grid={grid}
                          project={item}
                        />
                      );
                    })}
              </div>
            </div>
            <div className=" col-span-1 px-6 py-4 bg-white border-l">
              <h1 className="text-2xl font-semibold">Progress</h1>
              <CircleProgress />
              <div className="flex justify-between">
                <h1>Active</h1>
                <h1>In-Progress</h1>
                <h1>Completed</h1>
              </div>
            </div>
          </div>
        )}
      </SessionContext.Consumer>
    </Wrapper>
  );
}
