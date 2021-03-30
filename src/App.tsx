import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface APIResponse {
  monthVals: [number];
}

function App() {
  const [data, updateData] = useState([] as unknown as [APIResponse]);
  
  useEffect(() => {
    async function callAPI() {
      const response = await fetch('http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/pr/1980/1999/usa');
      const climateData: [APIResponse] = await response.json();

      updateData(climateData);
    }

    callAPI();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Weather data:</p>
        {
          data.map(item => {
            return item.monthVals.map(monthval => {
              return <span>{monthval}</span>
            })
          })
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
