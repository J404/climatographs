import { useEffect, useRef, useState } from 'react';
import './App.css';

import { makeChart } from './climatograph';

import { ClimateData, getClimateData } from './climateAPI';
import countryCodes from './countryISO';

function App() {
  const [climateData, setClimateData] = useState<ClimateData>(
    ({} as unknown) as ClimateData
  );
  const [loading, setLoading] = useState(false);
  const chartCanvas = useRef<HTMLCanvasElement>(null);
  const countrySelect = useRef<HTMLSelectElement>(null);

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
    if (loading) return;

    const country = ((countrySelect.current as unknown) as HTMLSelectElement)
      .value;
    const iso3 = countryCodes[country];

    setLoading(true);

    const newData = await getClimateData(1980, 1999, iso3);
    setClimateData(newData);

    setLoading(false);
  };

  const showChart = (precipData: number[], tempData: number[]) => {
    const ctx = ((chartCanvas.current as unknown) as HTMLCanvasElement).getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    makeChart(ctx, precipData, tempData);
  };

  return (
    <div className="App">
      <h2 className="text-5xl p-8">Climatograph Generator</h2>
      Pick the country:
      <br></br>
      <select className="bg-gray-800 rounded-md p-2 my-4" ref={countrySelect}>
        {Object.keys(countryCodes).map((country, i) => (
          <option key={i}>{country}</option>
        ))}
      </select>
      <br></br>
      <button
        className={
          'border-gray-800 border-2 p-3 rounded-md ' +
          'hover:bg-gray-800 transition ease-in-out'
        }
        onClick={async () => await updateData()}
      >
        Generate Climatograph
      </button>
      <br></br>
      {loading ? (
        <div className="animate-spin text-3xl mt-2 w-4 mx-auto">🌩️</div>
      ) : (
        <div className='text-3xl mt-2 h-7 w-4 mx-auto'></div>
      )}
      <div className="w-3/4 mx-auto my-4 overflow-x-auto">
        <canvas ref={chartCanvas}></canvas>
      </div>
    </div>
  );
}

export default App;
