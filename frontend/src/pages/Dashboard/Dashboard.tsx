import React, { useState } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTachometerAlt, faChartBar, faCogs, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Modal from './Modal';

const dataPie = [
  { name: 'précipitations', value: 400 },
  { name: 'sunrise', value: 300 },
  { name: 'sunset', value: 300 },
  { name: 'humidité', value: 200 },
  { name: 'vent', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#85144b'];

const dataBar = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
];

const Sidebar = ({ openModal }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="sidebar">
      <div className="welcome-section">
        <h2>Bienvenue, Admin</h2>
      </div>
      <div className="menu-section">
        <h3><FontAwesomeIcon icon={faTachometerAlt} /> Menu</h3>
        <ul>
          <li onClick={toggleUserMenu}>
            <FontAwesomeIcon icon={faUser} /> Gérer les utilisateurs
            {isUserMenuOpen && (
              <ul className="submenu">
                <li onClick={openModal}><FontAwesomeIcon icon={faUserPlus} /> Créer un utilisateur</li>
                <li><FontAwesomeIcon icon={faUsers} /> Afficher la liste des utilisateurs</li>
              </ul>
            )}
          </li>
          <li><FontAwesomeIcon icon={faChartBar} /> Capteurs</li>
          <li><FontAwesomeIcon icon={faCogs} /> Gestion des rôles</li>
          <li><FontAwesomeIcon icon={faChartBar} /> Graphes</li>
        </ul>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [sensorCount, setSensorCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addUser = () => {
    setUserCount(userCount + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <Sidebar openModal={openModal} />
      <div className="dashboard-content">
        <div className="header">
          <h1>Bienvenue Admin</h1>
        </div>
        <div className="stats-grid">
          <div className="stat"><span>Liste des utilisateurs</span><strong>{userCount}</strong></div>
          <div className="stat"><span>Liste des capteurs</span><strong>{sensorCount}</strong></div>
          <div className="stat"><span>Autres éléments</span><strong>{otherCount}</strong></div>
        </div>
        <div className="charts">
          <PieChart width={400} height={400}>
            <Pie
              data={dataPie}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <BarChart width={600} height={300} data={dataBar}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uv" fill="#8884d8" />
            <Bar dataKey="pv" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
