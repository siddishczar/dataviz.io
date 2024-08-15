import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import { json } from 'express';

const app = express();
const port = 3010;

const openai = new OpenAI({
  apiKey: '', //generate your own API key
});

app.use(cors({
    origin: 'http://127.0.0.1:5500/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());

app.use(json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the data visualization API!');
});

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are trying to translate what the user is asking into a FRED series id, a line/bar graph (default to line), a x-axis, and a y-axis.' },
        { role: 'user', content: prompt },
      ],
      model: 'ft:gpt-3.5-turbo-0125:personal:fred-bot7:9vGzfWel',
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
