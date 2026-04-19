const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    mediaUrl: { type: String, required: true },
    type: { type: String, enum: ['hero', 'promo', 'gallery'], default: 'hero' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
