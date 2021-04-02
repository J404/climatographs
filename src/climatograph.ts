import { Chart } from "chart.js";

export const makeChart = async (ctx: CanvasRenderingContext2D) => {
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Monthly Average Precipitation (mm)',
        data: [0, 10, 20, 30, 40],
      }, {
        type: 'line',
        label: 'Monthly Average Temperature (C)',
        data: [5, 7, 6, 12, 15],
      }],
      labels: ['J', 'F', 'M', 'A', 'M']
    }
  });
}