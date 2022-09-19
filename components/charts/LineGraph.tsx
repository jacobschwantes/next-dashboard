import React from "react";
import dynamic from "next/dynamic";
import { DateTime } from "luxon";
import clsx from "clsx";
import { ApexOptions } from "apexcharts";
import { ArrowUpIcon } from "@heroicons/react/outline";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const series = [
  {
    name: "2019",
    data: [
      { x: "2022-09-18T19:05:38+0000", y: 150 },
      { x: "2022-09-19T19:05:38+0000", y: 25 },
      { x: "2022-09-20T19:05:38+0000", y: 100 },
      { x: "2022-09-21T19:05:38+0000", y: 255 },
      { x: "2022-09-22T19:05:38+0000", y: 100 },
      { x: "2022-09-23T19:05:38+0000", y: 50 },
    ],
  },
];

interface LineChartProps {
  dark: boolean;
  isLoading: boolean;
  seriesOption: string;
  data: { x: string; y: number }[];
  setData: React.Dispatch<React.SetStateAction<string>>;
}
export default function LineChart({
  dark,
  isLoading,
  seriesOption,
  data,
  setData,
}: LineChartProps) {
  const options: { options: ApexOptions; loadingOptions: ApexOptions } = {
    options: {
      colors: ["#6c95ff"],
      chart: {
        background: "transparent",
        zoom: {
          enabled: false,
        },

        toolbar: {
          show: false,
        },
        width: "100%",

        fontFamily: "font-family: Inter",
      },
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.5,
          opacityTo: 0,
          colorStops: [],
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "font-family: Inter",
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 1.5,
        dashArray: 0,
      },
      legend: {
        show: false,
      },
      grid: {

        show: true,
        strokeDashArray: 4,
        borderColor: "#f3f4f6",
      },
      yaxis: {
        labels: {
          offsetX: -15,
          show: true,
          align: "left",
          style: {
            colors: "#71717a",
            fontSize: "14px",
            fontFamily: "font-family: Inter",
            fontWeight: 400,
          },
        },
        tickAmount: 4,
      },
      markers: {
        size: 0,
        strokeWidth: 1.5,
        strokeOpacity: 1,
        strokeColors: "#3b82f6",
        colors: "#fff",
        fillOpacity: 0,
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
      },
      tooltip: {
        marker: {
          show: true,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="p-1.5 font-medium">' +
            "<span>" +
            series[seriesIndex][dataPointIndex] +
            "</span>" +
            "</div>"
          );
        },
      },
      xaxis: {
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        type: "category",
        axisTicks: {
          show: false,
        },
        
        axisBorder: {
          offsetY: -1,
          show: true,
          height: 1.75,
          color: "#f3f4f6",
        },
        labels: {
          offsetY: 3,
          
          
          formatter: function (value) {
            return DateTime.fromISO(value).toFormat("LLL d");
          },
          style: {
            colors: "#71717a",
            fontSize: "12px",
            fontFamily: "font-family: Inter",
            fontWeight: 400,
          },
        },
      },
    },
    loadingOptions: {
      colors: ["#27272a"],
      fill: {
        type: "solid",
        colors: ["#18181b"],
      },
      chart: {
        sparkline: {
          enabled: true,
        },
        background: "transparent",
        animations: {
          enabled: false,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 1,
        dashArray: 0,
      },
      tooltip: {
        enabled: false,
        marker: {
          show: false,
        },
      },
    },
  };

  const dataOptions = ["1w", "1m"];

  return isLoading ? (
    <div className="relative space-y-3 overflow-hidden rounded-2xl  border  border-gray-100 opacity-70 dark:border-zinc-900 dark:bg-black">
      <div className="space-y-3 p-5">
        <p className="h-4 w-1/2 rounded-full bg-zinc-900 sm:w-60"></p>
        <p className="h-3 w-1/4 rounded-full bg-zinc-900 sm:w-96"></p>
      </div>
      <div className="before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
        <div className=" ">
          <Chart
            options={options.loadingOptions}
            series={[
              {
                name: "Requests",
                data: [1.5, 3, 2, 3],
              },
            ]}
            type="area"
            height={450}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <span className="space-y-2">
          <h1 className=" flex items-center text-zinc-500">
            Active users
            <span className="ml-2 flex items-center rounded bg-lime-500 bg-opacity-30 px-1 py-0.5 text-sm text-lime-700">
              <ArrowUpIcon className="mr-1 h-4 rotate-45" /> 1.2%
            </span>
          </h1>
          <p className="text-2xl font-medium tracking-wider">1013</p>
        </span>
        <div className="flex space-x-3 text-sm text-zinc-100">
          {dataOptions.map((option, index) => (
            <button
              key={index}
              className={clsx(
                "uppercase transition-colors duration-300 ",
                seriesOption === option
                  ? "text-blue-500"
                  : "text-zinc-500 hover:text-zinc-700"
              )}
              onClick={() => setData(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <Chart
        options={options.options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
}
