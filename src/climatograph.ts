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
          backgroundColor: 'rgba(70, 135, 240, 0.5)',
          yAxisID: 'P',
          data: precipData,
          order: 2,
        },
        {
          type: 'line',
          label: 'Monthly Average Temperature (C)',
          backgroundColor: 'rgba(230, 90, 44, 0.5)',
          yAxisID: 'T',
          data: tempData,
          order: 1,
        },
      ],
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
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
