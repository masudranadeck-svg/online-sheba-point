const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // একই ইমেইল দিয়ে দুবার রেজিস্টার করা যাবে না
    },
    password: { 
        type: String, 
        required: true 
    },
    isAdmin: { 
        type: Boolean, 
        default: false // সাধারণ ইউজারের জন্য false, এডমিনের জন্য true হবে
    }
}, { timestamps: true }); // কবে অ্যাকাউন্ট তৈরি হয়েছে সেটা সেভ করার জন্য

module.exports = mongoose.model('User', userSchema);