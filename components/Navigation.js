import ProfileMenu from "./ProfileMenu";
import { TerminalIcon } from "@heroicons/react/solid";
import Pages from "./Pages";
export default function Navigation(props) {
  return (
    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white items-center space-y-3 px-2">
      <div className="flex items-center justify-start space-x-1 md:px-2 pt-5 w-full">
        <TerminalIcon className="text-blue-500   h-10 w-10" />
        <h1 className="text-2xl font-medium text-center    ">next-dashboard
        </h1>
      </div>
      <div className="flex-1 w-full  pb-4 overflow-y-auto">
        <ProfileMenu session={props.session} />
        <Pages active={props.active} />
      </div>
      <span className="flex w-full items-center">
        <button
          type="submit"
          className=" m-3 flex-1 justify-center py-2 px-4 border-gray-200 rounded-md  bg-gray-100  text-sm font-medium text-gray-600 border hover:bg-gray-200 hover:shadow-none transition-all "
        >
          Settings
        </button>
      </span>
    </div>
  );
}
