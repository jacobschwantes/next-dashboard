import { EmojiSadIcon, EyeOffIcon } from "@heroicons/react/outline";

/* This example requires Tailwind CSS v2.0+ */
export default function Example() {
  return (

      <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl"><EyeOffIcon className=" h-20"/></p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Unauthorized</h1>
                <p className="mt-1 text-base text-gray-500">Uh oh. Looks like you have not been given access to this project.</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go back home
                </a>
                <a
                  href="mailto:developer@jasch.dev"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Request access
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
  
  )
}

  