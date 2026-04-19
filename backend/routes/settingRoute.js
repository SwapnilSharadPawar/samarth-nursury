const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Fetch global settings
router.get('/', async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            // Create a default one if it doesn't exist
            settings = new Setting();
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update global settings
router.post('/', async (req, res) => {
    try {
        const { phone, email } = req.body;
        let settings = await Setting.findOne();
        
        if (!settings) {
            settings = new Setting({ phone, email });
        } else {
            settings.phone = phone;
            settings.email = email;
        }
        
        await settings.save();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
