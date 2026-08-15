const express = require('express');
const router = express.Router();
const Resell = require('../models/Resell');

// সব পুরোনো পণ্য দেখার রুট
router.get('/', async (req, res) => {
    try {
        const items = await Resell.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!" });
    }
});

// নতুন পণ্য পোস্ট করার রুট
router.post('/add', async (req, res) => {
    try {
        const { title, description, price, condition, sellerName, sellerPhone } = req.body;
        const newItem = new Resell({ title, description, price, condition, sellerName, sellerPhone });
        await newItem.save();
        res.status(201).json({ message: "আপনার পণ্য সফলভাবে পোস্ট হয়েছে!" });
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!" });
    }
});

module.exports = router;