const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// রুট কানেক্ট করা (শুধু যে ফাইল গুলো আছে)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const resellRoutes = require('./routes/resellRoutes'); 
app.use('/api/resell', resellRoutes); 

app.get('/', (req, res) => {
    res.send('সার্ভার সফলভাবে চলছে।');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});