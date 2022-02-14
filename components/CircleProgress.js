import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [67],
      options: {
        chart: {
          height: 280,
          type: "radialBar",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1000,
            dynamicAnimation: {
              enabled: true,
              speed: 1000,
            },
          },
        },

        colors: ["#20E647"],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%",
            },

            dataLabels: {
              value: {
                fontFamily:
                  'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
                offsetY: 5,
                color: "#4b5563",
                fontSize: "3rem",
                show: true,
                fontWeight: 600,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 1,

            colorStops: [
              {
                offset: 0,
                color: "#0369a1",
                opacity: 1,
              },
              {
                offset: 100,
                color: "#5b21b6",
                opacity: 1,
              },
            ],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: [""],
      },
    };
  }

  render() {
    return (
      <div className="">
        <Chart
          series={this.state.series}
          options={this.state.options}
          type="radialBar"
          height={350}
        />
      </div>
    );
  }
}
