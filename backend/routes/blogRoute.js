const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', upload.single('media'), async (req, res) => {
    try {
        const { title, description, type, youtubeUrl } = req.body;
        
        let mediaUrl = '';
        if (type === 'youtube') {
            mediaUrl = youtubeUrl; // Directly store the youtube link
        } else if (req.file) {
            mediaUrl = `/uploads/${req.file.filename}`;
        } else {
            return res.status(400).json({ error: 'Media file or YouTube URL is required.' });
        }

        const newBlog = new Blog({ title, description, type, mediaUrl });
        await newBlog.save();
        res.json(newBlog);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
