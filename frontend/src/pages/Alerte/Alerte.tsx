import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../constants';
import './Alerte.css';

interface WeatherAlert {
  id: number;
  libelle: string;
  description: string;
  created_at: string;
  is_read: boolean;
}

const Alerte: React.FC = () => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [activeAlert, setActiveAlert] = useState<number | null>(null);

  useEffect(() => {
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
  );
};

export default Alerte;