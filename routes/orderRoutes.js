const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// --- চেকআউট রুট (POST Request) ---
router.post('/checkout', async (req, res) => {
    try {
        const { buyerEmail, productId } = req.body;

        // ১. প্রোডাক্টটি খুঁজে বের করা
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "প্রোডাক্ট পাওয়া যায়নি!" });
        }

        // ২. চেক করা কীটা আগেই বিক্রি হয়েছে কি না
        if (product.isSold) {
            return res.status(400).json({ message: "দুঃখিত, এই প্রোডাক্টটি ইতিমধ্যে বিক্রি হয়ে গেছে!" });
        }

        // ৩. অর্ডারটি ডাটাবেসে সেভ করা
        const newOrder = new Order({
            buyerEmail,
            productName: product.name,
            price: product.price,
            deliveredKey: product.softwareKey
        });
        await newOrder.save();

        // ৪. প্রোডাক্টটিকে 'বিক্রি হয়ে গেছে' হিসেবে মার্ক করা
        product.isSold = true;
        await product.save();

        // ৫. ইউজারকে সফলতার মেসেজ এবং কী দেওয়া
        res.status(200).json({ 
            message: "পেমেন্ট সফল! আপনার সফটওয়্যার কী নিচে দেওয়া হলো:",
            key: product.softwareKey
        });

    } catch (error) {
        console.log("চেকআউট এরর:", error);
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

module.exports = router;