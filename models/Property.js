const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true }, // যেমন: ৩ বেডরুমের ফ্ল্যাট ভাড়া
    description: { type: String, required: true }, // বিস্তারিত
    price: { type: Number, required: true }, // ভাড়া বা বিক্রির মূল্য
    location: { type: String, required: true }, // এলাকা
    type: { type: String, enum: ['rent', 'sell', 'house', 'land'], required: true }, // rent=ভাড়া, sell=ফ্ল্যাট বিক্রি, house=বাড়ি, land=জমি
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);