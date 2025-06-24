import React, { useState } from 'react';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    setWeather(null);
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        setError('City not found.');
        return;
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError('Error fetching weather data.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Weather Forecast</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={e => setCity(e.target.value)}
        style={{ width: '70%', padding: 8, marginRight: 8 }}
      />
      <button onClick={fetchWeather} style={{ padding: 8 }}>Get Weather</button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {weather && (
        <div style={{ marginTop: 20 }}>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}