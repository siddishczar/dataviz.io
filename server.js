let existingChart = null;

async function fetchEconomicData(seriesId) {
    //let seriesId = localStorage.getItem('fredSeriesId');
    if(!seriesId){
        throw new Error('Series ID is required');
    }
    try {
        console.log(`Fetching data for series ID: ${seriesId}`);
        const response = await fetch(`http://localhost:3002/api/economic-data?series_id=${seriesId}`);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data received from server:', data);
        return data;
    } catch (error) {
        console.error('Error fetching economic data:', error);
        throw error;
    }
}

export async function generateChart() {
    try {
        const seriesId = localStorage.getItem('fredSeriesId');
        if (!seriesId) {
            throw new Error('No series ID found in local storage');
        }

        const economicData = await fetchEconomicData(seriesId);
        const observations = economicData.observations;
        const labels = observations.map(obs => obs.date);
        const data = observations.map(obs => parseFloat(obs.value));

        const ctx = document.getElementById('resultChart').getContext('2d');
        if (!ctx) {
            throw new Error("Canvas element 'resultChart' not found");
        }

        existingChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: document.getElementById('prompt-input').value,
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    //borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'x-axis'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'y-axis'
                        },
                        beginAtZero: false
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error generating chart:", error);
    }
}

function destroyExistingChart() {
    if (existingChart) {
        existingChart.destroy(); 
        existingChart = null;     
    }
}

export async function generateLineChart(xline, yline) {
    const seriesId = localStorage.getItem('fredSeriesId');
    if (!seriesId) {
        throw new Error('No series ID found in local storage');
    }

    try {
        const economicData = await fetchEconomicData(seriesId);
        const observations = economicData.observations;
        const labels = observations.map(obs => obs.date);
        const data = observations.map(obs => parseFloat(obs.value));

        const ctx = document.getElementById('resultChart').getContext('2d');
        if (!ctx) {
            throw new Error("Canvas element 'resultChart' not found");
        }

        destroyExistingChart();

        existingChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: seriesId,
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    //borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: xline
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: yline
                        },
                        beginAtZero: false
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error generating chart:", error);
    }
}

async function checkAndGenerateCharts() {
    const pollingInterval = 1000;

    function getLocalStorageValues() {
        return {
            seriesId: localStorage.getItem('fredSeriesId'),
            xline: localStorage.getItem('x-axis'),
            yline: localStorage.getItem('y-axis')
        };
    }

    function pollForUpdates() {
        const { seriesId, xline, yline } = getLocalStorageValues();

        if (seriesId && xline && yline) {
            generateLineChart(xline, yline).catch(error => console.error("Error generating chart:", error));
            clearInterval(polling);
        }
    }

    const polling = setInterval(pollForUpdates, pollingInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('circle-button').addEventListener('click', () => {
        checkAndGenerateCharts().catch(error => console.error("Error starting chart generation:", error));
    });
});
