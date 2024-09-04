import { useState, useEffect } from 'react';
import axios from 'axios';
import './CapteurTable.css';

interface Capteur {
    id: number;
    nomcapteur: string;
    statut: string;
    type_capteur: string;
    localisation: string;
    date_installation: string; 
}

const CapteurTable = () => {
    const [capteurs, setCapteurs] = useState<Capteur[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [nomCapteur, setNomCapteur] = useState<string>('');
    const [statut, setStatut] = useState<string>('active');
    const [typeCapteur, setTypeCapteur] = useState<string>('');
    const [localisation, setLocalisation] = useState<string>('');
    const [dateInstallation, setDateInstallation] = useState<string>('');
    const [selectedCapteur, setSelectedCapteur] = useState<number | null>(null);

    useEffect(() => {
        fetchCapteurs();
    }, []);

    const fetchCapteurs = async () => {
        const response = await axios.get<Capteur[]>('http://127.0.0.1:8000/api/capteurs/');
        setCapteurs(response.data);
    };

    const handleAddCapteur = async () => {
        const newCapteur = {
            nomcapteur: nomCapteur,
            statut,
            type_capteur: typeCapteur,
            localisation,
            date_installation: dateInstallation 
        };
        await axios.post('http://127.0.0.1:8000/api/capteurs/', newCapteur);
        fetchCapteurs();
        setShowModal(false);
    };

    const handleDeleteCapteur = async (id: number) => {
        await axios.delete(`http://127.0.0.1:8000/api/capteurs/${id}/delete/`);
        fetchCapteurs();
    };

    const handleUpdateCapteur = async () => {
        if (selectedCapteur !== null) {
            const updatedCapteur = {
                nomcapteur: nomCapteur,
                statut,
                type_capteur: typeCapteur,
                localisation,
                date_installation: dateInstallation 
            };
            await axios.put(`http://127.0.0.1:8000/api/capteurs/${selectedCapteur}/update/`, updatedCapteur);
            fetchCapteurs();
            setShowModal(false);
            setSelectedCapteur(null);
        }
    };

    const openModalForUpdate = (capteur: Capteur) => {
        setNomCapteur(capteur.nomcapteur);
        setStatut(capteur.statut);
        setTypeCapteur(capteur.type_capteur);
        setLocalisation(capteur.localisation);
        setDateInstallation(capteur.date_installation); 
        setSelectedCapteur(capteur.id);
        setShowModal(true);
    };

    return (
        <div>
            <h1>Table des Capteurs</h1>
            <button className="ajout" onClick={() => setShowModal(true)}>Ajouter Capteur</button>
            <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom Capteur</th>
                        <th>Statut</th>
                        <th>Type</th>
                        <th>Localisation</th>
                        <th>Date Installation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {capteurs.map(capteur => (
                        <tr key={capteur.id}>
                            <td>{capteur.id}</td>
                            <td>{capteur.nomcapteur}</td>
                            <td>{capteur.statut}</td>
                            <td>{capteur.type_capteur}</td>
                            <td>{capteur.localisation}</td>
                            <td>{capteur.date_installation}</td> 
                            <td>
                                <button className="modif" onClick={() => openModalForUpdate(capteur)}>Modifier</button>
                                <button className="sup" onClick={() => handleDeleteCapteur(capteur.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {showModal && (
                <div className="modal">
                    <h2>{selectedCapteur ? 'Modifier Capteur' : 'Ajouter Capteur'}</h2>
                    <input type="text" value={nomCapteur} onChange={(e) => setNomCapteur(e.target.value)} placeholder="Nom Capteur" />
                    <select value={statut} onChange={(e) => setStatut(e.target.value)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                    <input type="text" value={typeCapteur} onChange={(e) => setTypeCapteur(e.target.value)} placeholder="Type Capteur" />
                    <input type="text" value={localisation} onChange={(e) => setLocalisation(e.target.value)} placeholder="Localisation" />
                    <input type="date" value={dateInstallation} onChange={(e) => setDateInstallation(e.target.value)} placeholder="Date Installation" /> 
                    <button onClick={selectedCapteur ? handleUpdateCapteur : handleAddCapteur}>
                        {selectedCapteur ? 'Modifier' : 'Ajouter'}
                    </button>
                    <button onClick={() => setShowModal(false)}>Annuler</button>
                </div>
            )}
        </div>
    );
};

export default CapteurTable;