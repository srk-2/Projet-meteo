import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { WeatherData } from './types';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../constants';

interface WeatherAlert {
  id: number;
  libelle: string;
  description: string;
  created_at: string;
  is_read: boolean;
}

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyTemps, setHourlyTemps] = useState<number[]>([]);
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [precipitationProbability, setPrecipitationProbability] = useState<number | null>(null);
  const [soilTemperature, setSoilTemperature] = useState<number | null>(null);
  const [soilMoisture, setSoilMoisture] = useState<number | null>(null);
  const [windDirection, setWindDirection] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [activeAlert, setActiveAlert] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const fetchWeatherAlerts = async () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) {
          console.error('Access token not found');
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get('http://127.0.0.1:8000/api/alertes/user/', config);
        const unreadAlerts = response.data.filter((alert: WeatherAlert) => !alert.is_read);
        setAlerts(unreadAlerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchWeatherData();
    fetchOpenMeteoData();
    fetchWeatherAlerts();
  }, []);

  const getIconClassForWeather = (description: string): string => {
    if (description.includes('légère pluie')) return 'bi bi-cloud-drizzle-fill';
    if (description.includes('pluie ')) return 'bi bi-cloud-rain-fill';
    if (description.includes('soleil')) return 'bi bi-cloud-sun-fill';
    if (description.includes('moon')) return 'bi bi-cloud-moon-fill';
    if (description.includes('nuage')) return 'bi bi-clouds-fill';
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

  const hoursData = Array.from({ length: 24 }, (_, i) => {
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

  const handleNotificationClick = (id: number) => {
    setActiveAlert(id);
  };

  const handleNotificationTouchEnd = () => {
    setActiveAlert(null);
  };

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <div className="weather-main">
          <p>FEAB, Dalave</p>
          <p>Aujourd'hui</p>
          <p>{weatherData ? `${Math.round(weatherData.main.temp)}°C` : 'Chargement...'}</p>
          <p>{weatherData ? weatherData.weather[0].description : 'Chargement...'}</p>
        </div>
        <div className="notification-bell">
          <i className="bi bi-bell-fill" onClick={() => setIsModalOpen(true)}></i>
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <div className="notifications-container">
              <div className="header">
                <span className="bell-icon">🔔</span>
                <h1>Notifications</h1>
              </div>
              <div className="notifications">
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`notification ${activeAlert === alert.id ? 'active' : ''}`}
                      onClick={() => handleNotificationClick(alert.id)}
                      onTouchEnd={handleNotificationTouchEnd}
                    >
                      <div className="notification-content">
                        <strong>{alert.libelle}</strong>
                        <p>{alert.description}</p>
                      </div>
                      {activeAlert !== alert.id && <div className="notification-indicator" />}
                    </div>
                  ))
                ) : (
                  <p>Pas de nouvelles alertes</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
          <div>Température du sol: {soilTemperature !== null ? `${Math.round(soilTemperature)}°C` : 'Chargement...'}</div>
          <div>Humidité du sol: {soilMoisture !== null ? `${soilMoisture} m³/m³` : 'Chargement...'}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
