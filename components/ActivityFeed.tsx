import { Fragment } from "react";
import { ChatAltIcon, TagIcon, UserCircleIcon } from "@heroicons/react/solid";
import { Event } from "../types/projects";
import { formatDate } from "../lib/utils";
import ReactionListbox from "./ReactionListbox";


const activity = [
  {
    id: 1,
    type: "comment",
    person: { name: "Eduardo Benz", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
    date: "6d ago",
  },
  {
    id: 2,
    type: "assignment",
    person: { name: "Hilary Mahy", href: "#" },
    assigned: { name: "Kristin Watson", href: "#" },
    date: "2d ago",
  },
  {
    id: 3,
    type: "tags",
    person: { name: "Hilary Mahy", href: "#" },
    tags: [
      { name: "Bug", href: "#", color: "bg-rose-500" },
      { name: "Accessibility", href: "#", color: "bg-indigo-500" },
    ],
    date: "6h ago",
  },
  {
    id: 4,
    type: "comment",
    person: { name: "Jason Meyers", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.",
    date: "2h ago",
  },
];

const sampleData: Array<Event> = [
  {
    id: 1,
    type: "comment",
    action: "created",
    user: {
      name: "Jacob Schwantes",
      email: "jacobschwantes@outlook.com",
      image:
        "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
    },
    timestamp: 1649634949,
    body: "This is a great project! Keep up the great work team!",
  },
  {
    id: 2,
    type: "tags",
    action: "added",
    user: {
      name: "Jacob Schwantes",
      email: "jacobschwantes@outlook.com",
      image:
        "https://lh3.googleusercontent.com/a/AATXAJwnLnvk17d1sbwn7f1LNYre_d87AXvLc-zUdg3F=s96-c",
    },

    timestamp: 1649635264,
    body: [
      { name: "Bug", href: "#", color: "bg-rose-500" },
      { name: "Accessibility", href: "#", color: "bg-indigo-500" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ActivityFeed() {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {sampleData.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className="relative pb-8">
              {activityItemIdx !== sampleData.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3 ">
                {activityItem.type === "comment" ? (
                  <>
                    <div className="relative">
                      <img
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                        src={activityItem.user.image}
                        alt=""
                      />

                      <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                        <ChatAltIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a className="font-medium text-gray-900">
                            {activityItem.user.name}
                          </a>
                          
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Commented {formatDate(activityItem.timestamp)}
                        </p>
                      </div>
                      <div className="my-2 text-sm text-gray-700">
                        <p>{activityItem.body}</p>
                      </div>
                      <ReactionListbox/>
                    </div>
                  </>
                ) : activityItem.type === "assignment" ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <UserCircleIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <a
                          href={activityItem.person.href}
                          className="font-medium text-gray-900"
                        >
                          {activityItem.person.name}
                        </a>{" "}
                        assigned{" "}
                        <a
                          href={activityItem.assigned.href}
                          className="font-medium text-gray-900"
                        >
                          {activityItem.assigned.name}
                        </a>{" "}
                        <span className="whitespace-nowrap">
                          {activityItem.date}
                        </span>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === "tags" ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <TagIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-sm leading-8 text-gray-500">
                        <span className="mr-0.5">
                          <a
                          
                            className="font-medium text-gray-900"
                          >
                            {activityItem.user.name}
                          </a>{" "}
                          {activityItem.action} tags
                        </span>{" "}
                        <span className="mr-0.5">
                          {activityItem.body.map((tag) => (
                            <Fragment key={tag.name}>
                              <a
                                href={tag.href}
                                className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                              >
                                <span className="absolute flex flex-shrink-0 items-center justify-center">
                                  <span
                                    className={classNames(
                                      tag.color,
                                      "h-1.5 w-1.5 rounded-full"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="ml-3.5 font-medium text-gray-900">
                                  {tag.name}
                                </span>
                              </a>{" "}
                            </Fragment>
                          ))}
                        </span>
                        <span className="whitespace-nowrap">
                          {formatDate(activityItem.timestamp)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
