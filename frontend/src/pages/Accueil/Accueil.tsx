import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Accueil.css';
import backgroundImage from './feab.jpg';
import cloudImage from './w.jpg';

const Accueil: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <div className="acc" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <img src={cloudImage} alt="Cloud Icon" className="cloud-image" />
        <h1 className="app-title">APPLICATION METEO <br />DE FEAB</h1>
        <button className="get-started-button" onClick={handleGetStartedClick}>
          Appuyez pour continuer
        </button>
      </div>
    </div>
  );
};


export default Accueil;
