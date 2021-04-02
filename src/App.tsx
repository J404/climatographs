import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { Chart } from "chart.js";

import { ClimateData, getClimateData } from "./climateAPI";

function App() {
  const chartCanvas = useRef<HTMLCanvasElement>(null);

  const makeChart = async () => {
    const ctx = (chartCanvas.current as unknown as HTMLCanvasElement)
      .getContext('2d') as CanvasRenderingContext2D;
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

  return (
    <div className="App">
      <div className="">Hello!</div>
      <button
        onClick={async () => await makeChart()}
      >Click</button>
      <canvas ref={chartCanvas}></canvas>
    </div>
  );
}

export default App;
