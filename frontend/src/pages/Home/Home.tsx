import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { WeatherData } from './types';

interface HourlyData {
  time: string;
  temperature: string;
  iconClass: string;
}

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyTemps, setHourlyTemps] = useState<number[]>([]);
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [precipitationProbability, setPrecipitationProbability] = useState<number | null>(null);
  const [soilTemperature, setSoilTemperature] = useState<number | null>(null);
  const [soilMoisture, setSoilMoisture] = useState<number | null>(null);
  const [windDirection, setWindDirection] = useState<number | null>(null);

  const navigate = useNavigate();
  const currentHour = new Date().getHours();
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
        setHourlyTemps(data.hourly.temperature_2m);
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

  const getIconClassForWeather = (description: string): string => {
    if (description.includes('drizzle')) return 'bi bi-cloud-drizzle-fill';
    if (description.includes('rain')) return 'bi bi-cloud-rain-fill';
    if (description.includes('sun')) return 'bi bi-cloud-sun-fill';
    if (description.includes('moon')) return 'bi bi-cloud-moon-fill';
    if (description.includes('clouds')) return 'bi bi-clouds-fill';
    return 'bi bi-cloud-fill'; 
  };

  const getIconClassForTemperature = (temperature: number, hour: number): string => {
    if (hour >= 19 || hour < 6) {
      return 'bi bi-cloud-moon-fill'; 
    }

    if (temperature < 0) return 'bi bi-cloud-fill'; 
    if (temperature < 10) return 'bi bi-cloud-sun-fill'; 
    if (temperature < 20) return 'bi bi-clouds-fill'; 
    if (temperature < 30) return 'bi bi-cloud-sun-fill'; 
    return 'bi bi-cloud-sun-fill'; 
  };

  const hoursData: HourlyData[] = Array.from({ length: 24 }, (_, i) => {
    const hour = (currentHour + i) % 24;
    const time = hour === currentHour ? 'Maintenant' : `${hour < 10 ? '0' : ''}${hour}:00`;

    
    const temperature = i === 0 
      ? `${Math.round(weatherData?.main.temp || 0)}°C` 
      : `${Math.round(hourlyTemps[(currentHour + i) % 24])}°C`;

    const iconClass = i === 0 
      ? getIconClassForWeather(weatherData?.weather[0].description || '') 
      : getIconClassForTemperature(hourlyTemps[(currentHour + i) % 24], hour);

    return {
      time,
      temperature,
      iconClass,
    };
  });

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <div className="weather-main">
          <p>FEAB, Dalave</p>
          <p>Aujourd'hui</p>
          <p>{weatherData ? `${Math.round(weatherData.main.temp)}°C` : 'Chargement...'}</p>
          <p>{weatherData ? weatherData.weather[0].description : 'Chargement...'}</p>
        </div>
        <div className="weather-buttons">
          <button
            className="weather-button"
            onClick={() => navigate('/previsions')}
          >
            Prévisions sur 7 jours
          </button>
        </div>
      </div>
      <div className="weather-body">
        <div className="hourly-forecast">
          {hoursData.map((slot, index) => (
            <div className="hourly-card" key={index}>
              <div>{slot.time}</div>
              <div><i className={slot.iconClass}></i></div>
              <div>{slot.temperature}</div>
            </div>
          ))}
        </div>
        <div className="sun-details">
          <div>Température de l'air: {weatherData ? `${Math.round(weatherData.main.temp)}°C` : 'Chargement...'}</div>
          <div>Humidité: {weatherData ? `${weatherData.main.humidity}%` : 'Chargement...'}</div>
        </div>
        <div className="additional-info">
          <div>Vitesse du vent: {weatherData ? `${weatherData.wind.speed} m/s` : 'Chargement...'}</div>
          <div>Direction du vent: {windDirection !== null ? `${windDirection}°` : 'Chargement...'}</div>
        </div>
        <div className="additional-info">
          <div>Précipitations: {precipitationProbability !== null ? `${precipitationProbability}%` : 'Chargement...'}</div>
          <div>Rayonnement solaire: {uvIndex !== null ? uvIndex : 'Chargement...'}</div>
        </div>
        <div className="additional-info">
          <div>Température du sol: {soilTemperature !== null ? `${soilTemperature}°C` : 'Chargement...'}</div>
          <div>Humidité du sol: {soilMoisture !== null ? `${soilMoisture} m³/m³` : 'Chargement...'}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
