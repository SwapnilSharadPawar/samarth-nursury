const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', upload.single('media'), async (req, res) => {
    try {
        const { type, isActive } = req.body;
        const mediaUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const newBanner = new Banner({ mediaUrl, type, isActive: isActive === 'true' });
        await newBanner.save();
        res.json(newBanner);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await Banner.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
