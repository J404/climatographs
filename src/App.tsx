import React, { useEffect, useState } from "react";
import "./App.css";

import { ClimateData, getPrecipData } from "./climateAPI";

function App() {
  return (
    <div className="App">
      <div className="">Hello!</div>
      <button
        onClick={async () => console.log(await getPrecipData(1980, 1999, "usa"))}
      >Click</button>
    </div>
  );
}

export default App;
