import { useState, useEffect } from "react";
import axios from "axios";

const useWeatherData = (capital) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const baseUrl = "http://api.weatherapi.com/v1/current.json";
    const api_key = import.meta.env.VITE_API_KEY;

    axios
      .get(`${baseUrl}?key=${api_key}&q=${capital}&aqi=yes`)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }, [capital]);

  return weather;
};

const WeatherDetails = ({ capital }) => {
  const weather = useWeatherData(capital);

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.current.temp_c}</p>
      {weather.current.condition.icon && (
        <img src={weather.current.condition.icon} alt="Weather Icon" />
      )}
    </div>
  );
};

export default WeatherDetails;
