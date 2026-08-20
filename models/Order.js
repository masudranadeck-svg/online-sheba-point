const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyerEmail: { type: String, required: true },
    items: [
        {
            name: String,
            price: Number,
            qty: Number
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Bkash', 'Nagad', 'Rocket'], required: true },
    senderNumber: { type: String, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    deliveredKey: { type: String, default: 'Not Delivered' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);