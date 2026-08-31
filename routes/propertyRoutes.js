const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// সব বিজ্ঞাপন আনা
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!" });
    }
});

// নতুন বিজ্ঞাপন পোস্ট করা
router.post('/add', async (req, res) => {
    try {
        const { title, description, price, location, type, ownerName, ownerPhone } = req.body;
        const newProperty = new Property({ title, description, price, location, type, ownerName, ownerPhone });
        await newProperty.save();
        res.status(201).json({ message: "বিজ্ঞাপন সফলভাবে পোস্ট হয়েছে!" });
    } catch (error) {
        res.status(500).json({ message: "সার্ভার এরর!" });
    }
});

module.exports = router;