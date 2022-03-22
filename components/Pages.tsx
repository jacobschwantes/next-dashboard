import {
  FolderIcon,
  ClipboardListIcon,
  LinkIcon,
  NewspaperIcon,
  DatabaseIcon,
  ChipIcon,
  CalendarIcon,
  ChatAlt2Icon,
} from "@heroicons/react/solid";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Pages(props) {
  const generalNavigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: ChipIcon,
      current: props.active === '/',
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderIcon,
      current: props.active.includes('projects'),
    },
    {
      name: "CMS",
      href: "/cms",
      icon: DatabaseIcon,
      current: props.active.includes('cms'),
    },
    {
      name: "Notes",
      href: "/notes",
      icon: ClipboardListIcon,
      current: props.active.includes('notes'),
    },
    {
      name: "News",
      href: "/news",
      icon: NewspaperIcon,
      current: props.active.includes('news'),
    },
    {
      name: "Resources",
      href: "/resources",
      icon: LinkIcon,
      current: props.active.includes('resources'),
    },
  ];
  const appNavigation = [
    {
      name: "Calendar",
      href: "/calendar",
      icon: CalendarIcon,
      current: props.active === "calendar",
    },
    {
      name: "Chat",
      href: "/chat",
      icon: ChatAlt2Icon,
      current: props.active === "chat",
    },
  ];
  return (
    <nav className="mt-2 flex-1 space-y-6 bg-opacity-80  p-0   ">
      <div className={" flex-col  space-y-1 " + (props.wideNav ? " block " : "  flex group-hover:block")}>
        <h1 className={"ml-4 text-xs font-bold text-gray-800  transition-opacity   " + (props.wideNav ? " opacity-100" : " group-hover:opacity-100 opacity-0")}>
          GENERAL
        </h1>
        {generalNavigation.map((item) => (
          <Link href={item.href}>
           
            <a
              onClick={() => {props.setOpen(false)}}
              key={item.name}
              className={classNames(
                item.current
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-800 dark:bg-opacity-25    "
                  : "text-gray-500  ",
                " flex items-center justify-start p-4 rounded-lg border border-transparent text-center font-medium leading-none  text-white transition-all     hover:bg-gray-100 dark:hover:bg-gray-800  "
              )}
            >
              <item.icon
                className={"ml-1 h-5 w-5 flex-shrink-0 transition-colors " + (props.wideNav ? " mr-3 " : " group-hover:mr-3")}
                aria-hidden="true"
              />
              <span className={(props.wideNav ? " flex" : " hidden group-hover:flex")}>{item.name}</span>
            </a>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-start space-y-1 group-hover:block">
        <h1 className={"ml-4 text-xs font-bold text-gray-800  transition-opacity   " + (props.wideNav ? " opacity-100" : " group-hover:opacity-100 opacity-0")}>
          MANAGEMENT
        </h1>
        {appNavigation.map((item) => (
          <Link href={item.href}>
            <a
              key={item.name}
              className={classNames(
                item.current
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-800 dark:bg-opacity-25    "
                  : "text-gray-500",
                "flex items-center justify-start rounded-lg border border-transparent px-4 py-4 text-center font-medium leading-none  text-white transition-all     hover:bg-gray-100 dark:hover:bg-gray-800  "
              )}
            >
              <item.icon
                className={"ml-1 h-5 w-5 flex-shrink-0 transition-colors " + (props.wideNav ? " mr-3 " : " group-hover:mr-3")}
                aria-hidden="true"
              />
              <span className={(props.wideNav ? " flex" : " hidden group-hover:flex")}>{item.name}</span>
            </a>
          </Link>
        ))}
      </div>
      <div className=" space-y-1 group-hover:block">
        <h1 className={"ml-4 text-xs font-bold text-gray-800  transition-opacity   " + (props.wideNav ? " opacity-100" : " group-hover:opacity-100 opacity-0")}>
          APP
        </h1>
        {appNavigation.map((item) => (
          <Link href={item.href}>
            <a
              key={item.name}
              className={classNames(
                item.current
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-800 dark:bg-opacity-25    "
                  : "text-gray-500",
                " flex items-center justify-start rounded-lg border border-transparent px-4 py-4 text-center font-medium leading-none  text-white transition-all     hover:bg-gray-100 dark:hover:bg-gray-800 "
              )}
            >
              <item.icon
                className={"ml-1 h-5 w-5 flex-shrink-0 transition-colors " + (props.wideNav ? " mr-3 " : " group-hover:mr-3")}
                aria-hidden="true"
              />
              <span className={(props.wideNav ? " flex" : " hidden group-hover:flex")}>{item.name}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
