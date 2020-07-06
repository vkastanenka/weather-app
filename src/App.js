// React
import React from "react";
import "./App.css";

// Components
import { StateProvider } from "./store/store";
import CitySearch from "./components/Forms/CitySearch";

// Utilities
export const WeatherContext = React.createContext();

function App() {
  return (
    <StateProvider>
      <div className="App">
        <CitySearch />
      </div>
    </StateProvider>
  );
}

export default App;
