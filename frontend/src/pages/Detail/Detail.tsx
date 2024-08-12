import React from 'react';
import './Detail.css';

const Detail: React.FC = () => {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  
  const details = [
    { label: 'Température de l\'air', value: '23°C' },
    { label: 'Humidité relative', value: '60%' },
    { label: 'Vitesse du vent', value: '15 km/h' },
    { label: 'Direction du vent', value: 'Nord' },
    { label: 'Précipitations', value: '2 mm' },
    { label: 'Rayonnement solaire', value: '500 W/m²' },
    { label: 'Température du sol', value: '22°C' },
    { label: 'Humidité du sol', value: '45%' },
  ];

  return (
    <div className="details-card">
      <div className="details-header">
        <h1>FEAB,Dalave</h1>
        <p>{dateString}</p>
        <p>Partiellemnt ensoleillé</p>
      </div>
      <div className="details-grid">
        {details.map((item, index) => (
          <div className="details-card-item" key={index}>
            <div>{item.label}</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
