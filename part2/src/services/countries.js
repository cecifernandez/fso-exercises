import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountry = () => {
  const request = axios.get(baseUrl);
  // const nonExisting = {
  //   id: 10000,
  //   content: "This country is not saved to server",
  // };
  return request;
  // .then((response) => [...response.data, nonExisting]);
};

export default getCountry;
