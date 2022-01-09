import React from "react";
import dynamic from 'next/dynamic'
const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
)
const numeral = require("numeral");

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [1020, 22559, 33367, 20083],
      options: {
        theme: {
            monochrome: {
              enabled: true,
              color: '#1E3A8A',
              shadeTo: 'light',
              shadeIntensity: .85
            }
          },
        tooltip: {
            fillSeriesColor: false,
            y: {
              formatter: (seriesName) => numeral(seriesName).format('0,0'),
              title: {
                formatter: (seriesName) => `${seriesName}`
              }
            }
          },

        chart: {
          height: 350,
          type: "donut",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
        },
        title: {
          text: "Downloads",
          align: "left",
          style: {
            fontSize: "20px",
            fontWeight: 600,
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "90%",
              labels: {
                
                show: true,
                name: {
                    
                  fontSize: "22px",
                  fontWeight: 600,
                },
                value: {
                    formatter: (value) => numeral(value).format('0,0'),
                  fontSize: "28px",
                  fontWeight: 600,
                },
                total: {
                  show: true,
                  color:  '#737373',
                  label: "Total",
                  fontWeight: 600,
                  fontSize: "16px",
                  formatter: function (w) {
                    return numeral(
                      w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0)
                    ).format("0,0");
                  },
                },
              },
            },
          },
        },
        legend: {
        fontWeight:600,
          position: "bottom",
          itemMargin: {
            horizontal: 10,
            vertical: 0
          }
        },
        labels: ["Apples", "Oranges", "Bananas", "Berries"],
      },
    };
  }

  render() {
    return (
      <div className="rounded-2xl  bg-gray-50 p-5 border   border-gray-200">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={375}
        />
      </div>
    );
  }
}
