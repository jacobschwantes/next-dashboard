import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import RichText from "../components/RichText";
import { Disclosure } from "@headlessui/react";
import Dropdown from "../components/Dropdown";
import { Folder } from "../types/notes";
import {
  PencilIcon,
  DotsHorizontalIcon,
  LinkIcon,
  ChevronDownIcon,
  FolderIcon,
  DocumentTextIcon,
  PencilAltIcon,
  SaveIcon,
  CheckIcon,
  FolderAddIcon,
  DocumentAddIcon,
  DotsVerticalIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const initialFolders: Array<Folder> = [
  {
    name: "Folder1",
    favorite: false,
    documents: [
      {
        name: "Note1",
        contents: [
          {
            type: "paragraph",
            children: [
              { text: "This is editable " },
              { text: "rich", bold: true },
              { text: " text, " },
              { text: "much", italic: true },
              { text: " better than a " },
              { text: "<textarea>", code: true },
              { text: "!" },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Since it's rich text, you can do things like turn a selection of text ",
              },
              { text: "bold", bold: true },
              {
                text: ", or add a semantically rendered block quote in the middle of the page, like this:",
              },
            ],
          },
          {
            type: "paragraph",
            children: [{ text: "Try it out for yourself!" }],
          },
        ],
      },
      {
        name: "Funny Note",
        contents: [
          {
            type: "paragraph",
            children: [{ text: "Try it out for yourself!" }],
          },
        ],
      },
    ],
  },
  {
    name: "Folder2",
    favorite: false,
    documents: [
      {
        name: "Note1",
        contents: [
          {
            type: "paragraph",
            children: [
              { text: "This is editable " },
              { text: "rich", bold: true },
              { text: " text, " },
              { text: "much", italic: true },
              { text: " better than a " },
              { text: "<textarea>", code: true },
              { text: "!" },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Since it's rich text, you can do things like turn a selection of text ",
              },
              { text: "bold", bold: true },
              {
                text: ", or add a semantically rendered block quote in the middle of the page, like this:",
              },
            ],
          },
          {
            type: "paragraph",
            children: [{ text: "Try it out for yourself!" }],
          },
        ],
      },
      {
        name: "Funny Note",
        contents: [
          {
            type: "paragraph",
            children: [{ text: "Try it out for yourself!" }],
          },
        ],
      },
    ],
  },
  {
    name: "Folder3",
    favorite: false,
    documents: [
      {
        name: "Note1",
        contents: [
          {
            type: "paragraph",
            children: [
              { text: "This is editable " },
              { text: "rich", bold: true },
              { text: " text, " },
              { text: "much", italic: true },
              { text: " better than a " },
              { text: "<textarea>", code: true },
              { text: "!" },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Since it's rich text, you can do things like turn a selection of text ",
              },
              { text: "bold", bold: true },
              {
                text: ", or add a semantically rendered block quote in the middle of the page, like this:",
              },
            ],
          },
          {
            type: "paragraph",
            children: [{ text: "Try it out for yourself!" }],
          },
        ],
      },
      {
        name: "Funny Note",
        contents: [
          {
            type: "paragraph",
            children: [{ text: "Try it out for yourself!" }],
          },
        ],
      },
    ],
  },
  {
    name: "Folder4",
    favorite: false,
    documents: [
      {
        name: "Very Funny Note",
        contents: [
          {
            type: "paragraph",
            children: [
              {
                text: "Since it's rich text, you can do things like turn a selection of text ",
              },
              { text: "bold", bold: true },
              {
                text: ", or add a semantically rendered block quote in the middle of the page, like this:",
              },
            ],
          },
        ],
      },
      {
        name: "Funny Note 45",
        contents: [
          {
            type: "paragraph",
            children: [{ text: "Try it out for yourself!" }],
          },
        ],
      },
    ],
  },
];

export default function App() {
  const { data: session, status } = useSession();
  const [folders, setFolders] = useState(initialFolders);
  const [activeDocument, setActiveDocument] = useState(folders[0].documents[0]);
  const [activeFolder, setActiveFolder] = useState(0);
  const [readOnly, setReadOnly] = useState(true);
  const [titleEditor, setTitleEditor] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [body, setBody] = useState('');

  useEffect(() => {
    setReadOnly(true);
    setEditingTitle(false);
  }, [activeDocument._id, activeFolder]);
  const deleteFolder = (folderIndex: number) => {
    setActiveFolder(0);

    const newState = [...folders];
    newState.splice(folderIndex, 1);
    setFolders(newState);
  };
  const addFolder = () => {

    const emptyFolder: Folder = {
      name: `Folder${folders.length + 1}`,
      favorite: false,
      documents: [],
    };
    setFolders([...folders, emptyFolder]);
  };
  const addDocument = () => {
    const newState = [...folders];
    newState[activeFolder].documents.push({
      name: "Untitled Note",
      contents: [
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
      ],
    });
    setFolders(newState);
  };
  const editTitle = () => {
   setActiveDocument({...activeDocument, name: titleEditor});
   setEditingTitle(false);
  }
  return (
    <div className="space-y-5 overflow-auto px-4    xl:px-10 pb-4">
      <div className="flex space-x-5">
        <div className="flex h-partial w-1/2 flex-col space-y-3 overflow-hidden rounded-2xl border border-gray-100 p-5 shadow-lg shadow-gray-100">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center text-2xl font-semibold">
              {editingTitle ? (
                <span className="flex items-center">
                  <input
                    className="text-2xl font-semibold focus:outline-none"
                    onChange={(e) => setTitleEditor(e.target.value)}
                    value={titleEditor}
                  ></input>
                  <button onClick={() => {titleEditor ? editTitle() : setEditingTitle(false)}} className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <CheckIcon className="h-5 w-5" />
                  </button>
                </span>
              ) : (
                <span className="flex items-center">
                  {activeDocument.name}
                  {readOnly ? null : (
                    <a
                      onClick={() => {
                        setEditingTitle(true);
                        setTitleEditor(activeDocument.name);
                      }}
                    >
                      <PencilIcon className="ml-1 h-5" />
                    </a>
                  )}
                </span>
              )}
            </h1>
            <span className="flex space-x-2">
              <button
                onClick={() => {
                  setReadOnly(!readOnly);
                }}
                className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {readOnly ? (
                  <PencilAltIcon className="h-5 w-5" />
                ) : (
                  <CheckIcon className="h-5 w-5" />
                )}
              </button>

              <button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <LinkIcon className="h-5 w-5" />
              </button>
              <Dropdown
                orientation="horizontal"
                shortButton
                options={[{ id: "delete", option: "Delete" }]}
              />
            </span>
          </div>
          <RichText setBody={setBody} expand={true} readOnly={readOnly} document={activeDocument.contents} />
        </div>

        <div className="h-partial flex-1 grid grid-rows-2 gap-4   ">
          <div className=" flex flex-col   space-y-3 rounded-2xl border border-gray-100 p-5 shadow-lg shadow-gray-100">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Folders</h1>
              <span className=" flex space-x-2">
                <button
                  onClick={() => addFolder()}
                  className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FolderAddIcon className="h-5 w-5" />
                </button>
                <Dropdown
                  shortButton
                  options={[{ id: "delete", option: "Delete" }]}
                />
              </span>
            </div>
            <div className="  grid flex-1 auto-rows-max grid-cols-3 gap-2 overflow-auto ">
              {folders.map((folder: Folder, folderIndex) => {
                return (
                  <div
                    key={folderIndex}
                    onClick={() => {
                      setActiveFolder(folderIndex);
                    }}
                    className={
                      " flex select-none flex-col space-y-6  rounded-2xl border-2 p-3 " +
                      (folderIndex === activeFolder ? " border-blue-500" : null)
                    }
                  >
                    <span className=" flex  items-start justify-between">
                      <FolderIcon className=" h-8 text-blue-500" />
                      <Dropdown
                        orientation="horizontal"
                        shortButton
                        options={[{ id: "delete", option: "Delete" }]}
                      />
                    </span>
                    <span className="flex items-center justify-between">
                      <h1 className="ml-1 text-lg font-medium text-gray-900 ">
                        {folder.name}
                      </h1>
                      <h1 className="text-xs font-semibold text-gray-500">
                        {folder.documents.length} items
                      </h1>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col space-y-3 rounded-2xl border border-gray-100 p-5 shadow-lg shadow-gray-100 ">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Notes</h1>
              <span className=" flex space-x-2">
                <button
                  onClick={() => addDocument()}
                  className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <DocumentAddIcon className="h-5 w-5" />
                </button>
                <Dropdown
                  orientation="horizontal"
                  shortButton
                  options={[{ id: "delete", option: "Delete" }]}
                />
              </span>
            </div>
            <div className="overflow-y-auto flex-1 ">
            <table className="min-w-full  ">
              <thead>
                <tr className="bg-gray-100">
                  <th className=" rounded-l-lg px-3 py-3  text-left text-sm font-medium text-gray-700  ">
                    Name
                  </th>
                  <th className="px-6 py-3  text-left text-sm font-medium text-gray-700 ">
                    Size
                  </th>
                  <th className="px-6 py-3  text-left text-sm font-medium text-gray-700 ">
                    Date
                  </th>
                  <th className="rounded-r-lg px-6 py-3  text-right text-xs font-medium text-gray-500 "></th>
                </tr>
              </thead>
              <tbody className="">
                {folders[activeFolder].documents.map(
                  (document, documentIndex) => {
                    return (
                      <tr className=" " key={documentIndex}>
                        <td className=" w-full   whitespace-nowrap py-3 text-sm text-gray-900 ">
                          <span className="flex items-center ">
                            <DocumentTextIcon className="mr-1 h-6 text-blue-500" />
                            <a
                              onClick={() => {
                                setActiveDocument(
                                  folders[activeFolder].documents[documentIndex]
                                );
                                setReadOnly(true);
                              }}
                              className="cursor-pointer text-lg font-medium"
                            >
                              {document.name}
                            </a>
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6  py-3 text-right text-sm text-gray-500">
                          <h1 className="font-semibold text-gray-700 ">
                            3.4MB
                          </h1>
                        </td>
                        <td className="whitespace-nowrap px-6  py-3 text-right text-sm text-gray-500 ">
                          <h1 className="font-semibold text-gray-700  ">
                            10/5/22
                          </h1>
                        </td>
                        <td className=" whitespace-nowrap py-3 px-2 text-right text-sm text-gray-500 ">
                          <Dropdown
                            orientation="vertical"
                            shortButton
                            options={[
                              { id: "view", option: "View" },
                              { id: "favorite", option: "Favorite" },
                              { id: "delete", option: "Delete" },
                            ]}
                          />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table></div>
          </div>
        </div>
      </div>
    </div>
  );
}

App.Layout = DefaultLayout;
