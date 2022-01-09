import React from "react";
import dynamic from 'next/dynamic'


const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
)

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "2019",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "2020",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],

      options: {
        theme: {
          monochrome: {
            enabled: true,
            color: '#1E3A8A',
            shadeTo: 'light',
            shadeIntensity: .65
          }
        },
        chart: {
          zoom: {
            enabled: false,
          },
          fontFamily: 
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
          
        },
        dataLabels: {
          enabled: false,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
       
          },
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Area Installed",
          align: "left",
          style: {
            fontSize: "20px",
            fontWeight: 600,
        
          },
        },
        subtitle: {
          text: "(+43%) than last year",
          align: "left",
          margin: 10,


          floating: false,
          style: {
            fontSize:  '16px',
            fontWeight:  'normal',
            color:  '#9699a2'
          },
        },

        legend: {
          position: "top",
          horizontalAlign: "right",
          offsetY: -20,
          fontSize: '14px',
          fontWeight: 600,
          
        },
        
        grid: {
          strokeDashArray: 3,
        },
        yaxis: {
          labels: {
            style: {
              colors:  '#9699a2',
              fontSize: "12px",
     
              fontWeight: 400,
             
            },
          }
        },
        xaxis: {
          labels: {
            style: {
              colors:  '#9699a2',
              fontSize: "12px",
     
              fontWeight: 400,
             
            },
          },
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    };
  }

  render() {
    return (
      <div className="rounded-2xl bg-gray-50 p-5 border   border-gray-200">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
