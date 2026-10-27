// server.js — Online Sheba Point (API + Website EK server e)
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const mongoose = require('mongoose');

dotenv.config();

async function main() {
  // Next.js load kori
  const next = (await import('next')).default;
  const dev = process.env.NODE_ENV !== 'production';
  const PORT = process.env.PORT || 3000;

  // MongoDB connect (tomar ager db.js — kono change nai)
  connectDB();

  // Next.js website ready koro
  const nextApp = next({ dev });
  const handle = nextApp.getRequestHandler();
  await nextApp.prepare();

  const app = express();

  app.use(cors());
  // boro image upload er jonno 50mb (tomar ager setting)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // ---------- Health Check (test er jonno) ----------
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
  });

  // ---------- Tomar ager SOB routes (kono kichu change hoyni) ----------
  const authRoutes = require('./routes/authRoutes');
  app.use('/api/auth', authRoutes);

  const productRoutes = require('./routes/productRoutes');
  app.use('/api/products', productRoutes);

  const orderRoutes = require('./routes/orderRoutes');
  app.use('/api/orders', orderRoutes);

  const resellRoutes = require('./routes/resellRoutes');
  app.use('/api/resell', resellRoutes);

  const propertyRoutes = require('./routes/propertyRoutes');
  app.use('/api/properties', propertyRoutes);

  // /api te kichu na mil sob JSON error dibe (HTML 404 na)
  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found: ' + req.originalUrl });
  });

  // ---------- Baki SOB request → Next.js website ----------
  app.use((req, res) => handle(req, res));

  // Error handler
  app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: err.message });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Online Sheba Point running on port ${PORT} (API + Website ek sathe)`);
  });
}

main().catch((err) => {
  console.error('Server start failed:', err);
  process.exit(1);
});