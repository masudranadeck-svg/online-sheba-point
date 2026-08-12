require('dotenv').config(); // .env ফাইল পড়ার জন্য এটা দরকার
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI; // এখানে সরাসরি লিংক দিবেন না, .env থেকে নিবে

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // যদি কানেকশন ব্যর্থ হয়, তবে সার্ভার বন্ধ হয়ে যাবে
    }
};

module.exports = connectDB;