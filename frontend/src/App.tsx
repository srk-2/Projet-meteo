import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Accueil from './pages/Accueil/Accueil';
import Alerte from './pages/Alerte/Alerte';
import NotFound from './pages/NotFound/NotFound';
import Detail from './pages/Detail/Detail';
import Previsions from './pages/Previsions/Previsions';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/previsions" element={<Previsions />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/alerte" element={<Alerte />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
