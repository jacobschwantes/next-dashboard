import { DotsVerticalIcon, ExternalLinkIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import Dropdown from "../Dropdown";
import ProjectModal from "../ProjectModal";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ProjectCard3(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectMenu, setProjectMenu] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const handleAction = (action) => {
    switch (action) {
      case "edit":
        setProjectModal(true);
        break;
      default:
        break;
    }
  };
  return (
    <div as="div" className="flex flex-col  ">

        <>
          <ProjectModal
            open={projectModal}
            setOpen={setProjectModal}
            heading="Edit Project"
            verb="Update"
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
          <div className="col-span-1 flex items-center rounded-md rounded-r-md border-t border-r border-b border-gray-200 bg-white shadow-sm">
            <div
              className={classNames(
                props.project.theme.bgColor,
                "flex h-full w-2 items-center justify-center rounded-l-md text-sm font-medium text-white"
              )}
            ></div>
            <Link href={`/projects/${props.project._id}`}>

            <div className="flex-1 cursor-pointer">
              <div className="flex flex-1 items-center justify-between  truncate">
                <div className="flex flex-1 flex-col items-start truncate px-3 py-2 text-sm">
                  <a
                    href={props.project.href}
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    {props.project.name}
                  </a>
                  <p className="block text-gray-500 ">
                    {props.project.category}
                  </p>
                  <p className="block text-gray-500 sm:hidden">
                    {props.project.team.length} Members
                  </p>
                  <div className="hidden flex-wrap space-x-1 md:flex ">
                    {props.project.tags.map((tag, index) => {
                      return (
                        <span
                          key={index}
                          className=" my-1 flex-col items-center justify-center   rounded-md  bg-blue-100 py-0.5 px-1.5 text-xs font-medium text-blue-700 dark:bg-blue-700 dark:bg-opacity-25 dark:text-blue-400"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  <div className=" hidden -space-x-2 overflow-hidden sm:flex">
                    {props.project.team.map((item) => {
                      return (
                        <img
                          className=" inline-block w-6 rounded-full ring-2 ring-white"
                          src={item.image}
                          alt=""
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              </div>
            </Link>

            <div className="flex h-full flex-shrink-0 flex-col items-center justify-between py-2 pr-2">
              <Dropdown
                orientation="vertical"
                shortButton={true}
                active="High"
                update={(action) => {
                  handleAction(action);
                }}
                options={[
                    { option: "View", id: "view", href: `/projects/${props.project._id}`, icon: ExternalLinkIcon },
                  { option: "Edit", id: "edit", icon: PencilIcon },
                  { option: "Delete", id: "delete", icon: TrashIcon },
                ]}
              />
              <div className="">
                <h1 className="text-sm font-medium text-gray-900 hover:text-gray-600">
                  3/4
                </h1>
              </div>
            </div>
          </div>
          
        </>
      
    </div>
  );
}
