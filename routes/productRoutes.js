const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Product মডেল আনা হয়েছে

// --- প্রোডাক্ট অ্যাড করার রুট (POST Request) ---
router.post('/add', async (req, res) => {
    try {
        const { name, description, price, category, softwareKey } = req.body;

        // নতুন প্রোডাক্ট তৈরি করে ডাটাবেসে সেভ করা
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            softwareKey
        });

        await newProduct.save();

        res.status(201).json({ message: "প্রোডাক্ট সফলভাবে যোগ হয়েছে!", product: newProduct });

    } catch (error) {
        console.log("প্রোডাক্ট এরর:", error);
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

// --- সব প্রোডাক্ট দেখার রুট (GET Request) ---
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

module.exports = router;