import "../assets/styles/WeatherDashboard.css";
import React, { useEffect, useState } from 'react';


const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "ee72b79671ad48a18a7233800241711";
  const CITY = "Cali";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=5`
        );
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };
  
    fetchWeather();
  }, []); // Asegúrate de incluir un array vacío para evitar bucles infinitos
  
  if (loading) {
    return <div className="weather-dashboard-container">Cargando datos meteorológicos...</div>;
  }

  if (!weatherData) {
    return <div className="weather-dashboard-container">Error al cargar los datos.</div>;
  }

  // Extraer datos necesarios de la API
  const { location, current, forecast } = weatherData;

  return (
    <div className="weather-dashboard-container">
      
      <div className="main-info">
        <div className="location-time">
          <h2>{location.name}</h2>
          <p>{new Date(location.localtime).toLocaleTimeString()}</p>
          <p>{new Date(location.localtime).toLocaleDateString()}</p>
        </div>
        <div className="weather-info">
          <h1>{current.temp_c}°C</h1>
          <p>Sensasión térmica: {current.feelslike_c}°C</p>
          <div className="details">
            <p>Humedad: {current.humidity}%</p>
            <p>Velocidad del viento: {current.wind_kph} km/h</p>
            <p>Presión: {current.pressure_mb} hPa</p>
          </div>
          <div className="sun-info">
            <p>Amanecer: {forecast.forecastday[0].astro.sunrise}</p>
            <p>Atardecer: {forecast.forecastday[0].astro.sunset}</p>
          </div>
        </div>
      </div>

      <div className="forecast">
        <div className="five-day-forecast">
          <h3>Pronóstico de 5 días:</h3>
          <div className="forecast-cards">
            {forecast.forecastday.map((day) => (
              <div className="forecast-card" key={day.date}>
                <p>{day.day.avgtemp_c}°C</p>
                <p>{new Date(day.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hourly-forecast">
          <h3>Pronóstico por horas:</h3>
          <div className="hourly-cards">
            {forecast.forecastday[0].hour.map((hour, index) => (
              <div className="hourly-card" key={index}>
                <p>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>{hour.temp_c}°C</p>
                <p>{hour.wind_kph} km/h</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
