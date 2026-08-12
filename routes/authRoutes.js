const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 

// --- রেজিস্টার রুট (POST Request) ---
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "এই ইমেইল দিয়ে ইতিমধ্যে রেজিস্টার করা হয়েছে!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "ইউজার রেজিস্ট্রেশন সফল হয়েছে!", user: { name, email } });

    } catch (error) {
        console.log("রেজিস্টার এরর:", error); // এররটা টার্মিনালে দেখানোর জন্য এটা যোগ করা হয়েছে
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});


// --- লগইন রুট (POST Request) ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "ইউজার পাওয়া যায়নি!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "ভুল পাসওয়ার্ড!" });
        }

        res.status(200).json({ 
            message: "লগইন সফল হয়েছে!", 
            user: { name: user.name, email: user.email } 
        });

    } catch (error) {
        console.log("লগইন এরর:", error); // এররটা টার্মিনালে দেখানোর জন্য এটা যোগ করা হয়েছে
        res.status(500).json({ message: "সার্ভার এরর!", error: error.message });
    }
});

module.exports = router;