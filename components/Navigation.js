import ProfileMenu from "./ProfileMenu";
import { TerminalIcon } from "@heroicons/react/solid";
import Pages from "./Pages";
import Image from "next/image";
export default function Navigation(props) {
  return (
    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white items-center  px-2">
      <div className="flex items-center justify-start space-x-1 md:px-2 pt-5 w-full">
        <TerminalIcon className="text-blue-500   h-10 w-10" />
        <h1 className="text-2xl font-medium text-center    ">next-dashboard
        </h1>
      </div>
      <div className="  md:px-2 py-3 w-full ">
        <div className="bg-gray-100 flex space-x-3 rounded-lg p-4 items-center">
        <img src={props.session.user.image} className="h-9 w-9 inline-flex rounded-full"></img>
        <span className="flex flex-col">
          <h1 className="text-sm font-semibold">{props.session.user.name}</h1>
          <h1 className="text-sm text-gray-600">admin</h1>
        </span></div>
      </div>
      <div className="flex-1 w-full  pb-4 overflow-y-auto">
       
        <Pages active={props.active} />
      </div>
      
      
    </div>
  );
}
