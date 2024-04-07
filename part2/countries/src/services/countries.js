import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountry = () => {
  const request = axios.get(baseUrl);
  return request;
};

export default getCountry;
