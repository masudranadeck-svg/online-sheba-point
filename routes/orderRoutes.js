const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Order Save Korar Route
router.post('/', async (req, res) => {
    try {
        const { buyerEmail, items, totalAmount, paymentMethod, senderNumber, transactionId } = req.body;

        const newOrder = new Order({
            buyerEmail,
            items,
            totalAmount,
            paymentMethod,
            senderNumber,
            transactionId
        });

        await newOrder.save();

        res.status(201).json({ message: "অর্ডার সফলভাবে সাবমিট হয়েছে!" });
    } catch (error) {
        console.log("Order Error:", error);
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

module.exports = router;