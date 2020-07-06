import React, { useState, useContext } from "react";
import { StoreContext } from "../../store/store";
import getWeather from "../../utils/getWeather";

const CitySearch = () => {
  // Global state
  const globalState = useContext(StoreContext);
  const { state, dispatch } = globalState;

  // Local state
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getWeather(city, country, dispatch);
      }}
    >
      <input
        required
        type="text"
        value={city}
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        required
        type="text"
        value={country}
        placeholder="Country"
        onChange={(e) => setCountry(e.target.value)}
      />
      <button type="submit" disabled={state.loading}>
        Submit
      </button>
    </form>
  );
};

export default CitySearch;
