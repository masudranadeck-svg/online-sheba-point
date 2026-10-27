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
  const next = (await import('next')).default;
  const dev = process.env.NODE_ENV !== 'production';
  const PORT = process.env.PORT || 3000;

  // MongoDB connect (tomar ager db.js)
  connectDB();

  // Next.js website ready koro
  const nextApp = next({ dev });
  const handle = nextApp.getRequestHandler();
  await nextApp.prepare();
  console.log('✅ Next.js ready');

  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
  });

  // Tomar ager SOB routes (load hoile log e dekhabe)
  const routeList = [
    ['./routes/authRoutes', '/api/auth'],
    ['./routes/productRoutes', '/api/products'],
    ['./routes/orderRoutes', '/api/orders'],
    ['./routes/resellRoutes', '/api/resell'],
    ['./routes/propertyRoutes', '/api/properties'],
  ];

  for (const [file, mount] of routeList) {
    try {
      app.use(mount, require(file));
      console.log('✅ Route loaded:', mount);
    } catch (e) {
      console.error('❌ Route load FAILED:', mount, '—', e.message);
    }
  }

  // /api te unmatched route → JSON 404
  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found: ' + req.originalUrl });
  });

  // Baki SOB request → Next.js website
  app.use((req, res) => handle(req, res));

  // Error handler
  app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: err.message });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT} (API + Website)`);
  });
}

main().catch((err) => {
  console.error('❌ Server start failed:', err.message);
  process.exit(1);
});