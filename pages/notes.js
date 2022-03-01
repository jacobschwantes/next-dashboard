import DefaultLayout from "../layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import RichText from "../components/RichText";
import { Disclosure } from "@headlessui/react";
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
import { useState } from "react";

const initialFolders = [
  {
    name: "Folder1",
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
  const deleteFolder = (folderIndex) => {
    setActiveFolder(0);
    console.log(folderIndex)
    const newState = [...folders]
    newState.splice(folderIndex, 1);
    setFolders(newState);
  }
  const addFolder = () => {
    console.log(folders)
    const emptyFolder = {
      name: `Folder${folders.length + 1}`,
      documents: [
      ]
  }
  setFolders([...folders, emptyFolder]); 
}
  return (
    <div className="space-y-5 overflow-auto px-4 py-4   xl:px-10">
      <div className="flex space-x-5">
       
        <div className="flex w-1/2 flex-col space-y-3 rounded-2xl border border-gray-100 p-5 shadow-lg shadow-gray-100">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center text-2xl font-semibold">
              {activeDocument.name}
              {readOnly ? null : <PencilIcon className="ml-1 h-5" />}
            </h1>
            <span className="flex space-x-2">
              <button
                onClick={() => {
                  setReadOnly(!readOnly);
                }}
                className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {readOnly ? (
                  <PencilAltIcon className="h-5 w-5" />
                ) : (
                  <CheckIcon className="h-5 w-5" />
                )}
              </button>
              <button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <DotsHorizontalIcon className="h-5 w-5" />
              </button>
              <button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <LinkIcon className="h-5 w-5" />
              </button>
            </span>
          </div>
          <RichText readOnly={readOnly} document={activeDocument.contents} />
        </div>

         <div className="flex-1 h-partial flex flex-col space-y-5   ">
          <div className=" h-1/2 flex flex-col   space-y-3 rounded-2xl border border-gray-100 p-5 shadow-lg shadow-gray-100">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Folders</h1>
              <span className=" flex space-x-2">
                <button onClick={() => addFolder()} className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <FolderAddIcon className="h-5 w-5" />
                </button>
                <button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <DotsHorizontalIcon className="h-5 w-5" />
                </button>
              </span>
            </div>
            <div className=" scrollbar black grid flex-1 grid-cols-3 gap-2 overflow-auto auto-rows-max ">
              {folders.map((folder, folderIndex) => {
                return (
                  <div
                    onClick={() => {
                      
                    }}
                    className={
                      " flex select-none flex-col space-y-6  rounded-2xl border-2 p-3 " +
                      (folderIndex === activeFolder ? " border-blue-500" : null)
                    }
                  >
                    <span className=" flex  items-start justify-between">
                      <FolderIcon className=" h-8 text-blue-500" />
                      <button onClick={() => deleteFolder(folderIndex)} className="rounded-lg  text-gray-700">
                        <DotsHorizontalIcon className="h-5 w-5" />
                      </button>
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
          <div className="flex-1 space-y-3 rounded-2xl border border-gray-100 p-5 shadow-lg shadow-gray-100">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Notes</h1>
              <span className=" flex space-x-2">
                <button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <DocumentAddIcon className="h-5 w-5" />
                </button>
                <button className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <DotsHorizontalIcon className="h-5 w-5" />
                </button>
              </span>
            </div>
            <table className="min-w-full ">
              <thead>
                <tr className="bg-gray-100">
                  <th className=" px-3 py-3 rounded-l-lg  text-left text-sm font-medium text-gray-700  ">Name</th>
                  <th className="px-6 py-3  text-left text-sm font-medium text-gray-700 ">Size</th>
                  <th className="px-6 py-3  text-left text-sm font-medium text-gray-700 ">Date</th>
                  <th className="px-6 py-3 rounded-r-lg  text-right text-xs font-medium text-gray-500 "></th>
                </tr>
              </thead>
              <tbody className="">
                {folders[activeFolder].documents.map(
                  (document, documentIndex) => {
                    return (
                      <tr className=" " key={documentIndex}>
                      
                        <td className=" w-full   py-3 whitespace-nowrap text-sm text-gray-900 ">
                        <span className="flex items-center ">
                          <DocumentTextIcon className="mr-1 h-6 text-blue-500" />
                          <a
                            onClick={() => {
                              setActiveDocument(
                                folders[activeFolder].documents[documentIndex]
                              );
                              setReadOnly(true);
                            }}
                            className="cursor-pointer font-medium text-lg"
                          >
                            {document.name}
                          </a>
                        </span></td>
                        <td  className="px-6 py-3  text-right whitespace-nowrap text-sm text-gray-500"><h1 className="text-gray-700 font-semibold ">3.4MB</h1></td>
                        <td className="px-6 py-3  text-right whitespace-nowrap text-sm text-gray-500 ">
                          
                        <h1 className="text-gray-700 font-semibold  ">10/5/22</h1></td>
                        <td className=" py-3 text-right whitespace-nowrap text-sm text-gray-500 ">
                        <button className="rounded-lg    text-gray-600 ">
                          <DotsVerticalIcon className="h-4 w-4" />
                        </button></td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

App.Layout = DefaultLayout;
