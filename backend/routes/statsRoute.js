const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Message = require('../models/Message');
const Banner = require('../models/Banner');
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const messageCount = await Message.countDocuments();
        const bannerCount = await Banner.countDocuments();
        const blogCount = await Blog.countDocuments();

        res.json({
            products: productCount,
            messages: messageCount,
            banners: bannerCount,
            blogs: blogCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
