import { signIn, signOut, useSession } from "next-auth/react";

export default function Signin() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="flex w-full max-w-full flex-col items-start space-y-5 place-self-center px-6 sm:mx-auto sm:max-w-xl lg:px-8  ">
        <h1 className="text-3xl font-medium">Log in</h1>
        <p className="text-sm text-zinc-500">
          Enter your credentials to access your account
        </p>
        <button
          onClick={() => signIn("google")}
          type="button"
          className="inline-flex   w-full items-center justify-center  rounded-lg  border bg-white px-4 py-3 text-sm font-medium text-zinc-700   shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg viewBox="0 0 24 24" className="mr-2 h-5">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Log in with Google
        </button>
        <div className="flex w-full items-center space-x-3 text-zinc-400">
          <span className="w-full border-t" /> <span>or</span>
          <span className="w-full border-t " />
        </div>
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-gray-300 py-2.5 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="flex justify-between text-sm font-medium text-gray-700"
          >
            Password <button className="text-blue-600">Forgot password?</button>
          </label>
          <div className="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-gray-300 py-2.5 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="comments" className="text-zinc-500">
              Remember me
            </label>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <div className=" text-sm">
          <label htmlFor="signup" className="mr-1  text-zinc-500">
            Not a member?
          </label>
          <button id="signup" className="font-medium text-blue-600">
            Sign up now
          </button>
        </div>
      </div>
      <div className=" hidden bg-gradient-to-br from-blue-600 to-white md:block"></div>
    </div>
  );
}
