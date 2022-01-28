import { HomeIcon, TrendingDownIcon, TrendingUpIcon } from "@heroicons/react/solid";
const numeral = require('numeral');
export default function MetricsCard(props) {
  return (
    <div className="rounded-2xl  bg-gray-50 p-6 border   border-gray-200 space-y-2 flex lg:flex-col items-center justify-between lg:items-start ">
    <span>
      <h1 className=" font-semibold text-left text">{props.title}</h1>
      <div className="flex space-x-2 items-center">
      {props.change < 0 ? <TrendingDownIcon className="  h-6 w-6 bg-red-200 text-red-700 rounded-full p-1" /> : <TrendingUpIcon className="  h-6 w-6 bg-green-200 text-green-700 rounded-full p-1"/>}
      <span className=" font-semibold text-sm ">{props.change.toFixed(1)}%</span></div></span>
     
      <h1 className="text-left text-4xl font-bold">{props.count ? props.type === 'count' ? numeral(props.count).format('0,0') : numeral(props.count).format('00:00:00') : <span className=" animate-pulse">1,234</span>}</h1>
    </div>
  );
}

