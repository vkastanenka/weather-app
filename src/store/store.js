// React
import React, { createContext, useReducer } from "react";

// Create the initial state
const initialState = {
  loading: false,
  weatherData: [],
  error: "",
};

// Create the context
const StoreContext = createContext();

// Create the reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LOAD":
      return {
        ...state,
        loading: true,
      };

    case "FETCH_WEATHER_SUCCESS":
      console.log(action.weatherData);
      return {
        loading: false,
        city: action.city,
        weatherData: action.weatherData,
        error: "",
      };

    case "FETCH_WEATHER_FAIL":
      return {
        loading: false,
        weatherData: [],
        error: "Error obtaining weather data!",
      };

    case "NO_COUNTRY":
      return {
        loading: false,
        weatherData: [],
        error: "Unknown country inputted!",
      };

    case "NO_CITY":
      return {
        loading: false,
        weatherData: [],
        error: "Unknown city inputted!",
      };

    default:
      return state;
  }
};

// Create the HOC
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StateProvider };
