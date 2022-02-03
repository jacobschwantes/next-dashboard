import {
  FolderIcon,
  ClipboardListIcon,
  LinkIcon,
  NewspaperIcon,
  DatabaseIcon,
  ChipIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Pages(props) {
  const navigation = [
    { name: "Dashboard", href: "/", icon: ChipIcon, current: props.active === "app" },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderIcon,
      current: props.active === "projects",
    },
    {
      name: "CMS",
      href: "/cms",
      icon: DatabaseIcon,
      current: props.active === "cms",
    },
    {
      name: "Notes",
      href: "/notes",
      icon: ClipboardListIcon,
      current: props.active === "notes",
    },
    {
      name: "News",
      href: "/news",
      icon: NewspaperIcon,
      current: props.active === "news",
    },
    {
      name: "Resources",
      href: "/resources",
      icon: LinkIcon,
      current: props.active === "resources",
    },
  ];
  return (
    <nav className="mt-2 flex-1 lg:px-2 p-0 bg-white space-y-1">
      {navigation.map((item) => (
        <Link href={item.href}>
          <a
            key={item.name}
            className={classNames(
              item.current
                ? "bg-blue-100 text-blue-600    "
                : "text-gray-600  hover:text-gray-900",
              " flex items-center px-3 py-2 border border-transparent rounded-lg  hover:bg-gray-100 text-md font-semibold text-white transition-all hover:scale-105 "
            )}
          >
            <item.icon
              className={classNames(
                item.current
                  ? "text-blue-600"
                  : "text-gray-400 group-hover:text-gray-500",
                "mr-3 flex-shrink-0 h-5 w-5 transition-colors"
              )}
              aria-hidden="true"
            />
            {item.name}
          </a>
        </Link>
      ))}
    </nav>
  );
}
