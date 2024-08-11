import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });

      const accessToken = response.data.access;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      const userResponse = await axios.get('http://127.0.0.1:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = userResponse.data;
      if (user.is_admin) {
        navigate('/dashboard'); 
      } else {
        navigate('/home'); 
      }
    } catch (err) {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center shadow custom-card">
        <div className="card-body">
          <h4 className="card-title">Connexion</h4>
          <h4 className="detail">Entrez votre nom d'utilisateur et votre mot de passe</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="username"
                className="form-control"
                id="username"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <small>
              <a href="/forgot-password">Mot de passe oublié?</a>
            </small>
            <button type="submit" className="btn btn-primary btn-block">
              Se connecter
            </button>
          </form>
          <div className="mt-3">
            <small className="pdc">
             Pas encore de compte? <a href="/register">Créer un compte</a>
            </small>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
