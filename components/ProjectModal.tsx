import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { Disclosure, Menu, RadioGroup } from "@headlessui/react";
import { HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import {
  CreditCardIcon,
  OfficeBuildingIcon,
  UserIcon,
  UsersIcon,
  EyeIcon,
  ShieldCheckIcon,
  ColorSwatchIcon,
  AdjustmentsIcon,
} from "@heroicons/react/solid";
import Alert from "./Alert";
import { Project } from "../types/projects";

const colors = [
  { name: "Blue", bgColor: "bg-blue-500", selectedColor: "ring-blue-500" },
  { name: "Pink", bgColor: "bg-pink-500", selectedColor: "ring-pink-500" },

  {
    name: "Purple",
    bgColor: "bg-purple-500",
    selectedColor: "ring-purple-500",
  },

  { name: "Green", bgColor: "bg-green-500", selectedColor: "ring-green-500" },
  {
    name: "Yellow",
    bgColor: "bg-yellow-500",
    selectedColor: "ring-yellow-500",
  },
  {
    name: "Pink/Purple",
    bgColor: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    selectedColor: "ring-purple-500",
  },
  {
    name: "Blue/Green",
    bgColor: "bg-gradient-to-br from-green-400 to-blue-500",
    selectedColor: "ring-green-500",
  },
  {
    name: "Pink/Yellow",
    bgColor: "bg-gradient-to-br from-pink-400 to-yellow-500",
    selectedColor: "ring-yellow-500",
  },
  {
    name: "Sky/Red",
    bgColor: "bg-gradient-to-br from-sky-400 to-red-500",
    selectedColor: "ring-sky-500",
  },
];
const tabs = [
  { name: "General", id: "general", icon: AdjustmentsIcon },
  { name: "Team", id: "team", icon: UsersIcon },
  { name: "Theme", id: "theme", icon: ColorSwatchIcon },
  { name: "Privacy", id: "privacy", icon: ShieldCheckIcon },
];

const privacySettings = [
  {
    id: "public",
    name: "Public access",
    description: "This project would be available to anyone who has the link",
  },
  {
    id: "team",
    name: "Private to Project Members",
    description: "Only members of this project would be able to access",
  },
  {
    id: "private",
    name: "Private to you",
    description: "You are the only one able to access this project",
  },
];
export default function ProjectModal(props) {
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
        setCreateError(e.message);
        setLoading(false);
      });
    return response; // parses JSON response into native JavaScript objects
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [createError, setCreateError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [active, setActive] = useState("general");
  const [privacy, setPrivacy] = useState(props.project.privacy);
  const [projectName, setProjectName] = useState(props.project.name);
  const [category, setCategory] = useState(props.project.category);
  const [description, setDescription] = useState(props.project.description);
  const [tags, setTags] = useState(props.project.tags);
  const [teamMemberSearch, setTeamMemberSearch] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    {
      name: props.session.user.name,
      email: props.session.user.email,
      image: props.session.user.image,
      access: "owner",
    },
  ]);
  const [theme, setTheme] = useState(props.project.theme);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
      setAlert(null);
      setTagInput("");
      setActive("general");
      setPrivacy(props.project.privacy);
      setProjectName(props.project.name);
      setCategory(props.project.category);
      setDescription(props.project.description);
      setTags(props.project.tags);
      setTeamMemberSearch("");
      setTeamMembers(
        props.verb === "Create"
          ? [
              {
                name: props.session.user.name,
                email: props.session.user.email,
                image: props.session.user.image,
                access: "owner",
              },
            ]
          : props.project.team
      );
      setTheme(props.project.theme);
    }, 300);
  }, [props.open, props.project]);

  async function updateProject() {
    setLoading(true);
    let project: Project = {
      _id: props.project._id,
      name: projectName,
      category,
      description,
      team: teamMembers,
      tags,
      tasks: props.project.tasks,
      issues: props.project.issues,
      theme,
      created_at: props.project.created_at,
      last_edit: Date.now(),
      privacy,
    };
    console.log(project);
    await postData("/api/projects", "PUT", project).then((res) => {
      if (res) {
        console.log(res);
        setLoading(false);
        props.update();
        props.setOpen(false);
        props.setActive(0);
      }
    });
  }
  async function createProject() {
    setLoading(true);
    let project: Project = {
      name: projectName,
      category,
      description,
      team: teamMembers,
      tags,
      tasks: [],
      issues: [],
      theme,
      created_at: Date.now(),
      last_edit: Date.now(),
      privacy,
    };
    console.log(project);
    await postData("/api/projects", "POST", project).then((res) => {
      if (res) {
        setLoading(false);
        props.setOpen(false);
        props.update();
        props.setActive(0);
      }
    });
  }
  function removeMember(email) {
    let newState = [...teamMembers].filter((item) => item.email !== email);
    console.log(newState);
    setTeamMembers(newState);
  }
  async function addMember(email) {
    if (teamMembers.find((member) => member.email === email)) {
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
        let newState = [...teamMembers, member];
        setTeamMembers(newState);
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
                  props.verb === "Create" ? createProject() : updateProject();
                  console.log("submitted");
                }}
              >
                <div>
                  <h1 className="text-xl font-medium leading-6 text-gray-900">
                    {props.heading}
                  </h1>
                 
                    <div className="block overflow-x-auto pt-3">
                      <div className="rounded-xl bg-gray-100 p-1 ">
                        <nav
                          className=" flex space-x-8"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab) => (
                            <a
                            key={tab.name}
                            onClick={() => setActive(tab.id)}
                            className={classNames(
                              "flex w-full items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 ",
                              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                               active === tab.id
                                ? "bg-white text-blue-600 shadow"
                                : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-600"
                            )}
                          ><tab.icon className="h-5 mr-1" />
                            <h1 className="hidden sm:block">{tab.name}</h1>{" "}
                            
                          </a>
                          ))}
                        </nav>
                      </div>
                   
                  </div>
                  <div className=" py-3">
                    {active === "general" ? (
                      <div className="space-y-2">
                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Project Name
                          </label>
                          <div className="mt-1">
                            <input
                              placeholder="Finance Backend"
                              required
                              type="text"
                              name="project-name"
                              id="project-name"
                              onChange={(e) => setProjectName(e.target.value)}
                              value={projectName}
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
                              placeholder="REST API"
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
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              placeholder="Backend for accessing financi..."
                              required
                              id="description"
                              name="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                              
                              className="block w-full resize-none rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="add-team-members"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tags
                          </label>
                          <div className="flex">
                            <div className="flex-grow">
                              <input
                                onChange={(e) => setTagInput(e.target.value)}
                                value={tagInput}
                                type="text"
                                name="add-tag"
                                id="add-tag"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                placeholder="API"
                                aria-describedby="add-tag-helper"
                              />
                            </div>
                            <span className="ml-3">
                              <button
                                onClick={() => {
                                  setTags([...tags, tagInput]);
                                  setTagInput("");
                                }}
                                type="button"
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                              >
                                <PlusIcon
                                  className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Add</span>
                              </button>
                            </span>
                          </div>
                          <div className="space-x-1">
                            {tags.map((tag, index) => {
                              return (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-full bg-blue-100 py-0.5 pl-2 pr-0.5 text-xs font-medium text-blue-700"
                                >
                                  {tag}
                                  <button
                                    onClick={() => {
                                      setTags(
                                        tags.filter((item) => tag !== item)
                                      );
                                    }}
                                    type="button"
                                    className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none"
                                  >
                                    <span className="sr-only">Remove tag</span>
                                    <svg
                                      className="h-2 w-2"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 8 8"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeWidth="1.5"
                                        d="M1 1l6 6m0-6L1 7"
                                      />
                                    </svg>
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : active === "theme" ? (
                      <div className="space-y-3">
                        <RadioGroup
                          value={colors.find((el) => el.name === theme.name)}
                          onChange={setTheme}
                        >
                          <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                            Choose a theme color
                          </RadioGroup.Label>
                          <div className=" flex items-center space-x-3  overflow-x-auto py-2 px-1.5 sm:overflow-hidden">
                            {colors.map((color) => (
                              <RadioGroup.Option
                                key={color.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    color.selectedColor,
                                    active && checked
                                      ? "ring ring-offset-1"
                                      : "",
                                    !active && checked ? "ring-2" : "",
                                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                  )
                                }
                              >
                                <RadioGroup.Label as="p" className="sr-only">
                                  {color.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    color.bgColor,
                                    "h-8 w-8 rounded-full border border-black border-opacity-10"
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    ) : active === "privacy" ? (
                      <RadioGroup
                        value={privacySettings.find(
                          (el) => el.id === privacy.id
                        )}
                        onChange={setPrivacy}
                      >
                        <RadioGroup.Label className="text-sm font-medium text-gray-900">
                          Privacy
                        </RadioGroup.Label>

                        <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm ">
                          {privacySettings.map((setting) => (
                            <RadioGroup.Option
                              key={setting.name}
                              id={setting.id}
                              value={setting}
                              className={({ checked }) =>
                                classNames(
                                  checked
                                    ? "z-10 border-sky-200 bg-sky-50"
                                    : "border-gray-200",
                                  "relative flex cursor-pointer border p-4 focus:outline-none"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <span
                                    className={classNames(
                                      checked
                                        ? "border-transparent bg-sky-600"
                                        : "border-gray-300 bg-white",
                                      active
                                        ? "ring-2 ring-sky-500 ring-offset-2"
                                        : "",
                                      "mt-0.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border"
                                    )}
                                    aria-hidden="true"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                  </span>
                                  <div className="ml-3 flex flex-col">
                                    <RadioGroup.Label
                                      as="span"
                                      className={classNames(
                                        checked
                                          ? "text-sky-900"
                                          : "text-gray-900",
                                        "block text-sm font-medium"
                                      )}
                                    >
                                      {setting.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className={classNames(
                                        checked
                                          ? "text-sky-700"
                                          : "text-gray-500",
                                        "block text-sm"
                                      )}
                                    >
                                      {setting.description}
                                    </RadioGroup.Description>
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    ) : active === "team" ? (
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
                            (teamMembers.length > 2 ? "  relative" : null)
                          }
                        >
                          <ul
                            role="list"
                            className="h-40 divide-y  divide-gray-200 overflow-y-scroll"
                          >
                            {teamMembers.map((member) => (
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
                <div className=" sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
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
                    onClick={() => props.setOpen(false)}
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
