import { Disclosure } from "@headlessui/react";
import { ChatIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, SortAscendingIcon } from "@heroicons/react/solid";
import {
  ClockIcon,
  UserAddIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import Dropdown from "../../components/Dropdown";
import ActivityFeed from "../ActivityFeed";
import TaskModal from "./TaskModal";
import { useState } from "react";
import TaskTable from "../TaskTable";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
async function postData(url = "", method, data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(async (res) => {
      if (res.ok) {
        return res;
      } else {
        let text = await res.text();
        throw new Error(text);
      }
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
    });
  return response; // parses JSON response into native JavaScript objects
}

const PriorityTag = (props) => {
  switch (props.priority) {
    case 0:
      return (
        <span className="rounded-md bg-green-100 px-2 py-0.5 text-sm font-medium text-green-600">
          Low priority
        </span>
      );
    case 1:
      return "";
    case 2:
      return (
        <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-sm font-medium text-yellow-600">
          High priority
        </span>
      );
    case 3:
      return (
        <span className="rounded-md bg-red-100 px-2 py-0.5 text-sm font-medium text-red-600">
          Urgent
        </span>
      );
    default:
      return "";
  }
};
export default function TaskBoard(props) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(props.data);
  const [modalTab, setModalTab] = useState("general");

  const updateTask = (data, action) => {
    const index = task.subtasks.findIndex((item) => item._id === data._id);
    console.log(index);
    const newState = [...task.subtasks];
    console.log(newState);
    newState[index] = data;
    console.log({ ...task, subtasks: newState });
    setTask({ ...task, subtasks: newState });
    putTask(data._id, data, action);
  };
  const deleteTask = async (taskId) => {
    await postData(
      `/api/projects/${props.projectId}/tasks/${props.taskId}`,
      "DELETE",
      { taskId }
    )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  const putTask = async (taskId, data, event) => {
    await postData(
      `/api/projects/${props.projectId}/tasks/${taskId}?action=${event}`,
      "PUT",
      {
        task: data,
      }
    )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  const handleAction = (action, id) => {
    switch (action) {
      case "delete":
        deleteTask(id);
        break;
      default:
        break;
    }
  };
  return (
    <div className="mt-6  ">
      <TaskModal
         setActiveTab={setModalTab}
        activeTab={modalTab}
        taskId={props.taskId}
        isSubtask={true}
        projectId={props.projectId}
        verb="Create"
        heading="Create Task"
        open={open}
        setOpen={setOpen}
      />
      <div className="flex lg:space-x-3   ">
        <div className="flex-1">
          <div className="mb-3">
            <div className=" flex items-center justify-between   ">
              <p className="text-xl font-medium ">{task.name}</p>
              <div className=" flex items-center space-x-2">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="flex items-center justify-center  rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:justify-start"
                >
                  <PlusIcon className="mr-1 h-4" />
                  New Task
                </button>
                <div className="hidden lg:block">
                  <Dropdown
                    icon={PencilIcon}
                    title="Priority"
                    active="High"
                    options={[
                      { option: "Low" },
                      { option: "Normal" },
                      { option: "High" },
                      { option: "Urgent" },
                    ]}
                  />
                </div>
                <Dropdown
                  orientation="horizontal"
                  shortButton={true}
                  active="High"
                  options={[{ option: "Edit" }, { option: "Delete" }]}
                />
              </div>
            </div>
            <span>
              <p className="text-base text-gray-500">{task.description}</p>
            </span>
          </div>
          <h1 className="text-lg font-medium">Sub-Tasks</h1>

          <dl className="mt-2 space-y-2  ">
            {task.subtasks.map((subTaskItem) => (
              <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg shadow-gray-100 last:border-white lg:p-5">
                <Disclosure as="div" key={subTaskItem.name} className=" ">
                  {({ open }) => (
                    < >
                      <dt className="flex w-full items-start space-x-2 text-lg   lg:items-center ">
                        <input
                          onInput={() => {
                            const newState = { ...subTaskItem };
                            newState.completed = true;
                            updateTask(newState, "taskComplete");
                            console.log(task);
                          }}
                          id="candidates"
                          checked={subTaskItem.completed}
                          aria-describedby="candidates-description"
                          name="candidates"
                          type="checkbox"
                          className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full border-gray-300  text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex flex-1 flex-col items-start space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
                          <span className="font-medium capitalize text-gray-600 ">
                            {subTaskItem.name}
                          </span>
                          <PriorityTag priority={subTaskItem.priority} />

                          <Disclosure.Button>
                            <h1 className="text-sm font-medium text-blue-700">
                              {open ? "Show less" : "Show more"}
                            </h1>
                          </Disclosure.Button>
                        </div>
                        <div className=" flex flex-shrink-0 items-center space-x-2">
                          <div className="hidden lg:block">
                            <Dropdown
                              icon={PencilIcon}
                              title="Priority"
                              active="High"
                              options={[
                                { option: "Low" },
                                { option: "Normal" },
                                { option: "High" },
                                { option: "Urgent" },
                              ]}
                            />
                          </div>
                          <Dropdown
                            orientation="horizontal"
                            shortButton={true}
                            active="High"
                            update={(action) => {
                              handleAction(action, subTaskItem._id);
                            }}
                            options={[
                              { option: "Edit", id: "edit" },
                              { option: "Delete", id: "delete" },
                            ]}
                          />
                        </div>
                      </dt>
                      <p className="ml-8 pt-1 text-base text-gray-500">
                        {subTaskItem.description}
                      </p>
                      <Disclosure.Panel
                        as="dd"
                        className="my-4 ml-8 space-y-3 "
                      >
                        <ActivityFeed activity={subTaskItem.activity} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <div className="flex items-center justify-between">
                  <div className="ml-8 flex items-center space-x-3 ">
                    
                    <div className="flex -space-x-2 overflow-hidden">
                      {subTaskItem.team
                        ? subTaskItem.team.map((item, idx) => {
                            return (
                              <img
                                key={idx}
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                src={item.image}
                                alt=""
                              />
                            );
                          })
                        : null}
                      <button
                        onClick={() => {
                          setModalTab("team");
                          setOpen(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 ring-2 ring-white hover:bg-gray-300"
                      >
                        <UserAddIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
