import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const api_key = import.meta.env.VITE_API_KEY;

const getWeather = (city) => {
  const request = axios.get(baseUrl + city + `${"&appid=" + api_key}`);
  return request;
};

export default getWeather;
