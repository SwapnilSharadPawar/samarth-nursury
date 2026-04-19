const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    phone: { type: String, default: '+91 8459528669' },
    email: { type: String, default: 'contact@sriswami.com' }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
