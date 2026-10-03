const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// সব প্রোডাক্ট আনার রুট
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

// নতুন: নির্দিষ্ট প্রোডাক্ট আনার রুট (ID দিয়ে)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// প্রোডাক্ট অ্যাড করার রুট
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