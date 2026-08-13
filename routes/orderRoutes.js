const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// চেকআউট রুট
router.post('/checkout', async (req, res) => {
    try {
        const { buyerEmail, productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "প্রোডাক্ট পাওয়া যায়নি!" });
        if (product.isSold) return res.status(400).json({ message: "এই প্রোডাক্টটি বিক্রি হয়ে গেছে!" });

        const newOrder = new Order({
            buyerEmail,
            productName: product.name,
            price: product.price,
            deliveredKey: product.softwareKey
        });
        await newOrder.save();

        product.isSold = true;
        await product.save();

        res.status(200).json({ 
            message: "পেমেন্ট সফল! আপনার সফটওয়্যার কী নিচে দেওয়া হলো:",
            key: product.softwareKey
        });
    } catch (error) {
        console.log("চেকআউট এরর:", error);
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

// কাস্টমারের অর্ডার দেখার রুট
router.get('/my-orders/:email', async (req, res) => {
    try {
        const orders = await Order.find({ buyerEmail: req.params.email });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

// সব অর্ডার দেখার রুট (অ্যাডমিনের জন্য নতুন যোগ করা হয়েছে)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // নতুন অর্ডার আগে দেখাবে
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

module.exports = router;