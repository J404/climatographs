import { useEffect, useRef, useState } from 'react';
import './App.css';

import { makeChart } from './climatograph';

import { ClimateData, getClimateData } from './climateAPI';

function App() {
  const [climateData, setClimateData] = useState<ClimateData>(
    ({} as unknown) as ClimateData
  );
  const chartCanvas = useRef<HTMLCanvasElement>(null);

  const didMount = useRef(false);

  useEffect(() => {
    // Skip initial mount - no data to use
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    showChart(climateData.precipData.monthVals, climateData.tempData.monthVals);
  }, [climateData]);

  const updateData = async () => {
    const newData = await getClimateData(1980, 1999, 'bra');
    setClimateData(newData);
  };

  const showChart = (precipData: number[], tempData: number[]) => {
    const ctx = ((chartCanvas.current as unknown) as HTMLCanvasElement)
      .getContext('2d') as CanvasRenderingContext2D;

    makeChart(ctx, precipData, tempData);
  };

  return (
    <div className="App">
      <div className="">Hello!</div>
      <button onClick={async () => await updateData()}>Click</button>
      <canvas className="w-5/6" ref={chartCanvas}></canvas>
    </div>
  );
}

export default App;
