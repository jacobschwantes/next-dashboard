/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, XIcon, XCircleIcon } from "@heroicons/react/solid";

export default function Alert(props) {
  return (
    <div
      className={
        "rounded-md p-3" +
        (props.type === "error" ? " bg-red-50" : " bg-green-50")
      }
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {props.type === "error" ? (
            <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          ) : (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <p
            className={
              "text-sm font-medium " +
              (props.type === "error" ? " text-red-800" : " text-green-800")
            }
          >
            {props.message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
            onClick={() => props.setOpen(false)}
              type="button"
              className={"inline-flex  rounded-md p-1.5  focus:outline-none focus:ring-2 focus:ring-offset-2  " + (props.type === 'error' ? ' focus:ring-red-600 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 bg-red-50' : ' focus:ring-green-600 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 bg-green-50')}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
