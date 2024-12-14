import './App.css';
import { useEffect, useState } from 'react';

function App() { 
  const [search, setSearch] = useState("Kurunegala");
  const [city, setCity] = useState(null);

  const getWeatherData = async () => {
    // Make sure to use the actual API key without curly braces
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=fd3b07e6b4c9c4c646717e8652a3e35a`);
    let result = await response.json();
    setCity(result);
  };

  // Trigger the API call whenever the `search` value changes
  useEffect(() => {
    getWeatherData();
  }, [search]);

  // Function to convert temperature from Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2); // Convert and round to two decimal places
  };

  return (
    <div className="App">
      {/* Intro Section */}
      <div className="intro">
        <h1>WeatherApp</h1>
        <p>Get real-time weather updates for any city around the world!</p>
      </div>

      {/* Weather Card */}
      <div className="weather-card">
        <div className="search">
          <input 
            type="search" 
            placeholder="Enter city name" 
            spellCheck="false" 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className="weather">
          <img 
            className="weather-icon" 
            src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png" 
            alt="weather icon"
          />
          <h1 className="temp">
            {city?.main?.temp ? `${kelvinToCelsius(city.main.temp)}°C` : "Loading..."}
          </h1>
          <h2 className="city">{city?.name || "City Name"}</h2>
          <div className="details">
            <div style={{ display: 'flex' }} className="col">
              <img 
                className="humi" 
                src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png" 
                alt="humidity icon"
              />
              <div className="info">
                <p className="humidity">{city?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/136/136712.png" 
                alt="wind icon"
              />
              <div className="info">
                <p className="wind">{city?.wind?.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
