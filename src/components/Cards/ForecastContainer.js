// React + State
import React, { useState, useContext } from "react";
import { StoreContext } from "../../store/store";

// Components
import TimeForecast from "./TimeForecast";
import Spinner from "../General/Spinner/Spinner";

// Styling
import "./ForecastContainer.css";

const ForecastContainer = () => {
  let content, changeDays, timeForecast;
  const { state } = useContext(StoreContext);
  const [day, setDay] = useState(0);

  if (state.weatherData.length === 0 && !state.loading) {
    content = (
      <h2 className="heading-secondary">Please select your city and country</h2>
    );
  } else if (state.loading) {
    content = <Spinner />;
  } else if (!state.loading && state.error) {
    content = <h2 className="heading-secondary">{state.error}</h2>;
  } else if (state.weatherData.length !== 0 && !state.loading && !state.error) {
    changeDays = (
      <div className="day-selector">
        <div
          onClick={
            day === 0
              ? () => setDay(state.weatherData.length - 1)
              : () => setDay((prevDay) => prevDay - 1)
          }
        >
          <span>Previous</span>
        </div>
        <div
          onClick={
            day === state.weatherData.length - 1
              ? () => setDay(0)
              : () => setDay((prevDay) => prevDay + 1)
          }
        >
          <span>Next</span>
        </div>
      </div>
    );

    timeForecast = state.weatherData[day].map((time, i) => {
      return (
        <TimeForecast
          key={i}
          time={time.time}
          high={time.tempMax}
          low={time.tempMin}
          icon={time.weather[0].icon}
        />
      );
    });

    content = (
      <>
        <h2 className="heading-secondary">{state.weatherData[day][0].day}</h2>
        <div className="time-forecast-container">{timeForecast}</div>
        {changeDays}
      </>
    );
  }

  return <div className="forecast-container">{content}</div>;
};

export default ForecastContainer;
