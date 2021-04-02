import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { makeChart } from "./climatograph";

import { ClimateData, getClimateData } from "./climateAPI";

function App() {
  const chartCanvas = useRef<HTMLCanvasElement>(null);

  const showChart = () => {
    const ctx = (chartCanvas.current as unknown as HTMLCanvasElement)
      .getContext('2d') as CanvasRenderingContext2D;

    makeChart(ctx);
  }

  return (
    <div className="App">
      <div className="">Hello!</div>
      <button
        onClick={async () => await showChart()}
      >Click</button>
      <canvas ref={chartCanvas}></canvas>
    </div>
  );
}

export default App;
