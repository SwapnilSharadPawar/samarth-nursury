const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.registerInitialAdmin = async (req, res) => {
    try {
        const existing = await User.findOne();
        if (existing) return res.status(400).json({ message: 'Admin already exists' });

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({ username: 'admin', password: hashedPassword });
        await admin.save();
        res.json({ message: 'Initial admin created: admin / admin123' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
