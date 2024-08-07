import React from 'react';
import './Previsions.css';

const Previsions: React.FC = () => {

  const allDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];


  const currentDayIndex = new Date().getDay();

  
  const days = [...allDays.slice(currentDayIndex), ...allDays.slice(0, currentDayIndex)];

  
  days[0] = 'Aujourd\'hui';

  return (
    <div className="weather-container">
      <div className="title">
        <h1><i className="bi bi-calendar3"></i> Prévisions pour les 7 prochains jours</h1>
      </div>
      <div className="forecast-grid">
        {days.map((day, index) => (
          <div className={`forecast-card ${index === days.length - 1 ? 'last-card' : ''}`} key={index}>
            <h2>{day}</h2>
            <p>29°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Previsions;
