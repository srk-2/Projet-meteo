import { useState } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import backgroundImage from './feab.jpg';
import DashboardContent from './DashboardContent';
import CapteurTable from './CapteurTable';
import AlerteTable from './AlerteTable';
import ApiMeteoTable from './ApiMeteoTable';
import UsersTable from './UsersTable';



const Dashboard = () => {
    const [activeMenu, setActiveMenu] = useState('Tableau de bord');

    const renderContent = () => {
        switch (activeMenu) {
            case 'Tableau de bord':
                return <DashboardContent />;
            case 'Utilisateurs':
                return <UsersTable />;
            case 'Capteurs':
                return <CapteurTable />;
            case 'Alertes':
                return <AlerteTable />;
            case 'Fournisseur de services météo':
                return <ApiMeteoTable />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="acc" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="dashboard">
            <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <div className="content">
                {renderContent()}
            </div>
        </div>
        </div>
    );
}

export default Dashboard;
