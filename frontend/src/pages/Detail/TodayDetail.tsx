import React, { useEffect, useState } from 'react';

interface ExtendedWeatherData {
  airTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  windDirection: string;
  solarRadiation: number;
  precipitation: number;
  soilTemperature: number;
  soilHumidity: number;
}

interface TodayDetailProps {
  selectedDate: Date | null;
}

const TodayDetail: React.FC<TodayDetailProps> = ({ selectedDate }) => {
  const [weatherData, setWeatherData] = useState<ExtendedWeatherData | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '86979e78b0ef32cc147c5570459b9098';
        const latitude = 6.385992;
        const longitude = 1.243624;

       
        const openWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`
        );
        const openWeatherData = await openWeatherResponse.json();

        
        const openMeteoResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_direction_10m,soil_temperature_6cm,soil_moisture_3_to_9cm&daily=uv_index_max,precipitation_probability_max&wind_speed_unit=ms&timezone=GMT&forecast_days=1`
        );
        const openMeteoData = await openMeteoResponse.json();

        
        const data: ExtendedWeatherData = {
          airTemperature: Math.round(openWeatherData.main.temp), 
          relativeHumidity: openWeatherData.main.humidity,
          windSpeed: openWeatherData.wind.speed,
          windDirection: openMeteoData.hourly.wind_direction_10m[0],
          solarRadiation: openMeteoData.daily.uv_index_max[0], 
          precipitation: openMeteoData.daily.precipitation_probability_max[0],
          soilTemperature: Math.round(openMeteoData.hourly.soil_temperature_6cm[0]), 
          soilHumidity: openMeteoData.hourly.soil_moisture_3_to_9cm[0],
        };

        setWeatherData(data);
        setCurrentDate(getCurrentDate());
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo:', error);
      }
    };

    fetchWeatherData();
  }, []);

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
      <h3 style={styles.date}>{currentDate}</h3>
      <div style={styles.info}>
        <p>Température de l'air: {weatherData.airTemperature}°C</p>
        <p>Humidité relative: {weatherData.relativeHumidity}%</p>
        <p>Vitesse du vent: {weatherData.windSpeed} m/s</p>
        <p>Direction du vent: {weatherData.windDirection}°</p>
        <p>Rayonnement solaire (UV index max): {weatherData.solarRadiation}</p>
        <p>Précipitations: {weatherData.precipitation}%</p>
        <p>Température du sol: {weatherData.soilTemperature}°C</p>
        <p>Humidité du sol: {weatherData.soilHumidity}%</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#34495e',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    color: '#ecf0f1',
    maxWidth: '450px',
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

export default TodayDetail;
