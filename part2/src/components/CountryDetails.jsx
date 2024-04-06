const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Languages: {Object.values(country.languages).join(", ")}</p>
      <img
        src={country.flags.svg}
        alt="Flag"
        style={{ width: "300px", height: "auto" }}
      />
    </div>
  );
};

export default CountryDetails;
