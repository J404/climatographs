import { Chart } from "chart.js";

export const makeChart = async (
  ctx: CanvasRenderingContext2D,
  precipData: number[],
  tempData: number[],
  ) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Monthly Average Precipitation (mm)',
        data: precipData,
      }, {
        type: 'line',
        label: 'Monthly Average Temperature (C)',
        data: tempData,
      }],
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 
      'J', 'A', 'S', 'O', 'N', 'D']
    }
  });
}