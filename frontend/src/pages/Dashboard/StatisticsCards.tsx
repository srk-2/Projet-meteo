import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const StatisticsCards = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=6.385992&longitude=1.243624&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_hours,precipitation_probability_max,wind_speed_10m_max&wind_speed_unit=ms&timezone=GMT')
            .then(response => response.json())
            .then(data => setData(data.daily));
    }, []);

    if (!data) {
        return <div>Chargement...</div>;
    }

    const tempData = {
        labels: data.time,
        datasets: [
            {
                label: 'Température Max',
                data: data.temperature_2m_max,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Température Min',
                data: data.temperature_2m_min,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    };

    const precipitationData = {
        labels: data.time,
        datasets: [
            {
                label: 'Probabilité de Précipitation (%)',
                data: data.precipitation_probability_max,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const uvData = {
        labels: data.time,
        datasets: [
            {
                label: 'Indice UV Max',
                data: data.uv_index_max,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const windSpeedData = {
        labels: data.time,
        datasets: [
            {
                label: 'Vitesse du Vent Max (m/s)',
                data: data.wind_speed_10m_max,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
                <h3>Températures Maximales et Minimales</h3>
                <Line data={tempData} />
            </div>
            <div>
                <h3>Probabilité de Précipitations</h3>
                <Bar data={precipitationData} />
            </div>
            <div>
                <h3>Indice UV Max</h3>
                <Bar data={uvData} />
            </div>
            <div>
                <h3>Vitesse du Vent Max</h3>
                <Bar data={windSpeedData} />
            </div>
        </div>
    );
};

export default StatisticsCards;
