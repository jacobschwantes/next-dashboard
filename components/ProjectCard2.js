import { CalendarIcon, ChatIcon, LinkIcon, ChartBarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import ProjectDropdown from "./ProjectDropdown";
import ProjectModal from "./ProjectModal";
export default function ProjectCard(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectMenu, setProjectMenu] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const tasks_completed = props.project.task_counts.find(
    (item) => item.id === "completed"
  );
  const percent = tasks_completed
    ? Math.floor((tasks_completed.count / props.project.total_tasks) * 100)
    : 0;
  return (
    <div
    onClick={() => {props.setSlideOpen(true);  props.setActive(props.index)}}
      className={
        "  shadow-gray-100 dark:shadow-gray-900 rounded-2xl  select-none  space-y-3 border-2 shadow-sm mr-1     dark:border-gray-900 flex flex-col  dark:bg-gray-800  p-5 bg-white " +
        (props.active ? " outline-none  border-blue-500   " : "  border-gray-100 ")
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
            <h1 className=" font-semibold text-2xl overflow-x-hidden dark:text-gray-100">
              {props.project.name}
            </h1>
            <h1 className=" capitalize text-gray-600 dark:text-gray-300 font-medium text-lg">
              {props.project.category}
            </h1>
          </span>
        </div>
        <ProjectDropdown
          projectId={props.project._id}
          session={props.session}
          members={props.project.members}
          grid={props.grid}
          settings={setProjectModal}
          setDeleteModal={setDeleteModal}
        />
      </div>
      
      
      <div className="flex space-x-2 font-medium text-sm">
        <h1 className="flex items-center bg-gray-100 text-gray-500   rounded-full px-2 py-1   ">
          <CalendarIcon className="h-4  pr-1" />
          {new Date(props.project.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h1>
        <h1 className=" flex items-center bg-gray-100 text-gray-500   rounded-full px-2 py-1 tracking-wider    ">
          <ChatIcon className="h-4 pr-1" />
          10
        </h1>
        <h1 className=" flex items-center bg-gray-100 text-gray-500   rounded-full px-2 py-1 tracking-wider    ">
          <LinkIcon className="h-4 pr-1" />
          3
        </h1>
      </div>

      <div className="space-x-1 flex flex-wrap text-sm  ">
        {props.project.tags.map((tag, index) => {
          return (
            <span
              key={index}
              className="font-medium items-center py-0.5 flex-col my-1   justify-center  px-2 rounded-full   bg-blue-100 text-blue-700 dark:text-blue-400 dark:bg-blue-700 dark:bg-opacity-25"
            >
              {tag}
            </span>
          );
        })}
      </div>
      <div className="flex justify-between space-x-4 ">
        <div>
          <div className="flex -space-x-2 overflow-hidden">
              {props.project.members.map(item => {
                  return (
                    <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src={item.image}
                    alt=""
                  />
                  )
              })}
            
          </div>
        </div>
        <div className="flex flex-col flex-1  space-y-1 text-sm  dark:text-gray-100 ">
          <div className="flex justify-between font-medium ">
            <span>{34}% Completed</span>
            <span className="  ">
              {15 -
                (tasks_completed ? tasks_completed.count : 0)}{" "}
              tasks left
            </span>
          </div>
          <div className="flex flex-col relative">
            <span
              className="h-1 rounded-lg bg-blue-500 dark:bg-blue-700  absolute transition-all"
              style={{ width: `34%` }}
            ></span>
            <span className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-lg "></span>
          </div>
        </div>
      </div>
    </div>
  );
}
