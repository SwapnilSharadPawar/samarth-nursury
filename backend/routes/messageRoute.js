const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        if (!email && !phone) {
            return res.status(400).json({ error: 'Either email or mobile number is required.' });
        }

        const newMessage = new Message({ name, email, phone, message });
        await newMessage.save();
        res.json(newMessage);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
