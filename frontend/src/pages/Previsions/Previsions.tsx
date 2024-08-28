import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Detail from '../Detail/Detail';
import TodayDetail from '../Detail/TodayDetail';
import './Previsions.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Previsions: React.FC = () => {
  const [dailyTemperatures, setDailyTemperatures] = useState<number[]>([]);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [weatherDescription, setWeatherDescription] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'today' | 'details' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const apiKey = '86979e78b0ef32cc147c5570459b9098';
  const latitude = 6.385992;
  const longitude = 1.243624;

  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`;
  const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max,precipitation_probability_max&wind_speed_unit=ms&timezone=GMT`;

  const allDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const currentDayIndex = new Date().getDay();
  const days = [...allDays.slice(currentDayIndex), ...allDays.slice(0, currentDayIndex)];
  days[0] = 'Aujourd\'hui';

  useEffect(() => {
    axios.get(openWeatherUrl)
      .then(response => {
        setCurrentTemp(response.data.main.temp);
        setWeatherDescription(response.data.weather[0].description);
      })
      .catch(error => console.error('Error fetching current weather data:', error));

    axios.get(openMeteoUrl)
      .then(response => {
        const temperatures = response.data.daily.temperature_2m_max.slice(1); 
        setDailyTemperatures(temperatures);
      })
      .catch(error => console.error('Error fetching daily temperatures:', error));
  }, [openWeatherUrl, openMeteoUrl]);

  const openModal = (content: 'today' | 'details', date?: Date) => {
    setModalContent(content);
    setSelectedDate(date || new Date());
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCloudIcon = (index: number) => {
    if (index === 0 && weatherDescription) {
      if (weatherDescription.includes('soleil')) return <i className="bi bi-cloud-sun" style={{ fontSize: '2rem' }}></i>;
      if (weatherDescription.includes('pluie')) return <i className="bi bi-cloud-rain" style={{ fontSize: '2rem' }}></i>;
      if (weatherDescription.includes('bruine')) return <i className="bi bi-cloud-drizzle" style={{ fontSize: '2rem' }}></i>;
      if (weatherDescription.includes('nuage')) return <i className="bi bi-clouds" style={{ fontSize: '2rem' }}></i>;
      return <i className="bi bi-cloud" style={{ fontSize: '2rem' }}></i>;
    }

    const temp = dailyTemperatures[index - 1];
    if (temp < 15) return <i className="bi bi-cloud-rain" style={{ fontSize: '2rem' }}></i>;
    if (temp < 25) return <i className="bi bi-cloud" style={{ fontSize: '2rem' }}></i>;
    return <i className="bi bi-cloud-sun" style={{ fontSize: '2rem' }}></i>;
  };

  return (
    <div className="weather-container">
      <div className="title">
        <h2><i className="bi bi-calendar3"></i> Prévisions sur 7 jours</h2>
      </div>
      <div className="forecast-grid">
        {days.map((day, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);
          return (
            <div
              className={`forecast-card ${index === days.length - 1 ? 'last-card' : ''}`}
              key={index}
              onClick={() => openModal(index === 0 ? 'today' : 'details', date)}
            >
              <h2>{day}</h2>
              <div className="forecast-content">
                <div className="cloud-icon">
                  {getCloudIcon(index)}
                </div>
                <p>{index === 0 ? `${currentTemp !== null ? Math.round(currentTemp) : '...'}` : `${dailyTemperatures[index - 1] !== undefined ? Math.round(dailyTemperatures[index - 1]) : '...'}`}°</p>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Détails Météo"
        style={modalStyles}
      >
        {modalContent === 'today' ? (
          <TodayDetail selectedDate={selectedDate} />
        ) : modalContent === 'details' ? (
          <Detail selectedDate={selectedDate} />
        ) : null}
        <button onClick={closeModal}>Fermer</button>
      </Modal>
    </div>
  );
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    maxHeight: '80vh',
  },
};

export default Previsions;
