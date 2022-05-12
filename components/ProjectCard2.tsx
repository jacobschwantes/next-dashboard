import {
  CalendarIcon,
  ChatIcon,
  LinkIcon,
  ChartBarIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { Task } from "../types/projects";
import DeleteModal from "./DeleteModal";
import ProjectDropdown from "./ProjectDropdown";
import ProjectModal from "./ProjectModal";
export default function ProjectCard(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectMenu, setProjectMenu] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const tasksCompleted = props.project.tasks.filter(
    (task: Task) => task.completed
  );
  const percent = tasksCompleted
    ? Math.floor((tasksCompleted.length / props.project.tasks.length) * 100)
    : 0;
  return (
    <div
      onClick={() => {
        props.setSlideOpen(true);
        props.setActive(props.index);
      }}
      className={
        "  mr-1 flex select-none  flex-col  space-y-3 rounded-2xl border-2 bg-white     p-5 shadow-sm shadow-gray-100  dark:border-gray-900  dark:bg-gray-800 dark:shadow-gray-900 " +
        (props.active
          ? " border-blue-500  outline-none   "
          : "  border-gray-100 ")
      }
    >
      <ProjectModal
        setActive={props.setActive}
        open={projectModal}
        setOpen={setProjectModal}
        heading="Edit Project"
        verb="Update"
        update={props.update}
        project={props.project}
        session={props.session}
      />
      <DeleteModal
        title="Delete Project"
        body={`Are you sure you want to delete this project? ${props.project.name} and its data will be permanently removed
        from our servers forever. This action cannot be undone.`}
        verb="Delete"
        delete={props.delete}
        setOpen={setDeleteModal}
        open={deleteModal}
      />

      <div className="flex justify-between">
        <div className="flex items-center space-x-3 ">
          <span>
            <h1 className=" overflow-x-hidden text-2xl font-semibold dark:text-gray-100">
              {props.project.name}
            </h1>
            <h1 className=" text-lg font-medium capitalize text-gray-600 dark:text-gray-300">
              {props.project.category}
            </h1>
          </span>
        </div>
        <ProjectDropdown
          projectId={props.project._id}
          session={props.session}
          team={props.project.team}
          grid={props.grid}
          settings={setProjectModal}
          setDeleteModal={setDeleteModal}
        />
      </div>

      <div className="flex space-x-2 text-sm font-medium">
        <h1 className="flex items-center rounded-full bg-gray-100   px-2 py-1 text-gray-500   ">
          <CalendarIcon className="h-4  pr-1" />
          {new Date(props.project.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h1>
        <h1 className=" flex items-center rounded-full bg-gray-100   px-2 py-1 tracking-wider text-gray-500    ">
          <ChatIcon className="h-4 pr-1" />
          10
        </h1>
        <h1 className=" flex items-center rounded-full bg-gray-100   px-2 py-1 tracking-wider text-gray-500    ">
          <LinkIcon className="h-4 pr-1" />3
        </h1>
      </div>

      <div className="flex flex-wrap space-x-1 text-sm  ">
        {props.project.tags.map((tag, index) => {
          return (
            <span
              key={index}
              className="my-1 flex-col items-center justify-center rounded-full   bg-blue-100  py-0.5 px-2   font-medium text-blue-700 dark:bg-blue-700 dark:bg-opacity-25 dark:text-blue-400"
            >
              {tag}
            </span>
          );
        })}
      </div>
      <div className="flex justify-between space-x-4 ">
        <div>
          <div className="flex -space-x-2 overflow-hidden">
            {props.project.team.map((item) => {
              return (
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={item.image}
                  alt=""
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-1 flex-col  space-y-1 text-sm  dark:text-gray-100 ">
          <div className="flex justify-between font-medium ">
            <span>{34}% Completed</span>
            <span className="  ">
              {15 - (tasksCompleted ? tasksCompleted.length : 0)} tasks left
            </span>
          </div>
          <div className="relative flex flex-col">
            <span
              className="absolute h-1 rounded-lg bg-blue-500  transition-all dark:bg-blue-700"
              style={{ width: `34%` }}
            ></span>
            <span className="h-1 w-full rounded-lg bg-gray-200 dark:bg-gray-600 "></span>
          </div>
        </div>
      </div>
    </div>
  );
}
