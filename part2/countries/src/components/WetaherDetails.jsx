const WeatherDetails = ({ weather, getWeatherIconUrl }) => {
  return (
    <div>
      <h2>Weather</h2>
      <p>Temperature: {weather.main.temp}</p>
      {weather.weather[0].icon && (
        <img
          src={getWeatherIconUrl(weather.weather[0].icon)}
          alt="Weather Icon"
        />
      )}
    </div>
  );
};

export default WeatherDetails;
