import { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardContent.css';
import WeatherChart from './WeatherChart';
import TodayWeather from './TodayWeather';

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    telephone: string;
    is_admin: boolean;
}

const DashboardContent = () => {
    return (
        <div className="dashboard-content">
            <div className="top-row">
                <div className="card widget">
                    <TodayWeather />
                </div>
                <div className="card chart">
                    <WeatherChart /> 
                </div>
            </div>
            <div className="bottom-row">
                <div className="card users-table">
                    <h3>Liste des Utilisateurs</h3>
                    <UsersTable />
                </div>
            </div>
        </div>
    );
};

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<User[]>('http://127.0.0.1:8000/api/utilisateurs/')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <table className="users-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Téléphone</th>
                    <th>Rôle</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.telephone}</td>
                        <td>{user.is_admin ? 'Admin' : 'Utilisateur'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default DashboardContent;
