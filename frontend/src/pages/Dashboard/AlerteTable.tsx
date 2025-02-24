import { useState, useEffect } from 'react';
import axios from 'axios';
import './AlerteTable.css';

interface Alerte {
    id: number;
    utilisateur: number;
    libelle: string;
    description: string;
    created_at: string;
    is_read: boolean;
}

const AlerteTable = () => {
    const [alertes, setAlertes] = useState<Alerte[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [selectedAlerte, setSelectedAlerte] = useState<Alerte | null>(null);
    const [libelle, setLibelle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        fetchAlertes();
    }, []);

    const fetchAlertes = async () => {
        try {
            const response = await axios.get<Alerte[]>('http://127.0.0.1:8000/api/alertes/');
            setAlertes(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des alertes:', error);
        }
    };

    const handleAddAlerte = async () => {
        try {
            const newAlerte = { libelle, description };
            await axios.post('http://127.0.0.1:8000/api/alertes/', newAlerte);
            fetchAlertes();
            setShowModal(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'alerte:', error);
        }
    };

    const handleUpdateAlerte = async () => {
        if (selectedAlerte) {
            try {
                const updatedAlerte = { libelle, description };
                await axios.put(`http://127.0.0.1:8000/api/alertes/${selectedAlerte.id}/update/`, updatedAlerte);
                fetchAlertes();
                setShowModal(false);
                setIsUpdating(false);
                setSelectedAlerte(null);
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'alerte:', error);
            }
        }
    };

    const handleDeleteAlerte = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/alertes/${id}/delete/`);
            fetchAlertes(); 
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'alerte:', error);
        }
    };
    
    const openModalForUpdate = (alerte: Alerte) => {
        setLibelle(alerte.libelle);
        setDescription(alerte.description);
        setSelectedAlerte(alerte);
        setIsUpdating(true);
        setShowModal(true);
    };

    return (
        <div>
            <h1>Table des Alertes</h1>
            <button className="ajout" onClick={() => { setIsUpdating(false); setShowModal(true); }}>Ajouter Alerte</button>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                           
                            <th>Libellé</th>
                            <th>Description</th>
                            <th>Date</th>
                           
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alertes.length > 0 ? (
                            alertes.map(alerte => (
                                <tr key={alerte.id}>
                                   
                                    <td>{alerte.libelle}</td>
                                    <td>{alerte.description}</td>
                                    <td>{new Date(alerte.created_at).toLocaleString()}</td>
                                    
                                    <td>
                                        <button className="modif" onClick={() => openModalForUpdate(alerte)}>Modifier</button>
                                        <button className="sup" onClick={() => handleDeleteAlerte(alerte.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>Aucune alerte à afficher</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <h2>{isUpdating ? 'Modifier Alerte' : 'Ajouter Alerte'}</h2>
                    <input
                        type="text"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                        placeholder="Libellé"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <button onClick={isUpdating ? handleUpdateAlerte : handleAddAlerte}>
                        {isUpdating ? 'Modifier' : 'Ajouter'}
                    </button>
                    <button onClick={() => setShowModal(false)}>Annuler</button>
                </div>
            )}
        </div>
    );
};

export default AlerteTable;
