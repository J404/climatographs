import { Chart } from 'chart.js';

export const makeChart = async (
  ctx: CanvasRenderingContext2D,
  precipData: number[],
  tempData: number[]
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [
        {
          label: 'Monthly Average Precipitation (mm)',
          yAxisID: 'P',
          data: precipData,
        },
        {
          type: 'line',
          label: 'Monthly Average Temperature (C)',
          yAxisID: 'T',
          data: tempData,
        },
      ],
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    },
    options: {
      scales: {
        yAxes: [
          {
            id: 'P',
            type: 'linear',
            position: 'left',
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              stepSize: 10,
            },
          },
          {
            id: 'T',
            type: 'linear',
            position: 'right',
            ticks: {
              suggestedMin: -15,
              suggestedMax: 25,
              stepSize: 5,
            },
          },
        ],
      },
    },
  });
};
