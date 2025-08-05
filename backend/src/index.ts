import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Marketplace API funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Simulación de endpoints para agentes IA
app.get('/api/agents', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Customer Support Agent',
      status: 'active',
      queries_per_day: 1247,
      accuracy: 96.8
    },
    {
      id: 2,
      name: 'Content Moderator',
      status: 'active',
      content_per_day: 15432,
      detection_rate: 99.2
    },
    {
      id: 3,
      name: 'Price Optimizer',
      status: 'active',
      products: 98547,
      optimization: 12.4
    }
  ]);
});

// Simulación de búsqueda AI
app.post('/api/search', (req, res) => {
  const { query } = req.body;
  res.json({
    query,
    results: [
      {
        title: 'Laptop Gaming RTX 4080',
        similarity: 96.8,
        price: 1299,
        rating: 5
      },
      {
        title: 'Workstation Pro Max',
        similarity: 94.2,
        price: 2199,
        rating: 5
      }
    ],
    processing_time: '0.15s'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:3000`);
  console.log(`🔍 API Health: http://localhost:${PORT}/health`);
});