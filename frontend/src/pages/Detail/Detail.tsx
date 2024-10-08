import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  precipitation: number;
}

interface DetailProps {
  selectedDate: Date | null;
}

const Detail: React.FC<DetailProps> = ({ selectedDate }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedDate) {
        try {
          const latitude = 6.385992;
          const longitude = 1.243624;

          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=GMT`
          );

          const data = response.data.daily;

          const openMeteoData = {
            temperature: data.temperature_2m_max.slice(1, 7),
            windSpeed: data.wind_speed_10m_max.slice(1, 7),
            windDirection: data.wind_direction_10m_dominant.slice(1, 7),
            uvIndex: data.uv_index_max.slice(1, 7),
            precipitation: data.precipitation_probability_max.slice(1, 7),
          };

          const today = new Date().getDay();
          const selectedDayIndex = selectedDate.getDay();
          const dayOffset = (selectedDayIndex - today + 7) % 7 - 1;

          if (dayOffset >= 0 && dayOffset < 6) {
            const weather: WeatherData = {
              temperature: openMeteoData.temperature[dayOffset],
              windSpeed: openMeteoData.windSpeed[dayOffset],
              windDirection: openMeteoData.windDirection[dayOffset],
              uvIndex: openMeteoData.uvIndex[dayOffset],
              precipitation: openMeteoData.precipitation[dayOffset],
            };

            setWeatherData(weather);
          } else {
            setWeatherData(null);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données météo:', error);
        }
      }
    };

    fetchWeatherData();
  }, [selectedDate]);

  const getCurrentDate = () => {
    return selectedDate?.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) || '';
  };

  if (!weatherData) {
    return <div>Chargement des données météo...</div>;
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.date}>{getCurrentDate()}</h3>
      <div style={styles.info}>
        <p>Température: {weatherData.temperature}°C</p>
        <p>Vitesse du vent: {weatherData.windSpeed} m/s</p>
        <p>Direction du vent: {weatherData.windDirection}°</p>
        <p>Rayonnement solaire: {weatherData.uvIndex}</p>
        <p>Probabilité de précipitations: {weatherData.precipitation} %</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#2c3e50',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    color: '#ecf0f1',
    maxWidth: '400px',
    margin: '0 auto',
  },
  date: {
    marginBottom: '15px',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  info: {
    lineHeight: '1.5em',
  },
};

export default Detail;
