import { useAnalytics } from "../lib/utils";
import {
  HomeIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
const numeral = require("numeral");

export default function MetricsCard(props) {
  function Value() {
    const { report, isLoading, isError } = useAnalytics();

    if (isLoading) return <span className=" animate-pulse">1,234</span>;
    if (isError) return <span className=" text-red-600 ">err</span>;
    return props.type === "count"
      ? numeral(report[props.value]).format("0,0")
      : numeral(report[props.value]).format("00:00:00");
  }

  return (
    <div className="rounded-2xl  bg-gray-50 p-6 border shadow-gray-100  border-gray-200 space-y-2 flex lg:flex-col items-center justify-between lg:items-start shadow-lg">
    <span className="space-y-2">
        <h1 className=" font-semibold text-left text ">{props.title}</h1>
        <div className="flex space-x-2 items-center">
          {props.change < 0 ? (
            <TrendingDownIcon className="  h-6 w-6 bg-red-200 text-red-700 rounded-full p-1" />
          ) : (
            <TrendingUpIcon className="  h-6 w-6 bg-green-200 text-green-700 rounded-full p-1" />
          )}
          <span className=" font-semibold text-sm ">
            {(props.change > 0 ? '+' : '') + props.change.toFixed(1)}%
          </span>
        </div>
  </span>

      <h1 className="text-left text-4xl font-bold">
        <Value />
      </h1>
    </div>
  );
}
