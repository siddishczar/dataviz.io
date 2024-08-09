import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const apiKey = 'ca9ff7e009d001484ed2e7fd4b83ecc9';
const seriesId = 'UNRATE';

app.get('/', (req, res) => {
  res.send('Welcome to the Economic Data API. Use /api/economic-data to get economic data.');
});

app.get('/api/economic-data', async (req, res) => {
  try {
    const apiUrl = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
