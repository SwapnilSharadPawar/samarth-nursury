const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'youtube'], default: 'image' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
