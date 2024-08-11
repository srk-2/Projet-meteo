import React from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Ajouter un utilisateur</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <form className="modal-form">
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Numéro de téléphone</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className="form-group">
            <label htmlFor="civility">Civilité</label>
            <select id="civility" name="civility" required>
              <option value="" disabled selected>Sélectionnez une option</option>
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
