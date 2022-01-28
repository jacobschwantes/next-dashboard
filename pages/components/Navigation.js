import {
    FolderIcon,
    ClipboardListIcon,
    LinkIcon,
    NewspaperIcon,
    DatabaseIcon,
    ChipIcon,
  } from "@heroicons/react/outline";
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
export default function Navigation(props) {
    const navigation = [
    { name: "App", href: "/", icon: ChipIcon, current: props.active === 'app' },
    { name: "Projects", href: "/projects", icon: FolderIcon, current: props.active === 'projects' },
    { name: "CMS", href: "/cms", icon: DatabaseIcon, current: props.active === 'cms' },
    { name: "Notes", href: "/notes", icon: ClipboardListIcon, current: props.active === 'notes' },
    { name: "News", href: "/news", icon: NewspaperIcon, current: props.active === 'news' },
    { name: "Resources", href: "/resources", icon: LinkIcon, current: props.active === 'resources' },
  ];
  return (
    <nav className="mt-5 flex-1 px-2 bg-white space-y-5">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-blue-100 text-blue-900"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
          )}
        >
          <item.icon
            className={classNames(
              item.current
                ? "text-blue-900"
                : "text-gray-400 group-hover:text-gray-500",
              "mr-3 flex-shrink-0 h-6 w-6 transition-colors"
            )}
            aria-hidden="true"
          />
          {item.name}
        </a>
      ))}
    </nav>
  );
}
