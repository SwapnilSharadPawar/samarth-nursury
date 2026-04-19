const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/setup', authController.registerInitialAdmin);

module.exports = router;
