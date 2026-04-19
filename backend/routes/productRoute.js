const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../middleware/upload');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Add product
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const newProduct = new Product({ name, description, category, imageUrl });
        await newProduct.save();
        res.json(newProduct);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
