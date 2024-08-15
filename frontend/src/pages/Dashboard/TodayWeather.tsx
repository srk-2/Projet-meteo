import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './TodayWeather.css';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
  wind: { speed: number };
}

const TodayWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [precipitationProbability, setPrecipitationProbability] = useState<number | null>(null);
  const [soilTemperature, setSoilTemperature] = useState<number | null>(null);
  const [soilMoisture, setSoilMoisture] = useState<number | null>(null);
  const [windDirection, setWindDirection] = useState<number | null>(null);

  const apiKey = '86979e78b0ef32cc147c5570459b9098';
  const latitude = 6.385992;
  const longitude = 1.243624;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`
        );
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo :', error);
      }
    };

    const fetchOpenMeteoData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_direction_10m,soil_temperature_6cm,soil_moisture_3_to_9cm&daily=uv_index_max,precipitation_probability_max&wind_speed_unit=ms&timezone=GMT&forecast_days=1`
        );
        const data = await response.json();
        setUvIndex(data.daily.uv_index_max[0]);
        setPrecipitationProbability(data.daily.precipitation_probability_max[0]);
        setSoilTemperature(data.hourly.soil_temperature_6cm[0]);
        setSoilMoisture(data.hourly.soil_moisture_3_to_9cm[0]);
        setWindDirection(data.hourly.wind_direction_10m[0]);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de Open Meteo :', error);
      }
    };

    fetchWeatherData();
    fetchOpenMeteoData();
  }, []);

  const getIconClassForWeather = (description: string, hour: number): string => {
    if (hour >= 19 || hour < 6) {
     
      if (description.includes('lune')) return 'bi bi-cloud-moon';
      return 'bi bi-cloud-moon';
    } else {
      
      if (description.includes('légère pluie')) return 'bi bi-cloud-drizzle';
      if (description.includes('pluie')) return 'bi bi-cloud-rain';
      if (description.includes('soleil')) return 'bi bi-cloud-sun';
      if (description.includes('nuage')) return 'bi bi-clouds';
      return 'bi bi-cloud'; 
    }
  };

  if (!weatherData) {
    return <div>Chargement...</div>;
  }

  const currentHour = new Date().getHours();
  const iconClass = getIconClassForWeather(weatherData.weather[0].description, currentHour);

  return (
    <div className="today-weather">
      <div className="weather-header">
        <h2>Maintenant</h2>
        <div className={`weather-icon ${iconClass}`} />
      </div>
      <div className="weather-details">
        <div>Température de l'air: {`${Math.round(weatherData.main.temp)}°C`}</div>
        <div>Humidité: {`${weatherData.main.humidity}%`}</div>
        <div>Vitesse du vent: {`${weatherData.wind.speed} m/s`}</div>
        <div>Précipitations: {precipitationProbability !== null ? `${precipitationProbability}%` : 'Chargement...'}</div>
        <div>Rayonnement solaire: {uvIndex !== null ? uvIndex : 'Chargement...'}</div>
        <div>Température du sol: {soilTemperature !== null ? `${soilTemperature}°C` : 'Chargement...'}</div>
        <div>Humidité du sol: {soilMoisture !== null ? `${soilMoisture} m³/m³` : 'Chargement...'}</div>
        <div>Direction du vent: {windDirection !== null ? `${windDirection}°` : 'Chargement...'}</div>
      </div>
    </div>
  );
};

export default TodayWeather;
