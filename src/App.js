// React
import React from "react";
import "./App.css";

// Components
import { StateProvider } from "./store/store";
import CitySearch from "./components/Forms/CitySearch";
import ForecastContainer from "./components/Cards/ForecastContainer";

function App() {
  return (
    <StateProvider>
      <div className="app">
        <header className="header">
          <h1 className="heading-primary">Victoria's 5 Day Weather Forecast</h1>
        </header>
        <ForecastContainer />
        <CitySearch />
      </div>
    </StateProvider>
  );
}

export default App;
