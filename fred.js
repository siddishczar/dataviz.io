//import Chart from 'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.esm.js';

async function fetchEconomicData() {
    try {
      const response = await fetch('http://localhost:3002/api/economic-data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching economic data:', error);
      throw error;
    }
  }

  export async function generateChart() {
    try {
      const economicData = await fetchEconomicData();
      const observations = economicData.observations;
      const labels = observations.map(obs => obs.date);
      const data = observations.map(obs => parseFloat(obs.value));
      
      const ctx = document.getElementById('resultChart').getContext('2d');
      if (!ctx) {
        throw new Error("Canvas element 'resultChart' not found");
      }
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'U.S. Unemployment Rate',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
          }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Unemployment Rate (%)'
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

  generateChart().catch(error => console.error("Error calling generateChart:", error));

