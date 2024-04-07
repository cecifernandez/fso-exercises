import { useEffect, useState } from "react";
import getCountry from "./services/countries";
import CountryDetails from "./components/CountryDetails";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(search.toLowerCase())
  );

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
          <WeatherDetails capital={filteredCountries[0].capital} />
        </div>
      )}
    </>
  );
}

export default App;
