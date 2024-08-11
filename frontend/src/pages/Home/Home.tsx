import React from 'react';
import './Home.css';
import { FaSun, FaTint, FaMoon, FaCloudShowersHeavy, FaWind, FaCloud } from 'react-icons/fa';

const Home: React.FC = () => {
    const currentHour = new Date().getHours();

    const hoursData = Array.from({ length: 24 }, (_, i) => {
        const hour = (currentHour + i) % 24;
        const time = hour === currentHour ? 'Maintenant' : `${hour < 10 ? '0' : ''}${hour}:00`;
        return {
            time,
            temperature: `${15 + hour % 10}°C`,
        };
    });

    return (
        <div className="dashboard">
            <div>
                <h2>FEAB, DALAVE</h2>
                <p>Aujourd'hui</p>
                <p>Temperature</p>
                <p>Ensoleillé</p>
                <div className="weather-buttons">
                    <button className="weather-button">Prévisions sur 7 jours</button>
                </div>
            </div>
            <div className="hours-card">
                <div className="hours-container">
                    <div className="hours">
                        {hoursData.map((hour, index) => (
                            <div key={index} className="hour-card">
                                <div className="hour-time">{hour.time}</div>
                                <div className="hour-icon">
                                    <FaCloud size={20} />
                                </div>
                                <div className="hour-temperature">{hour.temperature}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="weather-info">
            <div className="info-item">
                <FaSun size={30} />
                <div className="info-text">
                    <div>Lever du soleil</div>
                    <div>6:22</div>
                </div>
            </div>
            <div className="info-item">
                <FaTint size={30} />
                <div className="info-text">
                    <div>Humidité</div>
                    <div>85%</div>
                </div>
            </div>
            <div className="info-item">
                <FaSun size={30} />
                <div className="info-text">
                    <div>UV Index</div>
                    <div>5</div>
                </div>
            </div>
            <div className="info-item">
                <FaMoon size={30} />
                <div className="info-text">
                    <div>Coucher du soleil</div>
                    <div>18:45</div>
                </div>
            </div>
            <div className="info-item">
                <FaCloudShowersHeavy size={30} />
                <div className="info-text">
                    <div>Precipitations</div>
                    <div>10%</div>
                </div>
            </div>
            <div className="info-item">
                <FaWind size={30} />
                <div className="info-text">
                    <div>Vent</div>
                    <div>15 km/h</div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Home;
