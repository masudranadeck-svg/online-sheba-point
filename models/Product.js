const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    softwareKey: { 
        type: String, 
        required: true // ইউজার কেনার পর এই কীটা তাকে অটোমেটিক দেওয়া হবে
    },
    isSold: {
        type: Boolean,
        default: false // কী বিক্রি হয়ে গেলে এটি true হয়ে যাবে
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);