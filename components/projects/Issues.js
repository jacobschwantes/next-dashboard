import { useEffect, useState } from "react";
import Pagination from "../Pagintation";
import Input from "../Input";
import IssueModal from "./IssueModal";
import { PlusIcon } from "@heroicons/react/solid";
import { useSWRConfig } from "swr";
import Link from "next/link";
import { formatDate } from "../../lib/utils";
export default function Issues(props) {
  const { mutate } = useSWRConfig();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const batchSize = 5; // items per chunk
  const [active, setActive] = useState(1);
  const [data, setData] = useState(props.data.issues ? props.data.issues : []);
  let searchedIssues = data.filter((item) => {
    let lowercase = item.title.toLowerCase();
    return lowercase.includes(search.toLocaleLowerCase());
  });
  return (
    <div>
      <IssueModal
        projectId={props.projectId}
        setActive={setActive}
        verb="Create"
        heading="Create Issue"
        open={open}
        setOpen={setOpen}
        update={(issue) => setData([issue, ...data])}
      />
      <div className=" flex sm:items-center space-y-1 sm:flex-row flex-col justify-between w-full ">
        <Input
          expand={false}
          setInput={setSearch}
          value={search}
          type="search"
          name="search"
          id="search"
          placeholder="Search"
        />
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="flex justify-center sm:justify-start  items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="mr-1 h-4" />
          New Issue
        </button>
      </div>

      <div className=" my-2 flex flex-col space-y-2">
        {searchedIssues.map((item, index) => {
          if (
            index >= batchSize * (active - 1) &&
            index <= batchSize * active - 1
          ) {
            return (
              <Link key={item.name} href={`../${props.projectId}/issues/${index}`}>
                <a className="flex w-full  overflow-hidden rounded-lg bg-gray-50">
                  <span
                    className={
                      "mr-3  w-1 " +
                      (item.closed ? "bg-red-500" : "bg-green-500")
                    }
                  ></span>
                  <div className="p-4 pl-0">
                    <h1 className=" text-xl">{item.title}</h1>
                    <p className=" text-sm">
                      {item.closed ? "closed" : "opened"}{" "}
                      {item.closed
                        ? formatDate(item.closed.timestamp / 1000)
                        : formatDate(item.created / 1000)}{" "}
                      by{" "}
                      {item.closed ? item.closed.user.name : item.author.name}
                    </p>
                  </div>
                </a>
              </Link>
            );
          }
        })}
      </div>

      <Pagination
        pages={Math.ceil(searchedIssues.length / batchSize)}
        setActive={setActive}
        active={active}
        size={searchedIssues.length}
        batchSize={5}
      />
    </div>
  );
}
