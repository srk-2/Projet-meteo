import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UsersTable.css';

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    telephone: string | null;
    is_admin: boolean;
}

const UsersTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        telephone: '',
        is_admin: 'user',
        password: '',
        confirm_password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>('http://127.0.0.1:8000/api/utilisateurs/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateName = (name: string) => {
        return /^[A-Za-zÀ-ÿ '-]+$/.test(name);  
    };

    const validateTelephone = (telephone: string) => {
        return /^\d{8,15}$/.test(telephone); 
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith('@gmail.com'); 
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateName(formData.first_name) || !validateName(formData.last_name)) {
            setError("Les noms et prénoms ne doivent pas contenir de chiffres ou de caractères spéciaux.");
            return;
        }

        if (!validateTelephone(formData.telephone)) {
            setError("Le numéro de téléphone doit être au format: '+999999999'. Jusqu'à 15 chiffres autorisés.");
            return;
        }

        if (!validateEmail(formData.email)) {
            setError("L'adresse email doit se terminer par '@gmail.com'.");
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        const dataToSend: any = {
            username: formData.username,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            telephone: formData.telephone || null,
            is_admin: formData.is_admin === 'admin',
            password: formData.password
        };

        try {
            if (editingUser) {
                await axios.put(`http://127.0.0.1:8000/api/utilisateurs/${editingUser.id}/update/`, dataToSend);
            } else {
                const response = await axios.post('http://127.0.0.1:8000/api/utilisateur/register/', dataToSend);
                setUsers(prevUsers => [...prevUsers, response.data]);
            }
            fetchUsers();
            setShowModal(false);
            setEditingUser(null);
            setFormData({
                username: '',
                email: '',
                first_name: '',
                last_name: '',
                telephone: '',
                is_admin: 'user',
                password: '',
                confirm_password: ''
            });
            setError(null);
            setSuccess('Utilisateur enregistré avec succès !');
        } catch (error) {
            console.error('Error submitting form:', error);
            if (axios.isAxiosError(error)) {
                setError(`Erreur lors de l'enregistrement : ${error.response?.data?.detail || 'Veuillez réessayer.'}`);
            } else {
                setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
            }
        }
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            telephone: user.telephone || '',
            is_admin: user.is_admin ? 'admin' : 'user',
            password: '',
            confirm_password: ''
        });
        setShowModal(true);
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/utilisateurs/${id}/delete/`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setFormData({
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            telephone: '',
            is_admin: 'user',
            password: '',
            confirm_password: ''
        });
        setShowModal(true);
    };

    if (loading) return <p>Chargement...</p>;


    return (
        <div>
            <h1>Gestion des utilisateurs</h1>
            <button className="ajout" onClick={handleAddUser}>Ajouter un utilisateur</button>
            <div className="users-table-container">
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
                        <th>Actions</th>
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
                            <td>{user.telephone || 'N/A'}</td>
                            <td>{user.is_admin ? 'Admin' : 'Utilisateur'}</td>
                            <td>
                                <button className="modif" onClick={() => handleEditUser(user)}>Modifier</button>
                                <button className="sup" onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {showModal && (
                <div className="modal">
                        <h2>{editingUser ? 'Modifier utilisateur' : 'Ajouter un utilisateur'}</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label>
                                    Nom d'utilisateur:
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Prénom:
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Nom:
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Téléphone:
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Rôle:
                                    <select
                                        name="is_admin"
                                        value={formData.is_admin}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="user">Utilisateur</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Mot de passe:
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required={!editingUser} 
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Confirmer le mot de passe:
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleInputChange}
                                        required={!editingUser} 
                                    />
                                </label>
                            </div>
                            <button type="submit">{editingUser ? 'Mettre à jour' : 'Ajouter'}</button>
                            <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
                        </form>
                </div>
            )}
        </div>
    );
};

export default UsersTable;
