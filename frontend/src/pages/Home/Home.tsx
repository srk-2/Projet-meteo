import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';


interface HourlyData {
  time: string;
  temperature: string;
  icon: typeof faCloud; //
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();

  
  const hoursData: HourlyData[] = Array.from({ length: 24 }, (_, i) => {
    const hour = (currentHour + i) % 24;
    const time = hour === currentHour ? 'Maintenant' : `${hour < 10 ? '0' : ''}${hour}:00`;
    return {
      time,
      temperature: `${15 + hour % 10}°C`,
      icon: faCloud, 
    };
  });

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <div className="weather-main">
          <p>FEAB, Dalave</p>
          <p>Aujourd'hui</p>
          <p>29°</p>
          <p>Ensoleillé</p>
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
              <div><FontAwesomeIcon icon={slot.icon} /></div>
              <div>{slot.temperature}</div>
            </div>
          ))}
        </div>
        <div className="sun-details">
          <div>Temperature de l'air</div>
          <div>Humidite relative</div>
        </div>
        <div className="additional-info">
          <div>Precipitations</div>
          <div>Rayonnement solaire</div>
        </div>
        <div className="additional-info">
          <div>Vitesse du vent</div>
          <div>Direction du vent</div>
        </div>
        <div className="additional-info">
          <div>Temperature du sol</div>
          <div>Humidite du sol</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
