const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyerEmail: { 
        type: String, 
        required: true 
    },
    productName: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    deliveredKey: { 
        type: String, 
        required: true // ইউজারকে যে কীটা দেওয়া হয়েছে
    },
    status: {
        type: String,
        default: 'Completed' // পেমেন্ট সফল হয়েছে
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);