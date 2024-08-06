import React, { useEffect, useState } from 'react';
import './Alerte.css'; 

interface WeatherAlert {
  id: number;
  title: string;
  description: string;
}

const Alerte: React.FC = () => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [activeAlert, setActiveAlert] = useState<number | null>(null);

  useEffect(() => {
    
    const fetchWeatherAlerts = () => {
      const simulatedAlerts: WeatherAlert[] = [
        { id: 1, title: 'Tempête Approchante', description: 'Une tempête est prévue dans les prochaines heures. Prenez vos précautions.' },
        { id: 2, title: 'Chaleur Intense', description: 'Des températures élevées sont attendues aujourd\'hui. Restez hydraté.' },
        { id: 3, title: 'Pluie Forte', description: 'Des pluies abondantes sont attendues cet après-midi. Prévoyez des parapluies.' },
      ];
      setAlerts(simulatedAlerts);
    };

    fetchWeatherAlerts();
  }, []);

  const handleNotificationClick = (id: number) => {
    setActiveAlert(id);
  };

  const handleNotificationTouchEnd = () => {
    setActiveAlert(null);
  };

  return (
    <div className="notifications-container">
      <div className="header">
        <span className="bell-icon">🔔</span>
        <h1>Notifications</h1>
      </div>
      <div className="notifications">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`notification ${activeAlert === alert.id ? 'active' : ''}`}
            onClick={() => handleNotificationClick(alert.id)}
            onTouchEnd={handleNotificationTouchEnd}
          >
            <div className="notification-content">
              <strong>{alert.title}</strong>
              <p>{alert.description}</p>
            </div>
            {activeAlert !== alert.id && <div className="notification-indicator" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerte;
