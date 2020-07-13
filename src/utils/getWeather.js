import axios from "axios";
import nestArrays from "./nestArrays";
import datesList from "../data/dates.json";
import citiesList from "../data/cities.json";
import countriesList from "../data/countries.json";

const getWeather = async (city, country, dispatch) => {
  // Set loading
  dispatch({ type: "FETCH_LOAD" });

  // Find country
  const countryData = countriesList.filter(
    (countryItem) => countryItem.name.toLowerCase() === country.toLowerCase()
  );

  // If no country found, send error
  if (!countryData.length) {
    dispatch({ type: "NO_COUNTRY" });
    return;
  }

  // Get country alpha2
  const alpha2 = countryData[0]["alpha-2"];

  // Find city data that includes the id
  // eslint-disable-next-line
  const cityData = citiesList.filter((cityItem) => {
    if (
      cityItem.country === alpha2 &&
      cityItem.name.toLowerCase() === city.toLowerCase()
    ) {
      return true;
    }
  });

  // If no city found, send error
  if (!cityData.length) {
    dispatch({ type: "NO_CITY" });
    return;
  }

  // Axios request
  try {
    const data = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${cityData[0].id}&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );

    // Add day of the week to data object
    const dataDaysDates = data.data.list.map((item) => {
      const newDate = new Date(item.dt_txt);
      item.day = datesList[newDate.getDay()];
      item.hours = newDate.getHours();
      item.time = `${item.hours}:00`;
      item.tempMax = (Number(item.main.temp_max) - 273.15).toFixed(2);
      item.tempMin = (Number(item.main.temp_min) - 273.15).toFixed(2);
      return item;
    });

    // Sort hourly data by day
    const sortedData = nestArrays(dataDaysDates, "day");

    // Dispatch sorted data
    dispatch({
      type: "FETCH_WEATHER_SUCCESS",
      weatherData: sortedData,
    });
  } catch (err) {
    dispatch({ type: "FETCH_WEATHER_FAIL" });
  }
};

export default getWeather;
