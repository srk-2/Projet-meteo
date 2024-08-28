import { useState, useEffect } from 'react';
import axios from 'axios';
import './ApiMeteoTable.css'; 

interface ApiMeteo {
    id: number;
    source: string;
    timestamp: string;
    relative_humidity?: number;
    air_temperature?: number;
    solar_radiation?: number;
    precipitation?: number;
    wind_speed?: number;
    wind_direction?: string;
    soil_temperature?: number;
    soil_humidity?: number;
}

const ApiMeteoTable = () => {
    const [apiMetos, setApiMetos] = useState<ApiMeteo[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentApiMeteo, setCurrentApiMeteo] = useState<ApiMeteo | null>(null);
    const [source, setSource] = useState<string>('');
    const [timestamp, setTimestamp] = useState<string>('');
    const [relativeHumidity, setRelativeHumidity] = useState<number | ''>('');
    const [airTemperature, setAirTemperature] = useState<number | ''>('');
    const [solarRadiation, setSolarRadiation] = useState<number | ''>('');
    const [precipitation, setPrecipitation] = useState<number | ''>('');
    const [windSpeed, setWindSpeed] = useState<number | ''>('');
    const [windDirection, setWindDirection] = useState<string>('');
    const [soilTemperature, setSoilTemperature] = useState<number | ''>('');
    const [soilHumidity, setSoilHumidity] = useState<number | ''>('');

    useEffect(() => {
        fetchApiMetos();
    }, []);

    const fetchApiMetos = async () => {
        const response = await axios.get<ApiMeteo[]>('http://127.0.0.1:8000/api/apimeteo/');
        setApiMetos(response.data);
    };

    const handleAddApiMeteo = async () => {
        const newApiMeteo = { source, timestamp, relative_humidity: relativeHumidity || null, air_temperature: airTemperature || null, solar_radiation: solarRadiation || null, precipitation: precipitation || null, wind_speed: windSpeed || null, wind_direction: windDirection, soil_temperature: soilTemperature || null, soil_humidity: soilHumidity || null };
        await axios.post('http://127.0.0.1:8000/api/apimeteo/', newApiMeteo);
        fetchApiMetos();
        setShowModal(false);
    };

    const handleUpdateApiMeteo = async () => {
        if (currentApiMeteo) {
            const updatedApiMeteo = { source, timestamp, relative_humidity: relativeHumidity || null, air_temperature: airTemperature || null, solar_radiation: solarRadiation || null, precipitation: precipitation || null, wind_speed: windSpeed || null, wind_direction: windDirection, soil_temperature: soilTemperature || null, soil_humidity: soilHumidity || null };
            await axios.put(`http://127.0.0.1:8000/api/apimeteo/${currentApiMeteo.id}/update/`, updatedApiMeteo);
            fetchApiMetos();
            setShowModal(false);
            setCurrentApiMeteo(null);
        }
    };

    const handleDeleteApiMeteo = async (id: number) => {
        await axios.delete(`http://127.0.0.1:8000/api/apimeteo/${id}/delete/`);
        fetchApiMetos();
    };

    const openModalForUpdate = (apiMeteo: ApiMeteo) => {
        setSource(apiMeteo.source);
        setTimestamp(apiMeteo.timestamp);
        setRelativeHumidity(apiMeteo.relative_humidity || '');
        setAirTemperature(apiMeteo.air_temperature || '');
        setSolarRadiation(apiMeteo.solar_radiation || '');
        setPrecipitation(apiMeteo.precipitation || '');
        setWindSpeed(apiMeteo.wind_speed || '');
        setWindDirection(apiMeteo.wind_direction || '');
        setSoilTemperature(apiMeteo.soil_temperature || '');
        setSoilHumidity(apiMeteo.soil_humidity || '');
        setCurrentApiMeteo(apiMeteo);
        setShowModal(true);
    };

    return (
        <div>
            <h1>Table des Données Météorologiques</h1>
            <button className="ajout" onClick={() => setShowModal(true)}>Ajouter Donnée Météo</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Source</th>
                        <th>Timestamp</th>
                        <th>Humidité Relative</th>
                        <th>Température de l'Air</th>
                        <th>Radiation Solaire</th>
                        <th>Précipitation</th>
                        <th>Vitesse du Vent</th>
                        <th>Direction du Vent</th>
                        <th>Température du Sol</th>
                        <th>Humidité du Sol</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {apiMetos.map(apiMeteo => (
                        <tr key={apiMeteo.id}>
                            <td>{apiMeteo.id}</td>
                            <td>{apiMeteo.source}</td>
                            <td>{apiMeteo.timestamp}</td>
                            <td>{apiMeteo.relative_humidity}</td>
                            <td>{apiMeteo.air_temperature}</td>
                            <td>{apiMeteo.solar_radiation}</td>
                            <td>{apiMeteo.precipitation}</td>
                            <td>{apiMeteo.wind_speed}</td>
                            <td>{apiMeteo.wind_direction}</td>
                            <td>{apiMeteo.soil_temperature}</td>
                            <td>{apiMeteo.soil_humidity}</td>
                            <td>
                                <button className="modif"onClick={() => openModalForUpdate(apiMeteo)}>Modifier</button>
                                <button className="sup" onClick={() => handleDeleteApiMeteo(apiMeteo.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <h2>{currentApiMeteo ? 'Modifier Donnée Météo' : 'Ajouter Donnée Météo'}</h2>
                    <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" />
                    <input type="datetime-local" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
                    <input type="number" value={relativeHumidity} onChange={(e) => setRelativeHumidity(Number(e.target.value))} placeholder="Humidité Relative" />
                    <input type="number" value={airTemperature} onChange={(e) => setAirTemperature(Number(e.target.value))} placeholder="Température de l'Air" />
                    <input type="number" value={solarRadiation} onChange={(e) => setSolarRadiation(Number(e.target.value))} placeholder="Radiation Solaire" />
                    <input type="number" value={precipitation} onChange={(e) => setPrecipitation(Number(e.target.value))} placeholder="Précipitation" />
                    <input type="number" value={windSpeed} onChange={(e) => setWindSpeed(Number(e.target.value))} placeholder="Vitesse du Vent" />
                    <input type="text" value={windDirection} onChange={(e) => setWindDirection(e.target.value)} placeholder="Direction du Vent" />
                    <input type="number" value={soilTemperature} onChange={(e) => setSoilTemperature(Number(e.target.value))} placeholder="Température du Sol" />
                    <input type="number" value={soilHumidity} onChange={(e) => setSoilHumidity(Number(e.target.value))} placeholder="Humidité du Sol" />
                    <button onClick={currentApiMeteo ? handleUpdateApiMeteo : handleAddApiMeteo}>
                        {currentApiMeteo ? 'Modifier' : 'Ajouter'}
                    </button>
                    <button onClick={() => setShowModal(false)}>Annuler</button>
                </div>
            )}
        </div>
    );
};

export default ApiMeteoTable;
