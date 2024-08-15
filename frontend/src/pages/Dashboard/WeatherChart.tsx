import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 

const WeatherChart = () => {
    const [chartData, setChartData] = useState({
        labels: [], 
        datasets: [
            {
                label: 'Température max (°C)',
                data: [], 
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                tension: 0.1
            },
            {
                label: 'Température min (°C)',
                data: [], 
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.4)',
                tension: 0.1
            }
        ]
    });

    useEffect(() => {
        
        fetch('https://api.open-meteo.com/v1/forecast?latitude=6.385992&longitude=1.243624&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=GMT')
            .then(response => response.json())
            .then(data => {
                const dates = data.daily.time;
                const maxTemperatures = data.daily.temperature_2m_max;
                const minTemperatures = data.daily.temperature_2m_min;

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Température max (°C)',
                            data: maxTemperatures,
                            fill: false,
                            borderColor: 'rgba(75,192,192,1)',
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            tension: 0.1
                        },
                        {
                            label: 'Température min (°C)',
                            data: minTemperatures,
                            fill: false,
                            borderColor: 'rgba(255,99,132,1)',
                            backgroundColor: 'rgba(255,99,132,0.4)',
                            tension: 0.1
                        }
                    ]
                });
            });
    }, []);

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
}

export default WeatherChart;
