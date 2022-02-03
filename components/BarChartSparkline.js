import React from "react";
import dynamic from 'next/dynamic'
const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
)
const numeral = require("numeral");

export default class BarChartSparkline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options : {
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                return '<div class=" p-1 rounded-full text-xs">' +
                  '<span class="rounded-full font-semibold">' + series[seriesIndex][dataPointIndex] + '</span>' +
                  '</div>'
              },
            enabled: true,
            
            
        
        }
        
        
,      
        theme: {
            mode: 'light', 
            palette: this.props.theme, 
            monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        },
        
        chart: {
            sparkline:{
                enabled: 'true',
            },
          type: 'bar'
        },
        plotOptions: {
          bar: {
              borderRadius: 2,
          }
        },
        series: [{
          data: [{
            x: 'category A',
            y: 34
          }, {
            x: 'category B',
            y: 27
          }, {
            x: 'category C',
            y: 47
          },{
            x: 'category D',
            y: 34
          },
          {
            x: 'category E',
            y: 36
          },
          {
            x: 'category F',
            y: 16
          },{
            x: 'category G',
            y: 22
          },{
            x: 'category H',
            y: 59
          },{
            x: 'category I',
            y: 29
          },
          {
            x: 'category I',
            y: 23
          },
          
        ]
        }]
      }
    }
  }

  render() {
    return (
     
        <Chart
          options={this.state.options}
        series={this.state.options.series}
        type={'bar'}
          width={60}
        />
    
    );
  }
}