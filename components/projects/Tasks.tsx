import { useEffect, useState } from "react";
import Pagination from "../Pagintation";
import Input from "../Input";
import TaskModal from "./TaskModal";
import { PlusIcon } from "@heroicons/react/solid";
import { useSWRConfig } from "swr";
import Link from "next/link";
import { Event, Task } from "../../types/projects";
import { formatDate } from "../../lib/utils";
import { useTasks } from "../../lib/utils";


export default function Tasks(props) {
  const { mutate } = useSWRConfig();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const batchSize = 5; // items per chunk
  const [active, setActive] = useState(1);
  const [data, setData] = useState(props.data ? props.data : []);
  let searchedTasks = data.filter((item) => {
    let lowercase = item.name.toLowerCase();
    return lowercase.includes(search.toLocaleLowerCase());
  });
  return (
    <div>
      <TaskModal
        projectId={props.projectId}
        setActive={setActive}
        verb="Create"
        heading="Create Task"
        open={open}
        setOpen={setOpen}
        update={(task) => setData([task, ...data])}
      />
      <div className=" flex sm:items-center space-y-1 sm:flex-row flex-col justify-between w-full ">
        <Input
          expand={false}
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
          className="flex justify-center sm:justify-start  items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="mr-1 h-4" />
          New Task
        </button>
      </div>

      <div className=" my-2 flex flex-col space-y-2">
        {searchedTasks.map((item, index) => {
          if (
            index >= batchSize * (active - 1) &&
            index <= batchSize * active - 1
          ) {
            const completedSubtasks = item.subtasks.filter(item => item.completed)
            return (
              <Link key={item.name} href={`../${props.projectId}/tasks/${item._id}`}>
                <a className="flex w-full  overflow-hidden rounded-lg bg-gray-50">
                  <span
                    className={
                      "mr-3  w-1 " +
                      (item.completed ? "bg-red-500" : "bg-green-500")
                    }
                  ></span>
                  <div className="p-4 pl-0 flex justify-between w-full items-center">
                    <div>
                    <h1 className=" text-xl">{item.name}</h1>
                    <p className=" text-sm">
                      {item.completed ? "completed " : "created "}
                      {item.completed
                        ? formatDate(item.completed.timestamp / 1000)
                        : formatDate(item.created_at / 1000)}
                      {" "}by{" "}
                      {item.completed || item.team.length === 0 ? "user123" : item.team[0].name}
                    </p></div>
                    <p className="font-medium">{completedSubtasks.length}/{item.subtasks.length}</p>
                  </div>
                </a>
              </Link>
            );
          }
        })}
      </div>

      <Pagination
        pages={Math.ceil(searchedTasks.length / batchSize)}
        setActive={setActive}
        active={active}
        size={searchedTasks.length}
        batchSize={5}
      />
    </div>
  );
}
