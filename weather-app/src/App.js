import React, { useState } from 'react';
import './App.css';

const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(`${url}?q=${city}&appid=${apiKey}&units=metric`);
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>🌤️ Simple Weather App</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].main}</p>
          <p>{Math.round(weather.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;
