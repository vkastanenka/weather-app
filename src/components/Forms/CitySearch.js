// React + State
import React, { useState, useContext } from "react";
// import { useEffect } from 'react';
import { StoreContext } from "../../store/store";

// Utilities
import getWeather from "../../utils/getWeather";

// Styling
import "./CitySearch.css";

const CitySearch = () => {
  // Global state
  const globalState = useContext(StoreContext);
  const { state, dispatch } = globalState;

  // Local state
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // For testing purposes
  // useEffect(() => {
  //   getWeather('Toronto', 'Canada', dispatch);
  // }, []);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        getWeather(city, country, dispatch);
      }}
    >
      <input
        className="form__input"
        required
        type="text"
        value={city}
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        className="form__input"
        required
        type="text"
        value={country}
        placeholder="Country"
        onChange={(e) => setCountry(e.target.value)}
      />
      <button className="btn" type="submit" disabled={state.loading}>
        Submit
      </button>
    </form>
  );
};

export default CitySearch;
