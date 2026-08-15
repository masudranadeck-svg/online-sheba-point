const mongoose = require('mongoose');

const resellSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true },
    sellerName: { type: String, required: true },
    sellerPhone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Resell', resellSchema);