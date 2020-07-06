import axios from "axios";
import citiesList from "../data/cities.json";
import countriesList from "../data/countries.json";

const getWeather = async (city, country, dispatch) => {
  // Set loading
  dispatch({ type: "FETCH_LOAD" });

  // Find country
  const countryData = countriesList.filter(
    (countryItem) => countryItem.name.toLowerCase() === country.toLowerCase()
  );

  // Get country alpha2
  const alpha2 = countryData[0]["alpha-2"];

  // Find city data that includes the id
  const cityData = citiesList.filter((cityItem) => {
    if (
      cityItem.country === alpha2 &&
      cityItem.name.toLowerCase() === city.toLowerCase()
    ) {
      return true;
    }
  });

  // Axios request
  try {
    const data = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${cityData[0].id}&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    dispatch({ type: "FETCH_WEATHER_SUCCESS", city: data.data.city });
  } catch (err) {
    dispatch({ type: "FETCH_WEATHER_FAIL" });
  }
};

export default getWeather;
