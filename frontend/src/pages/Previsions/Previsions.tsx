import React from 'react';
import './Previsions.css';

const Previsions: React.FC = () => {
  const days = ['Aujourd\'hui', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  return (
    <div className="weather-container">
      <div className="header">
        
        <h1><i className="bi bi-calendar3"></i>  Prévisions pour les 7 prochains jours</h1>
      </div>
      <div className="forecast-grid">
        {days.map((day, index) => (
          <div className={`forecast-card ${index === days.length - 1 ? 'last-card' : ''}`} key={day}>
            <h2>{day}</h2>
            <img src="/path-to-weather-icon.png" alt="weather icon" className="weather-icon" />
            <p>29°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Previsions;
