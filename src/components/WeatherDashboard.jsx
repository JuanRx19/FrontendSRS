import "../assets/styles/WeatherDashboard.css";
import React, { useEffect, useState } from 'react';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    if (weatherData) {
      const localTimeString = weatherData.location.localtime;
      const initialTime = new Date(localTimeString);

      const timer = setInterval(() => {
        setLocalTime((prevTime) => new Date(prevTime.getTime() + 1000)); // Avanza 1 segundo
      }, 1000);

      setLocalTime(initialTime);

      return () => clearInterval(timer); 
    }
  }, [weatherData]);

  
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
  }, []);
  
  if (loading) {
    return <div className="weather-dashboard-container">Cargando datos meteorológicos...</div>;
  }

  if (!weatherData) {
    return <div className="weather-dashboard-container">Error al cargar los datos.</div>;
  }

  const { location, current, forecast } = weatherData;

  return (
    <div className="weather-dashboard-container">
      
      <section className="main-info">

      <div className="location-widget">
        <h1>{weatherData.location.name}</h1>
        <p>{localTime.toLocaleTimeString()}</p> 
        <p>{localTime.toLocaleDateString()}</p> 
      </div>


      <div className="middle-widget">
        <img
          src={`https:${weatherData.current.condition.icon}`} 
          alt={weatherData.current.condition.text} 
        />
      </div>


      <div className="weather-widget">
        <h2>{weatherData.current.temp_c}°C</h2>
        <p>Sensasión térmica: {weatherData.current.feelslike_c}°C</p>
        <div className="weather-details">
          <p>Humedad: {weatherData.current.humidity}%</p>
          <p>Velocidad del viento: {weatherData.current.wind_kph} km/h</p>
          <p>Presión: {weatherData.current.pressure_mb} hPa</p>
        </div>
        <div className="sun-times">
          <p>Amanecer: {weatherData.forecast.forecastday[0].astro.sunrise}</p>
          <p>Atardecer: {weatherData.forecast.forecastday[0].astro.sunset}</p>
        </div>
      </div>
    </section>

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
