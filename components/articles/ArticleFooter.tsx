import { LinkIcon, StarIcon } from "@heroicons/react/outline";
import { ExternalLinkIcon } from "@heroicons/react/solid";

export default function ArticleFooter(props) {
  return (
    <div className="flex items-center justify-between  font-medium text-gray-500">
      <span className=" flex items-center space-x-3">
        <h1 className="uppercase tracking-wider text-blue-500">
          by {props.author}
        </h1>
        <h1 className="text-sm">|</h1> <h1>{props.date}</h1>
      </span>
      <span className="flex items-center space-x-2">
        <h1>{props.readTime} min</h1>
        <button
          className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href={props.url}
          target="_blank"
          rel="noreferrer"
        >
          <StarIcon className=" h-5" />
        </button>
        <a
          className="rounded-lg border-2 border-gray-200 p-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href={props.url}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLinkIcon className=" h-5" />
        </a>{" "}
      </span>
    </div>
  );
}
