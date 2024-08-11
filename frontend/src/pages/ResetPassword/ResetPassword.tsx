import React from 'react';
import './ResetPassword.css';

const ResetPassword: React.FC = () => {
  return (
    <div className="reset-password-container">
      <div className="reset-password-content">
        <h1>Réinitialiser le Mot de Passe</h1>
        <p>Veuillez entrer votre adresse email pour recevoir un lien de réinitialisation.</p>
        <input type="email" placeholder="Entrez votre email" />
        <button>Réinitialiser le mot de passe</button>
      </div>
    </div>
  );
};

export default ResetPassword;
