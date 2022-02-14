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
      className={
        "  shadow-gray-100 rounded-lg shadow-lg border-gray-100 border flex bg-white relative animate-fade-in-up   " +
        (props.grid ? " flex-col aspect-square" : " h-48 flex-row")
      }
    >
      <ProjectModal
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
      <div className=" flex justify-between items-center absolute left-0 right-0 p-4  ">
        <h1 className="text-xs text-white  ">
          {new Date(props.project.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h1>
        <ProjectDropdown
        session={props.session}
        members={props.project.members}
        grid={props.grid}
          settings={setProjectModal}
          setDeleteModal={setDeleteModal}
        />
      </div>
      {props.project.image ? (
        <img
          className={
            " object-cover" +
            (props.grid ? " rounded-t-lg h-1/2" : " rounded-l-lg w-1/4")
          }
          src={props.project.image}
        />
      ) : (
        <a
        href={'/projects/'+ props.project._id}
          className={
            props.project.theme.bgColor + " cursor-pointer " +
            (props.grid ? " rounded-t-lg h-1/2" : " rounded-l-lg w-1/4 ")
          }
        ></a>
      )}
      <a
        href={props.project.url}
        className={
          "p-4 flex flex-col   justify-between" +
          (props.grid ? " h-1/2 " : " w-3/4")
        }
      >
        <div className="flex flex-col ">
          <span className=" ">
            <h1 className="font-semibold text-2xl overflow-x-hidden ">
              {props.project.name}
            </h1>
            <h1 className="font-medium capitalize text-gray-600 text-lg  ">
              {props.project.category}
            </h1>
          </span>

          <div className="space-x-1 flex flex-wrap ">
            {props.project.tags.map((tag, index) => {
              return (
                <span key={index} className=" items-center py-0.5 flex-col my-1   justify-center  px-2 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-full space-y-1 text-sm font-medium ">
          <div className="flex justify-between">
            <span>{percent}% Completed</span>
            <span className="  ">
              {props.project.total_tasks -
                (tasks_completed ? tasks_completed.count : 0)}{" "}
              tasks left
            </span>
          </div>
          <div className="flex flex-col relative">
            <span
              className="h-1 rounded-lg bg-blue-500 absolute transition-all"
              style={{ width: `${percent}%` }}
            ></span>
            <span className="w-full h-1 bg-gray-200 rounded-lg "></span>
          </div>
        </div>
      </a>
    </div>
  );
}
