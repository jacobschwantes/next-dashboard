import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { Disclosure, Menu, RadioGroup } from "@headlessui/react";
import { DocumentTextIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon, PhotographIcon } from "@heroicons/react/solid";
import { Issue } from "../../types/projects";
import Alert from "../Alert";
import { useSession } from "next-auth/react";

import RichText from "../RichText";
const tabs = [
  { name: "General", id: "general", icon: AdjustmentsIcon },
  { name: "Body", id: "body", icon: DocumentTextIcon },
];

export default function IssueModal(props) {
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
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [title, setTitle] = useState('');
  const [createError, setCreateError] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [active, setActive] = useState("general");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [body, setBody] = useState(null)
  const [activeDocument, setActiveDocument] = useState({
    contents: [
        
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  });

  useEffect(() => {}, [props.open, props.project]);

  async function updateIssue() {
    setLoading(true);
    let project = {
      _id: props.project._id,
      name: projectName,
      category,
      description,
      tags,
      members: teamMembers,
      theme,
      last_edit: Date.now(),
      privacy,
    };
    console.log(project);
    await postData("/api/projects/updateproject", project).then((res) => {
      if (res) {
        setLoading(false);
        props.update();
        props.setOpen(false);
        props.setActive(0);
      }
    });
  }
  async function createIssue() {
    setLoading(true);
    let issue : Issue = {
      author: session.user,
      title,
      category,
      body,
      tags,
      created: Date.now(),
      
    };
    await postData("/api/projects/issues", {issue, projectId: props.projectId }).then((res) => {
      if (res) {
        setLoading(false);
        props.setOpen(false);
        props.update(issue);
        props.setActive(1);
      }
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
                  props.verb === "Create" ? createIssue() : updateIssue();
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
                              onClick={() => setActive(tab.id)}
                              className={classNames(
                                active === tab.id
                                  ? "border-blue-500 text-blue-600"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "group inline-flex cursor-pointer select-none items-center border-b-2 py-4 px-1 text-sm font-medium"
                              )}
                              aria-current={tab.current ? "page" : undefined}
                            >
                              <tab.icon
                                className={classNames(
                                  active === tab.id
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
                    {active === "general" ? (
                      <div className="space-y-2">
                        

                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <div className="mt-1">
                            <input
                              placeholder="Cant view project details on mobile"
                              required
                              type="text"
                              name="project-name"
                              id="project-name"
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
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
                              placeholder="Front-end"
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
                                placeholder="bug"
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
                    ) : active === "body" ? (
                      <RichText
                        setBody={setBody}
                        readOnly={readOnly}
                        document={activeDocument.contents}
                      />
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
