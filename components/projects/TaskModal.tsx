import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RadioGroup } from "@headlessui/react";
import {
  PlusIcon,
  AdjustmentsIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import { Task } from "../../types/projects";
import Alert from "../Alert";
const tabs = [
  { name: "General", id: "general", icon: AdjustmentsIcon },
  { name: "Team", id: "team", icon: UserGroupIcon },
];
const priorityOptions = [
  {
    name: "Low",
    value: 0,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    ringColor: "ring-green-600",
  },
  {
    name: "Normal",
    value: 1,
    bgColor: "bg-gray-100",
    textColor: "text-gray-600",
    ringColor: "ring-gray-600",
  },
  {
    name: "High",
    value: 2,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600",
    ringColor: "ring-yellow-600",
  },
  {
    name: "Urgent",
    value: 3,
    bgColor: "bg-red-100",
    textColor: "text-red-600",
    ringColor: "ring-red-600",
  },
];

export default function TaskModal(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
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
          return res;
        } else {
          let text = await res.text();
          throw new Error(text);
        }
      })
      .catch((e) => {
        setCreateError(e.message);
        setLoading(false);
      });
    return response; // parses JSON response into native JavaScript objects
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [name, setName] = useState("");
  const [createError, setCreateError] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(priorityOptions[1]);
  const [teamMemberSearch, setTeamMemberSearch] = useState("");
  const [team, setTeam] = useState([]);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setName("");
        setCategory("");
        setDescription("");
        setPriority(priorityOptions[1]);
        setTeam([]);
        setTeamMemberSearch("");
        setAlert("");
        setError("");
      }, 500);
    }
  }, [props.open]);

  async function createTask() {
    setLoading(true);
    let task: Task = {
      projectId: props.projectId,
      name,
      team,
      description,
      priority: priority.value,
      subtasks: [],
      category,
      created_at: Date.now(),
      last_edit: Date.now(),
      activity: [],
      completed: false,
    };
    await postData(`/api/projects/${props.projectId}/tasks`, {
      task,
    }).then((res) => {
      if (res) {
        setLoading(false);
      }
    });
  }

  async function createSubTask() {
    setLoading(true);
    let task: Task = {
      projectId: props.projectId,
      name,
      team,
      description,
      priority: priority.value,
      category,
      created_at: Date.now(),
      last_edit: Date.now(),
      activity: [],
      completed: false,
    };
    console.log(props.taskId);
    await postData(`/api/projects/${props.projectId}/tasks/${props.taskId}`, {
      task,
    }).then((res) => {
      if (res) {
        setLoading(false);
      }
    });
  }
  function removeMember(email: string) {
    let newState = [...team].filter((item) => item.email !== email);
    console.log(newState);
    setTeam(newState);
  }
  async function addMember(email: string) {
    if (team.find((member) => member.email === email)) {
      setAlert("");
      setError("User is already a member");
      return;
    }
    await fetch(`/api/users/${email}`)
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          let text = await res.text();
          throw new Error(text);
        }
      })
      .then((data) => {
        let member = data;
        member.access = "read/write";
        let newState = [...team, member];
        setTeam(newState);
        setError("");
        setAlert("Member successfully added.");
      })
      .catch((error) => {
        setError(error.message);
        setAlert("");
      });
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 " onClose={props.setOpen}>
        <div className=" block items-end  justify-center px-2  pt-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className=" inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-xl transform rounded-lg bg-white p-6  px-4 pt-5 pb-4 text-left align-middle shadow-xl transition-all">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.setOpen(false);
                  props.isSubtask ? createSubTask() : createTask();
                  console.log("submitted");
                }}
              >
                <div>
                  <h1 className="text-xl font-medium leading-6 text-gray-900">
                    {props.heading}
                  </h1>
                  <div>
                    <div className="block overflow-x-auto">
                      <div className="border-b border-gray-200">
                        <nav
                          className="-mb-px flex space-x-8"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab) => (
                            <a
                              key={tab.name}
                              onClick={() => props.setActiveTab(tab.id)}
                              className={classNames(
                                props.activeTab === tab.id
                                  ? "border-blue-500 text-blue-600"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "group inline-flex cursor-pointer select-none items-center border-b-2 py-4 px-1 text-sm font-medium"
                              )}
                            >
                              <tab.icon
                                className={classNames(
                                  props.activeTab === tab.id
                                    ? "text-blue-500"
                                    : "text-gray-400 group-hover:text-gray-500",
                                  "-ml-0.5 mr-2 h-5 w-5"
                                )}
                                aria-hidden="true"
                              />
                              <span>{tab.name}</span>
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className=" py-4">
                    {props.activeTab === "general" ? (
                      <div className="space-y-2">
                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Task name
                          </label>
                          <div className="mt-1">
                            <input
                              placeholder="Front-end wireframe"
                              required
                              type="text"
                              name="project-name"
                              id="project-name"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category
                          </label>
                          <div className="mt-1">
                            <input
                              placeholder="UI/UX"
                              required
                              type="text"
                              name="category"
                              id="category"
                              onChange={(e) => setCategory(e.target.value)}
                              value={category}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-gray-900">
                              Priority
                            </h2>
                          </div>
                          <RadioGroup
                            value={priority}
                            onChange={setPriority}
                            className="mt-2"
                          >
                            <RadioGroup.Label className="sr-only">
                              Choose a priority option
                            </RadioGroup.Label>
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                              {priorityOptions.map((option) => (
                                <RadioGroup.Option
                                  key={option.name}
                                  value={option}
                                  className={({ checked }) =>
                                    classNames(
                                      checked
                                        ? classNames(
                                            "border-transparent ring-2 ",
                                            option.textColor,
                                            option.bgColor,
                                            option.ringColor
                                          )
                                        : classNames(
                                            "border-gray-200",
                                            option.textColor,
                                            option.bgColor
                                          ),
                                      "flex cursor-pointer select-none items-center justify-center rounded-md border py-1.5 px-3 text-sm font-medium  sm:flex-1"
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="p">
                                    {option.name}
                                  </RadioGroup.Label>
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="add-team-members"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <div className="flex">
                            <div className="flex-grow">
                              <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                rows={3}
                                name="description"
                                id="description"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                placeholder="Create frontend wirefram..."
                                aria-describedby="description-helper"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : props.activeTab === "team" ? (
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label
                            htmlFor="add-team-members"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Add Team Members
                          </label>
                          <p id="add-team-members-helper" className="sr-only">
                            Search by email address
                          </p>
                          <div className="flex">
                            <div className="flex-grow">
                              <input
                                onChange={(e) =>
                                  setTeamMemberSearch(e.target.value)
                                }
                                value={teamMemberSearch}
                                type="email"
                                name="add-team-members"
                                id="add-team-members"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                placeholder="Email address"
                                aria-describedby="add-team-members-helper"
                              />
                            </div>
                            <span className="ml-3">
                              <button
                                onClick={() => addMember(teamMemberSearch)}
                                type="button"
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                              >
                                <PlusIcon
                                  className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Add</span>
                              </button>
                            </span>
                          </div>
                        </div>
                        {error ? (
                          <Alert
                            type="error"
                            message={error}
                            setOpen={setError}
                          />
                        ) : alert ? (
                          <Alert
                            type="success"
                            message={alert}
                            setOpen={setAlert}
                          />
                        ) : null}
                        <div
                          className={
                            "border-b border-gray-200  " +
                            (team.length > 2 ? "  relative" : null)
                          }
                        >
                          <ul
                            role="list"
                            className="h-40 divide-y  divide-gray-200 overflow-y-scroll"
                          >
                            {team.map((member) => (
                              <li
                                key={member.email}
                                className="flex justify-between py-4"
                              >
                                <div className="flex">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={member.image}
                                    alt=""
                                  />
                                  <div className="ml-3 flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">
                                      {member.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {member.email}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  {" "}
                                  {member.access === "owner" ? null : (
                                    <button
                                      onClick={() => removeMember(member.email)}
                                      type="button"
                                      className="mr-2 inline-flex  rounded-md bg-gray-200  p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50 "
                                    >
                                      <span className="sr-only">Dismiss</span>
                                      <XIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                {createError ? (
                  <Alert
                    type="error"
                    message={createError}
                    setOpen={setCreateError}
                  />
                ) : null}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  >
                    {loading ? (
                      <svg
                        className="-ml-1 mr-2 h-5 w-5 animate-spin text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {loading ? "Processing" : props.verb}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => {
                      setTimeout(() => props.setActiveTab("general"), 500)
                      props.setOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
