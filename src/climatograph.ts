import { Chart, ChartDataSets } from 'chart.js';

let myChart: Chart;

export const makeChart = async (
  ctx: CanvasRenderingContext2D,
  precipData: number[],
  tempData: number[]
) => {
  // update chart's data if it exists already
  if (myChart) {
    ((myChart.data
      .datasets as unknown) as ChartDataSets[])[0].data = precipData;

    ((myChart.data.datasets as unknown) as ChartDataSets[])[1].data = tempData;

    myChart.update();

    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  myChart = new Chart(ctx, {
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
            scaleLabel: {
              display: true,
              labelString: 'Monthly Average Precipitation (mm)',
            },
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
            scaleLabel: {
              display: true,
              labelString: 'Monthly Average Temperature (C)',
            },
            ticks: {
              suggestedMin: -15,
              suggestedMax: 25,
              stepSize: 5,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Month',
            },
          },
        ],
      },
    },
  });
};
