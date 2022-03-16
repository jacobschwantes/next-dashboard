import { TerminalIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

export default function Signin() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-4 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="flex items-center  space-x-1  ">
          <TerminalIcon className="h-10 w-10 text-blue-500 " />
          <h1 className=" whitespace-nowrap text-3xl  font-bold dark:text-gray-100 ">
            next-dashboard
          </h1>
        </div>
        <button
          onClick={() => signIn("google")}
          type="button"
          className="inline-flex  items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FaGoogle className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Sign in with Google
        </button>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="mailto:developer@jasch.dev"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            request early access
          </a>
        </p>
      </div>
    </div>
  );
}
