import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

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
                    Tableau de bord
                </li>
                <li className={activeMenu === 'Utilisateurs' ? 'active' : ''} onClick={() => setActiveMenu('Utilisateurs')}>
                    Utilisateurs
                </li>
                <li className={activeMenu === 'Capteurs' ? 'active' : ''} onClick={() => setActiveMenu('Capteurs')}>
                    Capteurs
                </li>
                <li className={activeMenu === 'Alertes' ? 'active' : ''} onClick={() => setActiveMenu('Alertes')}>
                    Alertes
                </li>
                <li className={activeMenu === 'Fournisseur de services météo' ? 'active' : ''} onClick={() => setActiveMenu('Fournisseur de services météo')}>
                    Fournisseur de services météo
                </li>
                <li className={activeMenu === 'Se déconnecter' ? 'active' : ''} onClick={handleLogout}>
                    Se déconnecter
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
