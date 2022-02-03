import { useAnalytics } from "../lib/utils";
import {
  HomeIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import BarChartSparkline from "./BarChartSparkline";
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
    <div className="rounded-2xl   p-6  shadow-gray-100  flex justify-between items-center shadow-lg border-gray-100 border">
      <div className="space-y-3 flex flex-col">
        <span className="space-y-3">
          <h1 className=" font-semibold text-left text ">{props.title}</h1>
          <div className="flex space-x-2 items-center">
            {props.change < 0 ? (
              <TrendingDownIcon className="  h-6 w-6 bg-red-200 text-red-700 rounded-full p-1" />
            ) : (
              <TrendingUpIcon className="  h-6 w-6 bg-green-200 text-green-700 rounded-full p-1" />
            )}
            <span className=" font-semibold text-sm ">
              {(props.change > 0 ? "+" : "") + props.change.toFixed(1)}%
            </span>
          </div>
        </span>

        <h1 className="text-left text-4xl font-bold">
          <Value />
        </h1>
      </div>
      <BarChartSparkline theme={props.theme} />
    </div>
  );
}
