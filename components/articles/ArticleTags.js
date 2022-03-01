export default function ArticleTags(props) {
  return (
    <div className="flex flex-wrap items-center space-x-1">
      {props.tags.map((tag) => {
        return (
          <div className=" my-1 flex-col items-center justify-center   rounded-full  bg-blue-100 py-0.5 px-2 text-sm font-medium text-blue-700 dark:bg-blue-700 dark:bg-opacity-25 dark:text-blue-400">
            {tag}
          </div>
        );
      })}
    </div>
  );
}
