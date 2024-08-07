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
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center shadow custom-card">
        <div className="card-body">
          <h5 className="card-title">Welcome back</h5>
          <h5 className="detail">Please enter your details to continue</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="username"
                className="form-control"
                id="username"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <div className="mt-3">
            <small>
              <a href="/forgot-password">Forgot password?</a>
            </small>
            <br />
            <small>
             Don't have an account? <a href="/register">Sign up</a>
            </small>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
