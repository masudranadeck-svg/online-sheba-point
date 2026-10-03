const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    regularPrice: { type: Number, default: 0 },
    offerPrice: { type: Number, required: true },
    imageUrl: { type: String, default: '' }, // ছবির জন্য নতুন ফিল্ড
    keyFeatures: [{ type: String }],
    specifications: { type: String },
    category: { type: String, required: true },
    softwareKey: { type: String, default: 'N/A' },
    isSold: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);