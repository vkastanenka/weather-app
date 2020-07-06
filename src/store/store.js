// React
import React, { createContext, useReducer } from "react";

// State and context
const initialState = {
  loading: false,
  city: {},
  weather: [],
  error: "",
};

const StoreContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LOAD":
      return {
        ...state,
        loading: true,
      };

    case "FETCH_WEATHER_SUCCESS":
      return {
        loading: false,
        city: action.city,
        weather: {},
        error: "",
      };

    case "FETCH_WEATHER_FAIL":
      return {
        loading: false,
        city: {},
        weather: {},
        error: "Error obtaining weather data!",
      };

    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StateProvider };
