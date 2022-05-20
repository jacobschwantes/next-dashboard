import {
  PlusIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import DefaultLayout from "../../layouts/DefaultLayout";
import Input from "../../components/Input";
import { useState } from "react";
import ProjectModal from "../../components/ProjectModal";
import { useProjects } from "../../lib/utils";
import { useSWRConfig } from "swr";
import ProjectCards from "../../components/projects/ProjectCards";
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
  const { projects, isLoading, isError } = useProjects();
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState(null);
  const [grid, setGrid] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectMenu, setProjectMenu] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  let searchProjects =
    isLoading || isError
      ? []
      : projects.filter((item) => {
          let lowercase = item.name.toLowerCase();
          return lowercase.includes(search);
        });
  let filteredProjects =
    isLoading || isError
      ? []
      : searchProjects.filter((item) => item.status === filter);
  return (
    <div className="space-y-3 px-2 py-4 md:space-x-3 md:px-10 h-partial overflow-auto ">
      <div className=" flex  flex-col  justify-center space-y-2 md:flex-row md:items-center  md:space-x-2 md:space-y-0  ">
        <Input
          expand={true}
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
          className="flex  items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="mr-1 h-4" />
          Create Project
        </button>
      </div>
      <div className="">
        {!isLoading || !isError ? <ProjectCards  session={session} projects={searchProjects} /> : null}
      </div>
      <div className="  ">
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
              description:
                "Only members of this project would be able to access",
            },
          }}
        />

      </div>
    </div>
  );
}

App.Layout = DefaultLayout;
