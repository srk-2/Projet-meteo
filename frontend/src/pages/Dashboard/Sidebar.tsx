import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ activeMenu, setActiveMenu }: { activeMenu: string, setActiveMenu: React.Dispatch<React.SetStateAction<string>> }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setActiveMenu('Se déconnecter');
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <ul>
                <h1 className="description">Application météo de FEAB</h1>
                <li className={activeMenu === 'Tableau de bord' ? 'active' : ''} onClick={() => setActiveMenu('Tableau de bord')}>
                    <i className="bi bi-speedometer2 icon-spacing" style={{ fontSize: '1.5rem' }}></i>Tableau de bord
                </li>
                <li className={activeMenu === 'Utilisateurs' ? 'active' : ''} onClick={() => setActiveMenu('Utilisateurs')}>
                    <i className="bi bi-people-fill icon-spacing" style={{ fontSize: '1.5rem' }}></i>Utilisateurs
                </li>
                <li className={activeMenu === 'Capteurs' ? 'active' : ''} onClick={() => setActiveMenu('Capteurs')}>
                    <i className="bi bi-thermometer-sun icon-spacing" style={{ fontSize: '1.5rem' }}></i>Capteurs
                </li>
                <li className={activeMenu === 'Alertes' ? 'active' : ''} onClick={() => setActiveMenu('Alertes')}>
                    <i className="bi bi-bell-fill icon-spacing" style={{ fontSize: '1.5rem' }}></i>Alertes
                </li>
                <li className={activeMenu === 'Fournisseur de services météo' ? 'active' : ''} onClick={() => setActiveMenu('Fournisseur de services météo')}>
                    <i className="bi bi-server icon-spacing" style={{ fontSize: '1.5rem' }}></i>Fournisseur de services météo
                </li>
                <li className={activeMenu === 'Statistiques' ? 'active' : ''} onClick={() => setActiveMenu('Statistiques')}>
                    <i className="bi bi-bar-chart-line-fill icon-spacing" style={{ fontSize: '1.5rem' }}></i>Statistiques
                </li>
                <li className={activeMenu === 'Se déconnecter' ? 'active' : ''} onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right icon-spacing" style={{ fontSize: '1.5rem' }}></i>Se déconnecter
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
