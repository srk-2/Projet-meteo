import React from 'react';
import './ResetPassword.css';

const ResetPassword: React.FC = () => {
  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h1>Réinitialisation de Mot de Passe</h1>
        <p>
          Si vous avez besoin de réinitialiser votre mot de passe, veuillez contacter l'un des administrateurs à l'une des adresses 
          email suivantes :
        </p>
        <ul>
          <li><strong>Administrateur Principal:</strong> admin1@example.com</li>
          <li><strong>Support Technique:</strong> admin2@example.com</li>
          <li><strong>Assistance Sécurité:</strong> admin3@example.com</li>
        </ul>
        <p>
          Un administrateur se chargera de traiter votre demande dans les plus brefs délais.
        </p>
        <p>
          Merci de votre compréhension.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
