const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// সব প্রোডাক্ট দেখার রুট
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

// প্রোডাক্ট অ্যাড করার রুট (আপডেট করা হয়েছে)
router.post('/add', async (req, res) => {
    try {
        const { name, description, regularPrice, offerPrice, images, keyFeatures, specifications, category, softwareKey } = req.body;
        
        const newProduct = new Product({ 
            name, 
            description, 
            regularPrice: Number(regularPrice), 
            offerPrice: Number(offerPrice), 
            images, 
            keyFeatures, 
            specifications, 
            category, 
            softwareKey 
        });

        await newProduct.save();
        res.status(201).json({ message: "প্রোডাক্ট সফলভাবে যোগ হয়েছে!" });
    } catch (error) {
        console.log("প্রোডাক্ট এরর:", error);
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

// প্রোডাক্ট ডিলিট করার রুট
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "প্রোডাক্ট ডিলিট সফল হয়েছে!" });
    } catch (error) {
        res.status(500).json({ message: "ডিলিট এরর!", error: error.message });
    }
});

module.exports = router;