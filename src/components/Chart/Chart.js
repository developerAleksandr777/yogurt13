import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import moment from 'moment';



const ChartGr = ({chartCrud}) => {
    const currentMonth = moment().format('MMMM');
    // const currentDay = moment().date();


    const barChartData = {
        labels: [currentMonth],
        datasets: [
          {
            data: [chartCrud.crudsTrue?.length],
            label: "Completed",
            borderColor: "#3333ff",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            fill: true
          },
          {
            data: [chartCrud.crudsFalse?.length],
            label: "Not completed",
            borderColor: "#ff3333",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true
          }
        ]
      };

  return (
    <Bar
    type="bar"
    width={130}
    height={100}
    options={{
      title: {
        display: true,
        text: "Completed crud",
        fontSize: 20
      },
      legend: {
        display: true,  
        position: "bottom" 
      }
    }}
    data={barChartData}
  />
);
  
};

export default ChartGr;


