import { useEffect, useState } from "react";
import getCountry from "./services/countries";
import CountryDetails from "./components/CountryDetails";
import getWeather from "./services/weather";
import WeatherDetails from "./components/WetaherDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getCountry(search)
      .then((data) => setCountries(data.data))
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setShowDetails(false);
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    setShowDetails(true);

    getWeather(country.capital)
      .then((data) => setWeather(data.data))
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(search.toLowerCase())
  );

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <>
      <div>
        <h1>Find countries</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search country..."
        />
        {console.log(filteredCountries)}
        {filteredCountries.length <= 10 && filteredCountries.length != 1 && (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.name}>
                {country.name.common}
                <button onClick={() => handleShowDetails(country)}>
                  Show Details
                </button>
              </li>
            ))}
          </ul>
        )}
        {filteredCountries.length > 10 && (
          <p>Too many results. Please specify your search.</p>
        )}
      </div>
      {showDetails && <CountryDetails country={selectedCountry} />}
      {filteredCountries.length === 1 && (
        <div>
          <CountryDetails country={filteredCountries[0]} />
          <WeatherDetails
            weather={weather}
            getWeatherIconUrl={getWeatherIconUrl}
          />
        </div>
      )}
    </>
  );
}

export default App;
